import json
import pandas as pd
import time
import keyboard
from serial.tools import list_ports
from collections import deque
import pydobot

# Supondo que a classe InteliDobot já esteja definida, por exemplo:
class InteliDobot(pydobot.Dobot):
    def __init__(self, port=None, verbose=False):
        super().__init__(port=port, verbose=verbose)

    def movej_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVJ_XYZ, wait=wait)

    def movel_to(self, x, y, z, r, wait=True):
        super()._set_ptp_cmd(x, y, z, r, mode=pydobot.enums.PTPMode.MOVL_XYZ, wait=wait)

    def GoHomeInteli(self):
        msg = pydobot.message.Message()
        msg.id = pydobot.enums.CommunicationProtocolIDs.SET_HOME_CMD
        msg.ctrl = pydobot.enums.ControlValues.ONE
        return super()._send_command(msg)
    
    def SetSpeed(self, speed, acceleration):
        super().speed(speed, acceleration)

# Carrega os arquivos JSON
ilhas = pd.read_json("posicoes_ilhas.json")
fita_df = pd.read_json("fita.json")  # renomeado para não conflitar com a função abaixo

# Funções para obter posições (cada seção possui duas posições: índice 0 e 1)
def locais(etapa):
    ilha_0 = ilhas[(ilhas['ilha'] == 0) & (ilhas['etapa'] == etapa)]
    ilha_1 = ilhas[(ilhas['ilha'] == 1) & (ilhas['etapa'] == etapa)]
    return ilha_0['position'].tolist() + ilha_1['position'].tolist()

def locais_fita(etapa):
    fita_0 = fita_df[(fita_df['ilha'] == 0) & (fita_df['etapa'] == etapa)]
    fita_1 = fita_df[(fita_df['ilha'] == 1) & (fita_df['etapa'] == etapa)]
    return fita_0['position'].tolist() + fita_1['position'].tolist()

# Conexão com o Dobot
available_ports = list_ports.comports()
if not available_ports:
    print("Nenhuma porta serial encontrada. Conecte o Dobot e tente novamente.")
    exit()

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
    exit()

# Função para mover para uma posição de segurança (posição de leitura + 80 no eixo Z)
def safe_move(locais_pos):
    pos = locais_pos[1]
    device.movel_to(pos["x"], pos["y"], pos["z"] + 80, pos["r"], wait=True)

# Global para controlar a seção atual da fita (etapa)
current_fita_etapa = 0

# Função para depositar o medicamento na fita
def depositarFita():
    global current_fita_etapa
    # Obtém as posições da seção da fita para a etapa atual
    tape_positions = locais_fita(current_fita_etapa)
    print(f"Depositando na fita, seção (etapa) {current_fita_etapa}...")
    
    # Move para a posição de segurança acima da fita
    safe_move(tape_positions)
    
    # Movimento para posicionar o medicamento na posição de leitura da fita
    device.movej_to(tape_positions[0]["x"], tape_positions[0]["y"], tape_positions[0]["z"], tape_positions[0]["r"], wait=True)
    
    # Libera a sucção para depositar o medicamento
    device.suck(False)
    time.sleep(1)
    
    # Move para a posição final da fita para confirmar o depósito
    device.movel_to(tape_positions[1]["x"], tape_positions[1]["y"], tape_positions[1]["z"], tape_positions[1]["r"], wait=True)
    time.sleep(1)
    
    # Retorna à posição de segurança
    safe_move(tape_positions)
    
    # Incrementa para que o próximo depósito seja feito na seção seguinte
    current_fita_etapa += 1

# Função para processar os movimentos de uma ilha (pegada do medicamento)
def processa_ilha(ilha_num):
    island_positions = locais(ilha_num)
    
    print(f"Movendo para a posição de leitura da ilha {ilha_num}...")
    safe_move(island_positions)
    
    # Movimento para pegar o medicamento na posição de leitura
    device.movej_to(island_positions[0]["x"], island_positions[0]["y"], island_positions[0]["z"], island_positions[0]["r"], wait=True)
    safe_move(island_positions)
    
    time.sleep(1)
    
    print(f"Ativando sucção e movendo para a posição da ilha {ilha_num} para pegar o medicamento...")
    device.suck(True)
    time.sleep(1)
    device.movel_to(island_positions[1]["x"], island_positions[1]["y"], island_positions[1]["z"], island_positions[1]["r"], wait=True)
    time.sleep(1)
    safe_move(island_positions)
    
    # Após pegar o medicamento, deposita-o na próxima seção disponível da fita
    depositarFita()
    
    print("Movendo para uma posição à direita da ilha...")
    time.sleep(1)
    
    # Retorna à posição inicial (Home)
    print("Retornando à posição Home...")
    device.GoHomeInteli()
    time.sleep(1)

# Função opcional para processar a fita (caso haja outras operações)
def processa_fita():
    print("Iniciando posicionamento do medicamento na fita!")

# Solicita ao usuário os números das ilhas separados por vírgula
ilhas_input = input("Digite os números das ilhas separados por vírgula: ")
# Cria uma fila para processar as ilhas na ordem informada (one in one out)
fila_ilhas = deque(map(int, ilhas_input.split(',')))

# Processa cada ilha conforme a ordem inserida
while fila_ilhas:
    ilha_num = fila_ilhas.popleft()
    processa_ilha(ilha_num)

device.close()
print("Operação finalizada.")
