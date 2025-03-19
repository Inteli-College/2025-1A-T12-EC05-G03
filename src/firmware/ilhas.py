"""
Sistema de Controle Dobot para Automação Farmacêutica
Este script controla um braço robótico Dobot para automatizar o manuseio de medicamentos.
"""

# Importações de bibliotecas padrão
import sys
import time
import json
from collections import deque

# Importações de bibliotecas de terceiros
import pandas as pd
import requests
import serial
import pydobot
from serial.tools import list_ports
import threading


# Constantes
LOG_SUCESSO = 0
LOG_QR_NAO_CORRESPONDE = 1
LOG_QR_NAO_RECONHECIDO = 2
LOG_REMEDIO_NAO_COLETADO = 3
LOG_REMEDIO_CAIU = 4
LOG_ERRO_DOBOT = 5


#####################################
# CLASSE CONTROLADORA DO DOBOT
#####################################

class InteliDobot(pydobot.Dobot):
    """Classe estendida do Dobot com funções adicionais de movimento."""
    
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


#####################################
# FUNÇÕES DE QR CODE, DISTANCIA E API
#####################################

SERIAL_PORT = '/dev/ttyACM0'  # Porta do Arduino no Raspberry Pi
BAUD_RATE = 9600
def ler_serial():
    """Função que roda em segundo plano lendo dados da serial."""
    global sensor_distancia, qr_code
    
    # Initialize global variables if they don't exist
    if 'sensor_distancia' not in globals():
        global sensor_distancia
        sensor_distancia = False
    if 'qr_code' not in globals():
        global qr_code
        qr_code = "n/a"
        
    try:
        with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1) as ser:
            while True:
                try:
                    linha = ser.readline().decode('utf-8').strip()
                    if not linha:
                        continue
                    
                    print(f"Debug - Received serial data: '{linha}'")
                    
                    # Primeiro processa sensorD e depois qr, para evitar problemas com vírgulas no QR
                    if "sensorD:" in linha:
                        parts = linha.split("sensorD:")
                        if len(parts) > 1:
                            valor_sensor = parts[1].split(",")[0].strip()
                            # Inverte a lógica: sensorD:0 significa objeto detectado, sensorD:1 significa nada detectado
                            # Anteriormente: sensor_distancia = (valor_sensor == "1" or valor_sensor == "1 ")
                            sensor_distancia = (valor_sensor == "0" or valor_sensor == "0 ")
                            print(f"Debug - Sensor distância atualizado: {sensor_distancia} (valor original: {valor_sensor})")
                    
                    if "qr:" in linha:
                        parts = linha.split("qr:")
                        if len(parts) > 1:
                            # Pega tudo após "qr:" até o final da linha
                            qr_value = parts[1].strip()
                            # Ignora se for n/a ou N/A
                            if qr_value.lower() != "n/a":
                                qr_code = qr_value
                                print(f"Debug - QR code completo atualizado: {qr_code}")
                            else:
                                print(f"Debug - QR code N/A ignorado")
                    
                except Exception as e:
                    print(f"Debug - Erro ao processar linha serial: {e}")
    except serial.SerialException as e:
        print(f"❌ Erro na comunicação serial: {e}")
    except Exception as e:
        print(f"❌ Erro inesperado na thread serial: {e}")
        
# Inicializa variáveis globais
sensor_distancia = False
qr_code = "n/a"

# Inicia a thread de leitura da serial
thread = threading.Thread(target=ler_serial)
thread.daemon = True
thread.start()

def QRCodeV():
    """Retorna o último QR Code lido."""
    return qr_code

def objeto_detectado():
    """Retorna True se o sensor de distância detectar um objeto."""
    return sensor_distancia

