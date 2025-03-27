"""
Funções para leitura e validação de códigos QR.
"""

import requests
import serial
import time

# Variável global para armazenar o último QR code lido
qr_code = "n/a"

def update_qrcode(novo_code):
    global qr_code
    qr_code = novo_code

def QRCodeV(qrcode_procurado):
    global qr_code
    
    try:
        # Conecta à porta serial
        with serial.Serial('/dev/ttyACM0', 9600, timeout=2) as ser:
            ser.reset_input_buffer()
            
            # Tenta ler múltiplas vezes
            tentativas = 3
            novo_qrcode = qr_code
            
            for i in range(tentativas):
                linha = ser.readline().decode('latin-1').strip()
                if "qr:" in linha:
                    parts = linha.split("qr:")
                    if len(parts) > 1:
                        valor = parts[1].strip()
                        if valor.lower() != "n/a":
                            novo_qrcode = valor
                            update_qrcode(novo_qrcode)
                            print(f"🔍 Detectei um QR Code: {novo_qrcode}")
                            # Agora validamos o código lido
                            return novo_qrcode
                
                time.sleep(0.5)
            
            # Se chegou aqui, não conseguiu ler um QR code válido
            novo_qrcode = 0
            return novo_qrcode

    except serial.SerialException as e:
        print(f"❌ Erro na comunicação serial ao ler QR code: {e}")
        return "n/a"
    except Exception as e:
        print(f"❌ Erro inesperado ao ler QR code: {e}")
        return "n/a"
        
def validar_qrcode(qrcode_procurado, qrcode_lido):
    """    
    body:
        qrcode_procurado: O qrcode correto que está sendo procurado
        qrcode_procurado: O qrcode correto que está sendo procurado
        qrcode_lido: Conteúdo do código QR a ser validado
    """
    try:
        API_URL = "https://two025-1a-t12-ec05-g03.onrender.com/qrcode/validar"
        
        headers = {'Content-Type': 'application/json'}
        payload = {"qrcode_procurado": qrcode_procurado, "qrcode_lido": qrcode_lido}
        
        print(f"Enviando para API: {payload}")
        
        # Use GET em vez de POST se a API espera GET
        response = requests.post(API_URL, json=payload, headers=headers)
        
        print(f"Resposta completa da API: Status={response.status_code}, Body={response.text}")

        if response.status_code == 200:
            try:
                resposta_json = response.json()
                if resposta_json.get('message') == 'QRCode válido':
                    print(f"✅ Consegui validar o QR Code com sucesso: {resposta_json}")
                    return True
                else:
                    print(f"❌ Não consegui validar o QR Code, ele não corresponde ao medicamento.")
                    return False
            except ValueError as e:
                print(f"❌ Não consegui interpretar a resposta da API como JSON: {e}")
                return False
        elif response.status_code == 404:
            print(f"❌ Não consegui reconhecer este QR Code")
            return False
        else:
            print(f"❌ Tive um problema na comunicação com a API: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ Tive um problema ao tentar validar o QR Code: {e}")
        return False