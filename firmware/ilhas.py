from serial.tools import list_ports
import pydobot
import time
import sys
import pandas as pd

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

    ilhas = pd.read_json("posicoes_ilhas.json")
    fita = pd.read_json("fita.json")

    def locais(i):
        ilha_0 = ilhas[(ilhas['ilha'] == 0) & (ilhas['etapa'] == i)]
        ilha_1 = ilhas[(ilhas['ilha'] == 1) & (ilhas['etapa'] == i)]
        
        return ilha_0['position'].tolist() + ilha_1['position'].tolist()
    
    def fita_pos(i):
        pos_fita = fita[fita['ilha'] == i]
        return pos_fita['position'].tolist()
 
    try:
        ilha_num = int(input("Indique o número da ilha desejada (0 a 4): "))
        ilha = locais(ilha_num)
    except ValueError:
        print("Entrada inválida. Encerrando o script.")
        device.close()
        return
    # Movimento para a posição de leitura
    print(f"Movendo para a posição de leitura da ilha {ilha_num}...")
    
    # posicao de segurança
    device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"] + 80, ilha[1]["r"], wait=True)

    device.movej_to(ilha[0]["x"], ilha[0]["y"], ilha[0]["z"] - 10, ilha[0]["r"], wait=True)
    
    # posicao de segurança
    device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"] + 80, ilha[1]["r"], wait=True)

    time.sleep(1)

    # Ativa sucção e move para a posição da ilha
    print(f"Ativando sucção e movendo para a posição da ilha {ilha_num}...")
    device.suck(True)
    time.sleep(1)
    device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"] - 10, ilha[1]["r"], wait=True)
    time.sleep(1)
    # posicao de segurança
    device.movel_to(ilha[1]["x"], ilha[1]["y"], ilha[1]["z"] + 80, ilha[1]["r"], wait=True)

    device.movej_to(-132.88973999023438, 271.6858215332031, -19.19559097290039 + 80, 115.23365783691406)   
    device.movej_to(-132.88973999023438, 271.6858215332031, -19.19559097290039, 115.23365783691406)
    device.suck(False)
    device.movej_to(-132.88973999023438, 271.6858215332031, -19.19559097290039 + 100, 115.23365783691406)   
    print("Movendo para uma posição à direita da ilha...")
    time.sleep(1)



    # Retorna à posição inicial (Home)
    print("Retornando à posição Home...")
    device.GoHomeInteli()

    time.sleep(1)

    device.close()
    print("Operação finalizada.")

if __name__ == "__main__":
    main()
