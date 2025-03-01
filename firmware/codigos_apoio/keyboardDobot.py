import keyboard
from serial.tools import list_ports
import pydobot
import time

# Listar portas disponíveis
available_ports = list_ports.comports()
print(f'Available ports: {[x.device for x in available_ports]}')

# Solicitar a porta ao usuário
porta = input("Indique a porta desejada: ")
port = available_ports[int(porta)].device

# Conectar ao Dobot
device = pydobot.Dobot(port=port, verbose=True)
x, y, z, r, *_ = device.pose()  

def main():
    global x, y, z  
    step = 10 
    print("Controles: W = Frente | S = Trás | A = Esquerda | D = Direita | Q = Sair")

    while True:
        if keyboard.is_pressed('ç'):  # Sair do loop
            print("Saindo...")
            break

        if keyboard.is_pressed('w'):  # Frente (+Y)
            y += step
            device.move_to(x, y, z, r, wait=False)
            time.sleep(0.2)  # Pequena pausa para evitar sobrecarga

        if keyboard.is_pressed('s'):  # Trás (-Y)
            y -= step
            device.move_to(x, y, z, r, wait=False)
            time.sleep(0.2)

        if keyboard.is_pressed('a'):  # Esquerda (-X)
            x -= step
            device.move_to(x, y, z, r, wait=False)
            time.sleep(0.2)

        if keyboard.is_pressed('d'):  # Direita (+X)
            x += step
            device.move_to(x, y, z, r, wait=False)
            time.sleep(0.2)
        
        
        if keyboard.is_pressed('q'):  # Direita (+X)
            z += step
            device.move_to(x, y, z, r, wait=False)
            time.sleep(0.2)
            
        if keyboard.is_pressed('z'):  # Direita (+X)
            z -= step
            device.move_to(x, y, z, r, wait=False)

            
        if keyboard.is_pressed('m'):  # Direita (+X)
            device.suck(True)
            time.sleep(0.2)
        
        if keyboard.is_pressed('n'):  # Direita (-X)
            device.suck(False)
            time.sleep(0.2)
            
            

if __name__ == "__main__":
    main()
