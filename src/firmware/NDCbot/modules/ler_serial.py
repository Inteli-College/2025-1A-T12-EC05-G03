'''
Funções para ler informações do serial
'''
import serial

def ler_serial():
    SERIAL_PORT = '/dev/ttyACM0'  # Porta do Arduino no Raspberry Pi
    BAUD_RATE = 9600

    global sensor_distancia, qr_code
    
    if 'sensor_distancia' not in globals():
        global sensor_distancia
        sensor_distancia = False
    if 'qr_code' not in globals():
        global qr_code
        qr_code = "n/a"

    # Inicializa variáveis globais
    sensor_distancia = False
    qr_code = "n/a"
    
    try:
        with serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1) as ser:
            while True:
                try:
                    linha = ser.readline().decode('latin-1').strip()
                    if not linha:
                        continue
                    
                    print(f"Debug - Received serial data: '{linha}'")
                    
                    # Primeiro processa sensorD e depois qr, para evitar problemas com vírgulas no QR
                    if "sensorD:" in linha:
                        parts = linha.split("sensorD:")
                        if len(parts) > 1:
                            valor_sensor = parts[1].split(",")[0].strip()
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