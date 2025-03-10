from serial.tools import list_ports
import pydobot
import time
import sys
import pandas as pd
from collections import deque

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
            break  # Conecta na primeira porta válida encontrada
        except Exception as e:
            print(f"Erro ao testar a porta {porta}: {e}")

    if device is None:
        print("Nenhuma porta válida foi encontrada. Encerrando...")
        return


    def safe_move(ilha):
        # Move para a posição de segurança (posição de leitura + 90 no eixo Z)
        device.movel_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)
                
    def safe_movej(ilha):
        device.movej_to(ilha[1]["x"], ilha[1]["y"], 130, ilha[1]["r"], wait=True)

    def processa_ilha(ilha_num):
        ilha = locais(ilha_num)

        safe_movej(ilha)
        print(f"Movendo para a posição de leitura da ilha {ilha_num}...")
        safe_movej(ilha)
        time.sleep(2)
        # Movimento para ler o medicamento
        device.movej_to(ilha[0]["x"], ilha[0]["y"], ilha[0]["z"], ilha[0]["r"], wait=True)
        time.sleep(1)        
        
        print(f"Ativando sucção e movendo para a posição da ilha {ilha_num}...")
        device.suck(True)
        safe_movej(ilha)
        
        time.sleep(1)
        device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"], ilha[1]["r"], wait=True)
        time.sleep(1)
        safe_move(ilha)
                
        print("Movendo para uma posição à direita da ilha...")
        time.sleep(1)
        
        # Retorna à posição inicial (Home)
        print("Retornando à posição Home...")

    # Contador para a próxima posição na fita
    fita_contador = 0

    # FUNÇÃO MODIFICADA: Processa a fita de medicamentos automaticamente
    def processa_fita():
        # Variável estática para manter o estado do contador entre chamadas da função
        if not hasattr(processa_fita, "fita_contador"):
            processa_fita.fita_contador = 0
        
        # Obtém as posições da fita
        posicoes_fita = locais_fita(processa_fita.fita_contador)
        
        print(f"Depositando medicamento na fita, etapa {processa_fita.fita_contador}...")

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

        # Movimento para a posição de deposição
        device.movel_to(
            posicoes_fita[1]["x"],
            posicoes_fita[1]["y"],
            posicoes_fita[1]["z"],
            posicoes_fita[1]["r"],
            wait=True
        )
        time.sleep(1)
        device.suck(False)
        
        # Retorna à posição segura após depositar
        if processa_fita.fita_contador == 0:
            safe_movej(posicoes_fita)
            device.GoHomeInteli()
        else:
            device.GoHomeInteli()
            time.sleep(1)
            safe_movej(posicoes_fita)
            time.sleep(1)
        
        device.GoHomeInteli()
        
        # Incrementa o contador e reinicia se atingir o valor máximo (4)
        if processa_fita.fita_contador == 4:
            processa_fita.fita_contador = 0
        else:
            processa_fita.fita_contador += 1
    
    # Solicita ao usuário os números das ilhas separados por vírgula
    ilhas_input = input("Digite os números das ilhas separados por vírgula: ")
    # Cria uma fila (queue) para organizar as ilhas em ordem (one in one out)
    fila_ilhas = deque(map(int, ilhas_input.split(',')))

    # Processa cada ilha na ordem em que foram inseridas
    while fila_ilhas:
        ilha_num = fila_ilhas.popleft()
        processa_ilha(ilha_num)
        device.GoHomeInteli()
        time.sleep(1)
        processa_fita()
        device.GoHomeInteli()

    device.close()
    print("Operação finalizada.")

if __name__ == "__main__":
    main()