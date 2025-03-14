from serial.tools import list_ports
import pydobot
import time
import sys
import pandas as pd
from collections import deque
import requests
import json
import serial
from qrcode import QrCode
# Importa as funções necessárias do módulo sensor_distancia
from sensor_distancia import objeto_detectado, verificar_sensor

# Códigos de log
LOG_SUCESSO = 0
LOG_QR_NAO_CORRESPONDE = 1
LOG_QR_NAO_RECONHECIDO = 2
LOG_REMEDIO_NAO_COLETADO = 3
LOG_REMEDIO_CAIU = 4
LOG_ERRO_DOBOT = 5

# Classe estendida para o Dobot
class InteliDobot(pydobot.Dobot):
    def __init__(self, port=None, verbose=False):
        super().__init__(port=port, verbose=verbose)

    def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)

    def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)    
    
    def GoHomeInteli(self):
        msg = pydobot.message.Message()
        msg.id = pydobot.enums.CommunicationProtocolIDs.CommunicationProtocolIDs.SET_HOME_CMD
        msg.ctrl = pydobot.enums.ControlValues.ControlValues.ONE
        msg.params = []  # Inicializa params para evitar erro de NoneType
        return super()._send_command(msg)
    
    def SetSpeed(self, speed, acceleration):
        super().speed(speed, acceleration)
    
    def movej_angles(self, j1, j2, j3, j4, wait=True):
        mode = pydobot.enums.PTPMode.MOVJ_ANGLE
        self._set_ptp_cmd(j1, j2, j3, j4, mode=mode, wait=wait)

# Função para enviar log para a API
def enviar_log(id_pedido, id_remedio_em_separacao, codigo_log):
    try:
        url = "https://two025-1a-t12-ec05-g03.onrender.com/logs/cadastrar"
        dados = {
            "id_pedido": id_pedido,
            "id_remedio_em_separacao": id_remedio_em_separacao,
            "codigo_log": codigo_log
        }
        response = requests.post(url, json=dados)
        if response.status_code == 200 or response.status_code == 201:
            print(f"Log enviado com sucesso: {dados}")
        else:
            print(f"Erro ao enviar log: {response.status_code}")
    except Exception as e:
        print(f"Erro na requisição para a API: {e}")

def lerQRCode(remedio_id, qrcode_lido):
    try:
        url = "https://two025-1a-t12-ec05-g03.onrender.com/qrcode/validar"
        dados = {
            "remedio_id": remedio_id,  # Corrigido: estava usando id_pedido
            "qrcode_lido": qrcode_lido
        }
        response = requests.post(url, json=dados)
        if response.status_code == 200 or response.status_code == 201:
            print(f"QR Code validado com sucesso: {dados}")
            return True
        elif response.status_code == 404:
            print(f"O QRCode não foi reconhecido")
            return False
        else:
            print(f"Erro ao validar QR Code: {response.status_code}")
            return False
    except Exception as e:
        print(f"Erro na requisição para a API: {e}")
        return False

# Função para obter pedidos da API
def obter_pedidos():
    try:
        url = "http://api-endpoint/pedidos"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Erro ao obter pedidos: {response.status_code}")
            return []
    except Exception as e:
        print(f"Erro na requisição para obter pedidos: {e}")
        return []

