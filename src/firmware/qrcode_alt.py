import serial
import time

def QrCode():
    qrSerial = serial.Serial('COM3', 9600, timeout=1)  # Ajuste a porta para a sua (ex: 'COM3', '/dev/ttyUSB0', etc. No meu caso, eu estou usando o Windows, portanto a maneira de identificar a porta é COM e o número da porta. Quando formos para o RaspBerry, por usarmos o Linux, utilizaremos '/dev/ttyUSB0')
    serialOutput = serial.Serial('COM1', 9600) 

    qrText = ""
    startTime = time.time()

    while time.time() - startTime < 1:  
        if qrSerial.in_waiting > 0:
            c = qrSerial.read().decode('utf-8')
            qrText += c
            startTime = time.time()

    qrText = qrText.strip()

    if len(qrText) > 0:
        serialOutput.write(f"{qrText}".encode())
        return qrText
    else:
        serialOutput.write("❌ Nenhum QR Code detectado no tempo limite.\n".encode())
        return None

if __name__ == "__main__":
    QrCode()