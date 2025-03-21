"""
Funções para leitura do sensor de distância.
"""

import serial
import time

# Variável global para armazenar o último valor do sensor
sensor_value = False

def verificar_sensor(porta='/dev/ttyACM0', baud_rate=9600):
    """
    Lê o valor atual do sensor de distância.
    
    Args:
        porta: Porta serial
        baud_rate: Taxa de comunicação
    
    Returns:
        bool: True se há objeto detectado, False caso contrário
    """
    global sensor_value
    
    try:
        with serial.Serial(porta, baud_rate, timeout=1) as ser:
            ser.reset_input_buffer()
            
            # Envia comando para ler o sensor (se necessário)
            # ser.write(b'S\n')  # Comando exemplo
            
            # Lê a resposta
            linha = ser.readline().decode('latin-1').strip()
            
            if "sensorD:" in linha:
                parts = linha.split("sensorD:")
                if len(parts) > 1:
                    valor = parts[1].split(",")[0].strip()
                    # Inverte a lógica: sensorD:0 significa objeto detectado, sensorD:1 significa nada detectado
                    sensor_value = (valor == "0" or valor == "0 ")
                    return sensor_value
            
            # Usa o último valor conhecido se a leitura falhar
            return sensor_value
            
    except Exception as e:
        print(f"❌ Erro ao ler sensor de distância: {e}")
        return sensor_value

def objeto_detectado():
    return verificar_sensor() #retorna booleano
    