def main():
    # ----- Aqui são definidas as posições dos locus através de um arquivo json -----
    # pega localizações através dos arquivos json
    ilhas = pd.read_json("posicoes_ilhas.json")
 
    #define função para chamar determinado local
    def locais(i):
        ilha_0 = ilhas[(ilhas['ilha'] == 0) & (ilhas['etapa'] == i)]
        ilha_1 = ilhas[(ilhas['ilha'] == 1) & (ilhas['etapa'] == i)]
        
        return ilha_0['position'].tolist() + ilha_1['position'].tolist()
    

    # Lê as posições da fita a partir do JSON
    fita = pd.read_json("fita.json")
    
    # Função interna para obter as posições da fita para uma determinada etapa
    def locais_fita(i):
        fita_0 = fita[(fita['ilha'] == 0) & (fita['etapa'] == i)]
        fita_1 = fita[(fita['ilha'] == 1) & (fita['etapa'] == i)]

        return fita_0['position'].tolist() + fita_1['position'].tolist()

    # --------------------------------------------------------------------------------

    # Obtém as portas disponíveis e tenta conectar em cada uma
    available_ports = list_ports.comports()
    if not available_ports:
        print("Nenhuma porta serial encontrada. Conecte o Dobot e tente novamente.")
        return

    print("Portas disponíveis:")
    for p in available_ports:
        print(f" - {p.device}")

    print("\nTentando conectar em cada porta...")
    device = None
    for p in available_ports:
        porta = p.device
        print(f"\n### Testando porta {porta} ###")
        try:
            device = InteliDobot(port=porta, verbose=False)
            (x, y, z, r, j1, j2, j3, j4) = device.pose()
            print(f"Sucesso! Pose inicial: x={x} y={y} z={z} j1={j1} j2={j2} j3={j3} j4={j4}")
            device.GoHomeInteli()
            time.sleep(1)
            break
        except Exception as e:
            print(f"Erro ao testar a porta {porta}: {e}")

    if device is None:
        print("Nenhuma porta válida foi encontrada. Encerrando...")
        enviar_log(1, 1, LOG_ERRO_DOBOT)  # Registra erro de conexão com o Dobot
        return

    # Variáveis para contabilizar erros e sucessos
    contador_sucessos = 0
    contador_erros = {
        LOG_QR_NAO_CORRESPONDE: 0,
        LOG_QR_NAO_RECONHECIDO: 0,
        LOG_REMEDIO_NAO_COLETADO: 0,
        LOG_REMEDIO_CAIU: 0,
        LOG_ERRO_DOBOT: 0
    }

    def safe_move(ilha):
        # Move para a posição de segurança (posição de leitura + 90 no eixo Z)
        try:
            device.movel_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)
        except Exception as e:
            print(f"Não consegui me mover de forma segura ._.: {e}")
            enviar_log(pedido_atual["id"], remedio_atual, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
                
    def safe_movej(ilha):
        try:
            device.movej_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)
        except Exception as e:
            print(f"Não consegui me mover de forma segura ._.: {e}")
            enviar_log(pedido_atual["id"], remedio_atual, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1

    def processa_ilha(ilha_num, id_pedido, id_remedio):
        nonlocal contador_sucessos
        
        try:
            ilha = locais(ilha_num)

            # Movimentação para posição de leitura
            try:
                safe_movej(ilha)
                print(f"Movendo para a posição de leitura da ilha {ilha_num}...")
                safe_movej(ilha)
                time.sleep(2)
            except Exception as e:
                print(f"Não consegui me mover para a posição de leitura .-.: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False
            
            # Movimento para ler o QR Code do medicamento (posição ilha[0])
            try:
                device.movej_to(ilha[0]["x"], ilha[0]["y"], ilha[0]["z"], ilha[0]["r"], wait=True)
                time.sleep(1)
            except Exception as e:
                print(f"Erro durante movimentação para leitura de QR code: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False
            
            # Simulação da leitura do QR Code
            try:
                print("Lendo QR Code do medicamento...")
                qr_code_lido = QrCode()  # Chama a função que agora retorna o texto lido
                
                if not qr_code_lido:
                    print(f"Não consegui enxergar o QR-code ou ele é inválido >_< na ilha: {ilha_num}")
                    enviar_log(id_pedido, id_remedio, LOG_QR_NAO_RECONHECIDO)
                    contador_erros[LOG_QR_NAO_RECONHECIDO] += 1
                    return False
                
                # Verifica se o QR code corresponde ao medicamento esperado usando a API
                medicamento_correto = lerQRCode(id_remedio, qr_code_lido)
                
                if not medicamento_correto:
                    print(f"QR Code lido não corresponde ao pedido na ilha {ilha_num}")
                    enviar_log(id_pedido, id_remedio, LOG_QR_NAO_CORRESPONDE)
                    contador_erros[LOG_QR_NAO_CORRESPONDE] += 1
                    return False
                
                print("QR Code verificado com sucesso")
            except Exception as e:
                print(f"Erro durante leitura/verificação do QR Code: {e}")
                enviar_log(id_pedido, id_remedio, LOG_QR_NAO_RECONHECIDO)
                contador_erros[LOG_QR_NAO_RECONHECIDO] += 1
                return False
                
            
            # Coleta do medicamento
            try:
                print(f"Ativando sucção e coletando medicamento da ilha {ilha_num}...")
                device.suck(True)
                time.sleep(0.5)  # Aguarda um momento para estabilizar a sucção
                
                # Verificação se o medicamento foi coletado usando o sensor de distância
                # Chamamos a função objeto_detectado() que retorna True se um objeto for detectado
                medicamento_coletado = objeto_detectado()  # Retorna True se objeto detectado (GPIO.LOW)
                
                if not medicamento_coletado:
                    print(f"Não foi possível coletar o medicamento na ilha {ilha_num}")
                    enviar_log(id_pedido, id_remedio, LOG_REMEDIO_NAO_COLETADO)
                    contador_erros[LOG_REMEDIO_NAO_COLETADO] += 1
                    device.suck(False)  # Desativa sucção
                    return False
            except Exception as e:
                print(f"Erro durante coleta do medicamento: {e}")
                enviar_log(id_pedido, id_remedio, LOG_REMEDIO_NAO_COLETADO)
                contador_erros[LOG_REMEDIO_NAO_COLETADO] += 1
                device.suck(False)  # Desativa sucção para segurança
                return False
            
            # Movimentação com o medicamento
            try:
                safe_movej(ilha)
                time.sleep(1)
                device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"], ilha[1]["r"], wait=True)
                time.sleep(1)
                safe_move(ilha)
                
                # Após o movimento de ilha[1], verificamos se o medicamento ainda está sendo segurado
                # Usamos o sensor de distância para verificar
                print("Verificando se o medicamento continua coletado após movimento...")
                medicamento_no_trajeto = objeto_detectado()  # Verifica se o objeto ainda está presente
                
                if not medicamento_no_trajeto:
                    print(f"O medicamento caiu durante o percurso da ilha {ilha_num}")
                    enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                    contador_erros[LOG_REMEDIO_CAIU] += 1
                    device.suck(False)  # Desativa sucção
                    return False
                
                print("Medicamento continua seguro após movimento!")
                
            except Exception as e:
                print(f"Erro durante movimentação com o medicamento: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                device.suck(False)  # Desativa sucção para segurança
                return False
                    
            print("Movendo para uma posição à direita da ilha...")
            time.sleep(1)
            
            # Etapa concluída com sucesso
            print(f"Medicamento da ilha {ilha_num} coletado com sucesso")
            enviar_log(id_pedido, id_remedio, LOG_SUCESSO)
            contador_sucessos += 1
            return True
            
        except Exception as e:
            print(f"Erro não tratado ao processar a ilha {ilha_num}: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False

    # Contador para a próxima posição na fita
    fita_contador = 0

    # Processa a fita de medicamentos automaticamente
    def processa_fita(id_pedido, id_remedio):
        nonlocal contador_sucessos
        # Variável estática para manter o estado do contador entre chamadas da função
        if not hasattr(processa_fita, "fita_contador"):
            processa_fita.fita_contador = 0
        
        try:
            # Obtém as posições da fita
            posicoes_fita = locais_fita(processa_fita.fita_contador)
            
            print(f"Depositando medicamento na fita, etapa {processa_fita.fita_contador}...")

            # Movimentação inicial para a posição da fita
            try:
                if processa_fita.fita_contador == 0:
                    # Obtém os ângulos atuais das juntas
                    _, _, _, _, current_j1, current_j2, current_j3, current_j4 = device.pose()
                    
                    # Define o ângulo desejado para J1 (exemplo: 45 graus)
                    desired_j1 = 45  # Substitua pelo ângulo correto para sua aplicação
                    
                    # Move apenas o J1, mantendo as outras juntas iguais
                    device.movej_angles(desired_j1, current_j2, current_j3, current_j4, wait=True)
                else:
                    safe_movej(posicoes_fita)
                
                safe_movej(posicoes_fita)
                time.sleep(2)
                
            except Exception as e:
                print(f"Erro durante movimentação inicial para a fita: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False

            # Verifica se o medicamento ainda está sendo segurado antes da deposição
            # usando o sensor de distância
            try:
                print("Verificando se o medicamento ainda está presente...")
                medicamento_presente = objeto_detectado()  # Verifica se o objeto ainda está presente
                
                if not medicamento_presente:
                    print("O medicamento caiu antes de chegar à posição de deposição")
                    enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                    contador_erros[LOG_REMEDIO_CAIU] += 1
                    device.suck(False)  # Desativa sucção por segurança
                    return False
                
                print("Medicamento detectado! Prosseguindo com a deposição.")
            except Exception as e:
                print(f"Erro na verificação do medicamento antes da deposição: {e}")
                enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                contador_erros[LOG_REMEDIO_CAIU] += 1
                device.suck(False)  # Desativa sucção por segurança
                return False

            # Movimento para a posição de deposição
            try:
                device.movel_to(
                    posicoes_fita[1]["x"],
                    posicoes_fita[1]["y"],
                    posicoes_fita[1]["z"],
                    posicoes_fita[1]["r"],
                    wait=True
                )
                time.sleep(1)
            except Exception as e:
                print(f"Erro durante movimentação para posição de deposição: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False
            
            # Deposição do medicamento
            try:
                print("Desativando sucção para depositar medicamento...")
                device.suck(False)
                time.sleep(0.5)  # Aguarda um momento para estabilização
                
                # Verifica se o medicamento foi depositado corretamente
                # Um objeto depositado NÃO deve estar mais presente, então invertemos a lógica
                medicamento_depositado = not objeto_detectado()  # True se NÃO detectar objeto
                
                if not medicamento_depositado:
                    print(f"Erro ao depositar medicamento na fita, etapa {processa_fita.fita_contador}")
                    enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                    contador_erros[LOG_REMEDIO_CAIU] += 1
                    return False
                
                print("Medicamento depositado com sucesso na fita")
                enviar_log(id_pedido, id_remedio, LOG_SUCESSO)
                contador_sucessos += 1
            except Exception as e:
                print(f"Erro durante deposição do medicamento: {e}")
                enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                contador_erros[LOG_REMEDIO_CAIU] += 1
                return False
            
            # Retorno à posição segura após depositar
            try:
                if processa_fita.fita_contador == 0:
                    safe_movej(posicoes_fita)
                    device.GoHomeInteli()
                else:
                    device.GoHomeInteli()
                    time.sleep(1)
                    safe_movej(posicoes_fita)
                    time.sleep(1)
                
                device.GoHomeInteli()
            except Exception as e:
                print(f"Erro durante retorno à posição segura: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False
            
            # Incrementa o contador e reinicia se atingir o valor máximo (4)
            if processa_fita.fita_contador == 4:
                processa_fita.fita_contador = 0
            else:
                processa_fita.fita_contador += 1
                
            return True
            
        except Exception as e:
            print(f"Erro não tratado ao processar a fita: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False
    
    # Função para processar um pedido completo
    def processar_pedido(pedido):
        print(f"\nProcessando pedido ID: {pedido['id']}")
        for remedio in pedido['remedios']:
            ilha_num = remedio['ilha']
            print(f"Processando remédio ID: {remedio['id']} da ilha {ilha_num}")
            
            sucesso = processa_ilha(ilha_num, pedido['id'], remedio['id'])
            
            if sucesso:
                device.GoHomeInteli()
                time.sleep(1)
                processa_fita(pedido['id'], remedio['id'])
                device.GoHomeInteli()
            else:
                print(f"Falha no processamento do remédio ID: {remedio['id']}")
                device.GoHomeInteli()  # Retorna à posição inicial mesmo em caso de falha
    
    # Modo de operação: manual com entrada do usuário ou via API
    modo_operacao = input("Selecione o modo de operação (1 - Manual, 2 - API): ")
    
    if modo_operacao == "1":
        # Solicita ao usuário os números das ilhas separados por vírgula
        ilhas_input = input("Digite os números das ilhas separados por vírgula: ")
        # Cria uma fila (queue) para organizar as ilhas em ordem (one in one out)
        fila_ilhas = deque(map(int, ilhas_input.split(',')))
        
        # Cria um pedido mock para o modo manual
        pedido_atual = {"id": 1, "remedios": []}
        for ilha_num in fila_ilhas:
            pedido_atual["remedios"].append({"id": len(pedido_atual["remedios"]) + 1, "ilha": ilha_num})
        
        # Processa o pedido manual
        processar_pedido(pedido_atual)
    else:
        # Modo API - Verifica periodicamente por novos pedidos
        while True:
            pedidos = obter_pedidos()
            
            if not pedidos:
                print("Nenhum pedido disponível. Aguardando...")
                time.sleep(10)  # Aguarda 10 segundos antes de verificar novamente
                continue
            
            # Processa um pedido por vez
            for pedido_atual in pedidos:
                processar_pedido(pedido_atual)
                
                # Marca o pedido como concluído na API
                try:
                    url = f"http://api-endpoint/pedidos/{pedido_atual['id']}/concluir"
                    requests.post(url)
                except Exception as e:
                    print(f"Erro ao marcar pedido como concluído: {e}")
                
                # Pergunta ao usuário se deseja continuar ou encerrar
                continuar = input("Deseja processar o próximo pedido? (s/n): ")
                if continuar.lower() != 's':
                    break
            
            if continuar.lower() != 's':
                break

    # Gera relatório final
    total_erros = sum(contador_erros.values())
    print("\n===== RELATÓRIO FINAL =====")
    print(f"Terminei o processo com {total_erros} erros e {contador_sucessos} etapas concluídas com sucesso")
    print("Detalhamento dos erros:")
    print(f"- QR Code não corresponde ao pedido: {contador_erros[LOG_QR_NAO_CORRESPONDE]}")
    print(f"- QR Code não reconhecido: {contador_erros[LOG_QR_NAO_RECONHECIDO]}")
    print(f"- Remédio não coletado: {contador_erros[LOG_REMEDIO_NAO_COLETADO]}")
    print(f"- Remédio caiu durante o percurso: {contador_erros[LOG_REMEDIO_CAIU]}")
    print(f"- Erros do Dobot: {contador_erros[LOG_ERRO_DOBOT]}")
    print("===========================")

    device.close()
    print("Operação finalizada.")

if __name__ == "__main__":
    main()