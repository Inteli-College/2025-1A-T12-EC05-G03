import pandas as pd
import time
import json
from serial.tools import list_ports
import pydobot

# Nome do arquivo para armazenar a posição inicial
INITIAL_POSITION_FILE = "posicao_inicial.json"

def salvar_posicao_inicial(x, y, z, r):
    """Salva a posição inicial em um arquivo JSON."""
    with open(INITIAL_POSITION_FILE, "w") as f:
        json.dump({"X": x, "Y": y, "Z": z, "R": r}, f)

def carregar_posicao_inicial():
    """Carrega a posição inicial do arquivo JSON, se existir."""
    try:
        with open(INITIAL_POSITION_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return None

# Lista portas disponíveis
available_ports = list_ports.comports()
ports_list = [x.device for x in available_ports]
print(f'Portas disponíveis: {ports_list}')

if not ports_list:
    print("Nenhuma porta encontrada. Conecte o dispositivo e tente novamente.")
    exit()

# Solicita ao usuário uma escolha válida
while True:
    try:
        porta = int(input(f"Escolha uma porta [0-{len(ports_list)-1}]: "))
        if 0 <= porta < len(ports_list):
            break
        print("Entrada inválida! Escolha um número válido.")
    except ValueError:
        print("Entrada inválida! Digite um número.")

# Conectar ao robô
port = ports_list[porta]
device = pydobot.Dobot(port=port, verbose=True)

# Verifica se há uma posição inicial salva
posicao_inicial = carregar_posicao_inicial()

if posicao_inicial:
    print(f"Posição inicial salva: X={posicao_inicial['X']}, Y={posicao_inicial['Y']}, Z={posicao_inicial['Z']}, R={posicao_inicial['R']}")
    resposta = input("Deseja usar essa posição inicial? (s/n): ").strip().lower()

    if resposta == 'n':
        print("Movimente o robô para a posição desejada e pressione ENTER para definir como novo ponto inicial.")
        input("Pressione ENTER quando estiver pronto...")
        (x_inicial, y_inicial, z_inicial, r_inicial, *_joints) = device.pose()
        salvar_posicao_inicial(x_inicial, y_inicial, z_inicial, r_inicial)
    else:
        x_inicial, y_inicial, z_inicial, r_inicial = posicao_inicial.values()
else:
    print("Movimente o robô para a posição inicial desejada e pressione ENTER para definir.")
    input("Pressione ENTER quando estiver pronto...")
    (x_inicial, y_inicial, z_inicial, r_inicial, *_joints) = device.pose()
    salvar_posicao_inicial(x_inicial, y_inicial, z_inicial, r_inicial)

print(f'Iniciando a partir de: X={x_inicial}, Y={y_inicial}, Z={z_inicial}, R={r_inicial}')
device.move_to(x_inicial, y_inicial, z_inicial, r_inicial, wait=True)

# Lista para armazenar dados
dados = []

try:
    while True:
        (x, y, z, r, *_joints) = device.pose()

        # Calcula variações de posição
        delta_x = x - x_inicial
        delta_y = y - y_inicial
        delta_z = z - z_inicial
        delta_r = r - r_inicial

        distancia = (delta_x ** 2 + delta_y ** 2 + delta_z ** 2) ** 0.5

        dados.append({
            'Tempo': time.time(), 
            'X': x, 'Y': y, 'Z': z, 'R': r, 'Distância': distancia,
            'ΔX': delta_x, 'ΔY': delta_y, 'ΔZ': delta_z, 'ΔR': delta_r
        })

        print(f'Posição atual: X={x}, Y={y}, Z={z}, R={r} | Distância: {distancia:.2f} mm')
        print(f'Variação: ΔX={delta_x:.2f}, ΔY={delta_y:.2f}, ΔZ={delta_z:.2f}, ΔR={delta_r:.2f}')

        time.sleep(10)

except KeyboardInterrupt:
    print("\nInterrompido pelo usuário. Salvando os dados...")
    df = pd.DataFrame(dados)
    df.to_csv("movimentos_dobot.csv", index=False)
    print("Dados salvos em 'movimentos_dobot.csv'.")