def validar_qrcode(remedio_id, qrcode_lido):
    """
    Valida um código QR na API.
    
    Argumentos:
        remedio_id (int): ID do medicamento
        qrcode_lido (str): Conteúdo do código QR a ser validado
        
    Retorna:
        bool: True se o código QR é válido, False caso contrário
    """
    try:
        API_URL = "https://two025-1a-t12-ec05-g03.onrender.com/qrcode/validar"

        headers = {'Content-Type': 'application/json'}
        payload = {"remedio_id": remedio_id, "qrcode_lido": qrcode_lido}
        
        print(f"Enviando para API: {payload}")
        
        response = requests.get(API_URL, json=payload, headers=headers)

        print(f"Resposta completa da API: Status={response.status_code}, Body={response.text}")

        if response.status_code == 200:
            try:
                resposta_json = response.json()
                if resposta_json.get('message') == 'QRCode válido' :
                    print(f"✅ Consegui validar o QR Code com sucesso: {resposta_json}")
                    return True
                else:
                    print(f"❌ Não consegui validar o QR Code, ele não corresponde ao medicamento.")
                    return False
            except ValueError as e:
                print(f"❌ Não consegui interpretar a resposta da API como JSON: {e}")
                return False
        elif response.status_code == 404:
            print(f"❌ Não consegui reconhecer este QR Code")
            return False
        elif response.status_code == 405:
            print(f"❌ Método não permitido (405). A API não aceita requisições POST no endpoint informado.")
            try:
                get_response = requests.get(f"{API_URL}?remedio_id={remedio_id}&qrcode_lido={qrcode_lido}")
                print(f"Tentativa GET: Status={get_response.status_code}, Body={get_response.text}")
                if get_response.status_code == 200:
                    return True
            except Exception as e:
                print(f"❌ Tentativa com GET também falhou: {e}")
            return False
        else:
            print(f"❌ Tive um problema na comunicação com a API: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Tive um problema ao tentar validar o QR Code: {e}")
        return False


def enviar_log(id_pedido, id_remedio_em_separacao, codigo_log):
    """
    Envia informações de log para a API.
    
    Argumentos:
        id_pedido (int): ID do pedido
        id_remedio_em_separacao (int): ID do medicamento
        codigo_log (int): Código do log
    """
    try:
        url = "https://two025-1a-t12-ec05-g03.onrender.com/logs/cadastrar"
        dados = {
            "id_pedido": id_pedido,
            "id_remedio_em_separacao": id_remedio_em_separacao,
            "codigo_log": codigo_log
        }
        response = requests.post(url, json=dados)
        if response.status_code == 200 or response.status_code == 201:
            print(f"✅ Enviei o log com sucesso: {dados}")
        else:
            print(f"❌ Não consegui enviar o log: {response.status_code}")
    except Exception as e:
        print(f"❌ Tive um problema na requisição para a API: {e}")


def obter_pedidos():
    """
    Obtém pedidos da API.
    
    Retorna:
        list: Lista de pedidos, lista vazia se houver erro
    """
    try:
        url = "https://two025-1a-t12-ec05-g03.onrender.com/pedidos/lista"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Não consegui obter os pedidos: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Tive um problema na requisição para obter pedidos: {e}")
        return []


#####################################
# FUNÇÃO PRINCIPAL E EXECUÇÃO
#####################################

