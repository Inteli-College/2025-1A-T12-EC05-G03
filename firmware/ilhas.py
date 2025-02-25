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
        device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"] + 70, ilha[1]["r"], wait=True)
                

    def processa_ilha(ilha_num):
        ilha = locais(ilha_num)
        
        print(f"Movendo para a posição de leitura da ilha {ilha_num}...")
        safe_move(ilha)

        # Movimento para pegar o medicamento
        device.movej_to(ilha[0]["x"], ilha[0]["y"], ilha[0]["z"], ilha[0]["r"], wait=True)
        safe_move(ilha)
        
        time.sleep(1)
        
        print(f"Ativando sucção e movendo para a posição da ilha {ilha_num}...")
        device.suck(True)
        safe_move(ilha)
        
        time.sleep(1)
        device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"], ilha[1]["r"], wait=True)
        time.sleep(1)
        safe_move(ilha)
                
        print("Movendo para uma posição à direita da ilha...")
        time.sleep(1)
        
        # Retorna à posição inicial (Home)
        print("Retornando à posição Home...")
        device.GoHomeInteli()
        time.sleep(1)

    # FUNÇÃO NOVA: Processa a fita de medicamentos, você vai mexer aqui pablito
    def processa_fita():
        
        # Solicita ao usuário a etapa da fita para depositar o medicamento
        fita_etapa = int(input("Digite a etapa da fita para depositar o medicamento: "))
        posicoes_fita = locais_fita(fita_etapa)
        
        print(f"Depositando medicamento na fita, etapa {fita_etapa}...")

        # Move para a posição de segurança (posição de leitura + 80 no eixo Z)
        device.movej_to(posicoes_fita[1]["x"], posicoes_fita[1]["y"], posicoes_fita[1]["z"] + 80, posicoes_fita[1]["r"], wait=True)
        time.sleep(1)
        

        # Movimento para a posição de leitura da fita
# Movimento para a posição de leitura da fita

        # Desativa a sucção para depositar o medicamento
        
        # Movimento para a posição final da fita (de depósito)
        device.movel_to(posicoes_fita[1]["x"], posicoes_fita[1]["y"], posicoes_fita[1]["z"], posicoes_fita[1]["r"], wait=True)
        time.sleep(1)
        device.suck(False)
        time.sleep(1)
        
        # Retorna à posição de segurança
        device.movej_to(posicoes_fita[1]["x"], posicoes_fita[1]["y"], posicoes_fita[1]["z"] + 80, posicoes_fita[1]["r"], wait=True)
        time.sleep(1)

        device.GoHomeInteli()

    
    # Solicita ao usuário os números das ilhas separados por vírgula
    ilhas_input = input("Digite os números das ilhas separados por vírgula: ")
    # Cria uma fila (queue) para organizar as ilhas em ordem (one in one out)
    fila_ilhas = deque(map(int, ilhas_input.split(',')))

    # Processa cada ilha na ordem em que foram inseridas
    while fila_ilhas:
        ilha_num = fila_ilhas.popleft()
        processa_ilha(ilha_num)
        processa_fita()

    device.close()
    print("Operação finalizada.")

if __name__ == "__main__":
    main()
