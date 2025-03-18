import json
from serial.tools import list_ports
import pydobot
import keyboard
import time
import sys

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

def main():
    data = []

    available_ports = list_ports.comports()
    if not available_ports:
        print("Nenhuma porta serial encontrada. Conecte o Dobot e tente novamente.")
        return

    print("Portas disponíveis:")
    device = None
    for p in available_ports:
        print(f" - {p.device}")

    print("\nTentando conectar em cada porta...")
    for p in available_ports:
        porta = p.device
        print(f"\n### Testando porta {porta} ###")
        try:
            device = InteliDobot(port=porta, verbose=False)
            (x, y, z, r, j1, j2, j3, j4) = device.pose()
            print(f"Conectado! Pose inicial: x={x}, y={y}, z={z}, r={r}, j1={j1}, j2={j2}, j3={j3}, j4={j4}")
            break
        except Exception as e:
            print(f"Erro na porta {porta}: {e}")

    if not device:
        print("Não foi possível conectar em nenhuma porta.")
        return

    # Para cada objeto (etapas de 0 a 4), registra primeiro a posição de escaneamento e depois a de preensão.
    for etapa in range(5):
        # Posição de escaneamento (ilha = 0)
        print(f"\nEtapa {etapa} - Posição de escaneamento (ilha = 0):")
        print("Posicione o Dobot na posição de escaneamento e pressione shift+c")
        keyboard.wait("shift+c")
        pos = device.pose()
        registro = {
            "ilha": 0,
            "etapa": etapa,
            "position": {
                "x": pos[0],
                "y": pos[1],
                "z": pos[2],
                "r": pos[3],
                "j1": pos[4],
                "j2": pos[5],
                "j3": pos[6],
                "j4": pos[7]
            },
            "suck": False,   # Posição de escaneamento
            "movement": True
        }
        data.append(registro)
        print(f"Posição de escaneamento registrada: {registro}")
        time.sleep(0.5)

        # Posição de preensão (ilha = 1)
        print(f"\nEtapa {etapa} - Posição de preensão (ilha = 1):")
        print("Posicione o Dobot na posição de preensão e pressione shift+c")
        keyboard.wait("shift+c")
        pos = device.pose()
        registro = {
            "ilha": 1,
            "etapa": etapa,
            "position": {
                "x": pos[0],
                "y": pos[1],
                "z": pos[2],
                "r": pos[3],
                "j1": pos[4],
                "j2": pos[5],
                "j3": pos[6],
                "j4": pos[7]
            },
            "suck": True,    # Posição de preensão (para pegar o objeto)
            "movement": True
        }
        data.append(registro)
        print(f"Posição de preensão registrada: {registro}")
        time.sleep(0.5)

    # Posição final extra (por exemplo, para depósito)
    print("\nEtapa 5 - Posição final (ilha = 1):")
    print("Posicione o Dobot na posição final e pressione shift+c")
    keyboard.wait("shift+c")
    pos = device.pose()
    registro = {
        "ilha": 1,
        "etapa": 5,
        "position": {
            "x": pos[0],
            "y": pos[1],
            "z": pos[2],
            "r": pos[3],
            "j1": pos[4],
            "j2": pos[5],
            "j3": pos[6],
            "j4": pos[7]
        },
        "suck": False,   # Posição final normalmente sem sucção
        "movement": True
    }
    data.append(registro)
    print(f"Posição final registrada: {registro}")

    # Salva os dados em um arquivo JSON
    with open("fita.json", "w") as f:
        json.dump(data, f, indent=4)
    print("Dados salvos no arquivo fita.json")

if __name__ == "__main__":
    main()