def main():
    """Função principal que controla o robô e processa pedidos."""
    # ----- Posições de arquivos JSON -----
    # Obtém localizações de arquivos JSON
    ilhas = pd.read_json("posicoes_ilhas.json")
 
    # Define função para obter localização específica
    def locais(i):
        ilha_0 = ilhas[(ilhas['ilha'] == 0) & (ilhas['etapa'] == i)]
        ilha_1 = ilhas[(ilhas['ilha'] == 1) & (ilhas['etapa'] == i)]
        
        return ilha_0['position'].tolist() + ilha_1['position'].tolist()
    
    # Lê posições da fita do JSON
    fita = pd.read_json("fita.json")
    
    # Função para obter posições da fita para uma determinada etapa
    def locais_fita(i):
        fita_0 = fita[(fita['ilha'] == 0) & (fita['etapa'] == i)]
        fita_1 = fita[(fita['ilha'] == 1) & (fita['etapa'] == i)]

        return fita_0['position'].tolist() + fita_1['position'].tolist()

    # ----- Inicializa conexão do Dobot -----
    # Obtém portas disponíveis e tenta conectar
    available_ports = list_ports.comports()
    if not available_ports:
        print("Não encontrei nenhuma porta serial. Por favor, conecte o Dobot e tente novamente.")
        return

    print("Portas disponíveis:")
    for p in available_ports:
        print(f" - {p.device}")

    print("\nVou tentar conectar em cada porta...")
    device = None
    for p in available_ports:
        porta = p.device
        print(f"\n### Testando porta {porta} ###")
        try:
            device = InteliDobot(port=porta, verbose=False)
            (x, y, z, r, j1, j2, j3, j4) = device.pose()
            print(f"Sucesso! Consegui me conectar! Minha pose inicial é: x={x} y={y} z={z} j1={j1} j2={j2} j3={j3} j4={j4}")
            device.GoHomeInteli()
            time.sleep(1)
            break
        except Exception as e:
            print(f"Não consegui me conectar na porta {porta}: {e}")

    if device is None:
        print("Não consegui encontrar nenhuma porta válida. Vou encerrar...")
        enviar_log(1, 1, LOG_ERRO_DOBOT)  # Registra erro de conexão com o Dobot
        return

    # ----- Configura contadores para rastrear sucessos e erros -----
    contador_sucessos = 0
    contador_erros = {
        LOG_QR_NAO_CORRESPONDE: 0,
        LOG_QR_NAO_RECONHECIDO: 0,
        LOG_REMEDIO_NAO_COLETADO: 0,
        LOG_REMEDIO_CAIU: 0,
        LOG_ERRO_DOBOT: 0
    }

    # ----- Funções auxiliares de movimento -----
    def safe_move(ilha):
        """Movimento seguro para uma posição (com Z=130)"""
        try:
            device.movel_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)
        except Exception as e:
            print(f"Não consegui me mover de forma segura: {e}")
            enviar_log(pedido_atual["id"], remedio_atual, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
                
    def safe_movej(ilha):
        """Movimento seguro de junta para uma posição (com Z=130)"""
        try:
            device.movej_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)
        except Exception as e:
            print(f"Não consegui me mover de forma segura: {e}")
            enviar_log(pedido_atual["id"], remedio_atual, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1

    # ----- Função para processar ilha -----
    def processa_ilha(ilha_num, id_pedido, id_remedio):
        """
        Processa medicamento de uma ilha.
        
        Argumentos:
            ilha_num (int): Número da ilha
            id_pedido (int): ID do pedido
            id_remedio (int): ID do medicamento
            
        Retorna:
            bool: True se bem-sucedido, False caso contrário
        """
        nonlocal contador_sucessos
        
        try:
            ilha = locais(ilha_num)

            # Move para posição de leitura
            try:
                safe_movej(ilha)
                print(f"Estou me movendo para a posição de leitura da ilha {ilha_num}...")
                safe_movej(ilha)
                time.sleep(2)
                
            except Exception as e:
                print(f"Não consegui me mover para a posição de leitura: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False
            
            # Move para ler o código QR
            try:
                device.movej_to(ilha[0]["x"], ilha[0]["y"], ilha[0]["z"], ilha[0]["r"], wait=True)
                time.sleep(1)
                
            except Exception as e:
                print(f"Não consegui me mover para ler o QR code: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False
            
            # Lê e valida o código QR
            try:
                print("Estou lendo o QR Code do medicamento...")
                
                # Aguarda um tempo para o QR code ser detectado
                print("Aguardando leitura estável do QR code...")
                time.sleep(2)  # Dá tempo para a câmera capturar o QR code
                
                # Leitura sincronizada do QR code
                qrcode_lido = QRCodeV()
                print(f"QR code lido: '{qrcode_lido}'")
                
                if qrcode_lido == "n/a" or not qrcode_lido:
                    print(f"Não consegui enxergar o QR-code na ilha {ilha_num}")
                    enviar_log(id_pedido, id_remedio, LOG_QR_NAO_RECONHECIDO)
                    contador_erros[LOG_QR_NAO_RECONHECIDO] += 1
                    return False
                
                # Valida o QR code com a API - execução sincronizada
                print(f"Validando o QR code '{qrcode_lido}' com a API para o remédio ID: {id_remedio}...")
                qrcode_valido = validar_qrcode(id_remedio, qrcode_lido)
                print(f"Resultado da validação: {'Válido' if qrcode_valido else 'Inválido'}")
                
                if not qrcode_valido:
                    print(f"O QR code lido não corresponde ao medicamento da ilha {ilha_num}")
                    enviar_log(id_pedido, id_remedio, LOG_QR_NAO_CORRESPONDE)
                    contador_erros[LOG_QR_NAO_CORRESPONDE] += 1
                    return False
                
                print("QR Code validado com sucesso pela API! Prosseguindo com a coleta...")
                time.sleep(1)  # Pausa antes de prosseguir para garantir sincronização

            except Exception as e:
                print(f"Tive um problema ao ler/verificar o QR Code: {e}")
                enviar_log(id_pedido, id_remedio, LOG_QR_NAO_RECONHECIDO)
                contador_erros[LOG_QR_NAO_RECONHECIDO] += 1
                return False
            except Exception as e:
                print(f"Tive um problema ao ler/verificar o QR Code: {e}")
                enviar_log(id_pedido, id_remedio, LOG_QR_NAO_RECONHECIDO)
                contador_erros[LOG_QR_NAO_RECONHECIDO] += 1
                return False
                
            # Coleta o medicamento
            try:
                print(f"Estou ativando a sucção para coletar o medicamento da ilha {ilha_num}...")
                device.suck(True)
                time.sleep(0.5)  # Aguarda para a sucção estabilizar
            except Exception as e:
                print(f"Não consegui coletar o medicamento: {e}")
                enviar_log(id_pedido, id_remedio, LOG_REMEDIO_NAO_COLETADO)
                contador_erros[LOG_REMEDIO_NAO_COLETADO] += 1
                device.suck(False)  # Desativa sucção por segurança
                return False
            
            # Movimento com o medicamento
            try:
                safe_movej(ilha)
                time.sleep(1)
                device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"], ilha[1]["r"], wait=True)
                time.sleep(1)
                safe_move(ilha)
                
                # Verifica se o medicamento ainda está sendo segurado
                print("Estou verificando se o medicamento continua coletado após movimento...")
                medicamento_no_trajeto = objeto_detectado()
                
                if not medicamento_no_trajeto:
                    print(f"Oh não! O medicamento caiu durante o percurso da ilha {ilha_num}")
                    enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                    contador_erros[LOG_REMEDIO_CAIU] += 1
                    device.suck(False)  # Desativa sucção
                    return False
                
                print("Ótimo! O medicamento continua seguro após o movimento!")
                
            except Exception as e:
                print(f"Tive um problema durante a movimentação com o medicamento: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                device.suck(False)  # Desativa sucção por segurança
                return False
                    
            print("Estou me movendo para uma posição à direita da ilha...")
            time.sleep(1)
            
            # Concluído com sucesso
            print(f"Consegui coletar o medicamento da ilha {ilha_num} com sucesso!")
            enviar_log(id_pedido, id_remedio, LOG_SUCESSO)
            contador_sucessos += 1
            return True
        except Exception as e:
            print(f"Tive um problema inesperado ao processar a ilha {ilha_num}: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False

    # ----- Função para processar fita de medicamentos -----
    def processa_fita(id_pedido, id_remedio):
        """
        Processa colocação de medicamento na fita.
        
        Argumentos:
            id_pedido (int): ID do pedido
            id_remedio (int): ID do medicamento
            
        Retorna:
            bool: True se bem-sucedido, False caso contrário
        """
        nonlocal contador_sucessos
        # Variável estática para manter o contador entre chamadas da função
        if not hasattr(processa_fita, "fita_contador"):
            processa_fita.fita_contador = 0
        
        try:
            # Obtém posições da fita
            posicoes_fita = locais_fita(processa_fita.fita_contador)
            
            print(f"Estou depositando o medicamento na fita, etapa {processa_fita.fita_contador}...")

            # Movimento inicial para a posição da fita
            try:
                if processa_fita.fita_contador == 0:
                    # Obtém ângulos atuais das juntas
                    _, _, _, _, current_j1, current_j2, current_j3, current_j4 = device.pose()
                    
                    # Define o ângulo desejado para J1
                    desired_j1 = 45  # Substitua pelo ângulo correto para sua aplicação
                    
                    # Move apenas J1, mantendo outras juntas iguais
                    device.movej_angles(desired_j1, current_j2, current_j3, current_j4, wait=True)
                else:
                    safe_movej(posicoes_fita)
                
                safe_movej(posicoes_fita)
                time.sleep(2)
                
            except Exception as e:
                print(f"Não consegui me mover para a posição inicial da fita: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False

            # Verifica se o medicamento ainda está sendo segurado antes da deposição
            try:
                print("Estou verificando se o medicamento ainda está presente...")
                medicamento_presente = objeto_detectado()
                
                if not medicamento_presente:
                    print("Oh não! O medicamento caiu antes de chegar à posição de deposição")
                    enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                    contador_erros[LOG_REMEDIO_CAIU] += 1
                    device.suck(False)  # Desativa sucção por segurança
                    return False
                
                print("Medicamento detectado! Vou prosseguir com a deposição.")
            except Exception as e:
                print(f"Tive um problema ao verificar o medicamento antes da deposição: {e}")
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
                print(f"Não consegui me mover para a posição de deposição: {e}")
                enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
                contador_erros[LOG_ERRO_DOBOT] += 1
                return False
            
            # Deposição do medicamento
            try:
                print("Estou desativando a sucção para depositar o medicamento...")
                device.suck(False)
                time.sleep(0.5)  # Aguarda para estabilização
                
                # Verifica se o medicamento foi depositado corretamente
                medicamento_depositado = not objeto_detectado()  # True se NÃO detectar objeto
                
                if not medicamento_depositado:
                    print(f"Não consegui depositar o medicamento na fita, etapa {processa_fita.fita_contador}")
                    enviar_log(id_pedido, id_remedio, LOG_REMEDIO_CAIU)
                    contador_erros[LOG_REMEDIO_CAIU] += 1
                    return False
                
                print("Consegui depositar o medicamento com sucesso na fita!")
                enviar_log(id_pedido, id_remedio, LOG_SUCESSO)
                contador_sucessos += 1
            except Exception as e:
                print(f"Tive um problema ao depositar o medicamento: {e}")
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
                print(f"Não consegui retornar à posição segura: {e}")
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
            print(f"Tive um problema inesperado ao processar a fita: {e}")
            enviar_log(id_pedido, id_remedio, LOG_ERRO_DOBOT)
            contador_erros[LOG_ERRO_DOBOT] += 1
            return False
    
    # ----- Função para processar pedido completo -----
    def processar_pedido(pedido):
        """
        Processa um pedido completo.
        
        Argumentos:
            pedido (dict): Informações do pedido
        """
        print(f"\nEstou processando o pedido ID: {pedido['id']}")
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
                print(f"Não consegui processar o remédio ID: {remedio['id']}")
                device.GoHomeInteli()  # Retorna à posição inicial mesmo em caso de falha
    
    # ----- Seleção do modo de operação -----
    modo_operacao = input("Selecione o modo de operação (1 - Manual, 2 - API): ")
    
    if modo_operacao == "1":
        # Modo manual com entrada do usuário
        ilhas_input = input("Digite os números das ilhas separados por vírgula: ")
        # Cria uma fila para organizar as ilhas em ordem
        fila_ilhas = deque(map(int, ilhas_input.split(',')))
        
        # Cria um pedido fictício para o modo manual
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
                print("Não encontrei nenhum pedido disponível. Vou aguardar...")
                time.sleep(10)  # Aguarda 10 segundos antes de verificar novamente
                continue
            
            # Processa um pedido por vez
            for pedido_atual in pedidos:
                processar_pedido(pedido_atual)
                
                # Marca o pedido como concluído na API
                try:
                    url = f"https://two025-1a-t12-ec05-g03.onrender.com/pedidos/status/{pedido_atual['id']}"
                    body = {
                        "status": 3,  # Adicionei aspas em "status"
                    }
                    requests.patch(url, json=body)
                except Exception as e:
                    print(f"Não consegui marcar o pedido como concluído: {e}")
                
                # Pergunta ao usuário se deseja continuar ou encerrar
                continuar = input("Deseja processar o próximo pedido? (s/n): ")
                if continuar.lower() != 's':
                    break
            
            # Se saiu do loop for por causa do break, também sai do loop while
            if continuar.lower() != 's':
                break
            

    # ----- Gera relatório final -----
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
    print("Terminei a operação. Até a próxima!")


if __name__ == "__main__":
    main()
