import serial
import requests

def QRCodeV():
    try:
        ser = serial.Serial('COM15', 9600, timeout=1)  
    except serial.SerialException as e:
        print(f"❌ Erro ao abrir a porta serial: {e}")
        return  # Sai da função para evitar que o código continue rodando sem conexão

    API_URL = "https://two025-1a-t12-ec05-g03.onrender.com/qrcode/validar"

    print("📡 Sistema pronto! Aguardando QR Codes...")

    while True:
        try:
            qrcode_lido = ser.readline().decode('utf-8').strip()
            remedio_id = 1

            if qrcode_lido:
                print(f"🔍 QR Code detectado: {qrcode_lido}")

                response = requests.get(API_URL, json={"remedio_id": remedio_id,"qrcode_lido": qrcode_lido})

                if response.status_code == 200:
                    print(f"✅ Resposta do servidor: {response.json()}")
                else:
                    print(f"❌ Erro na API: {response.status_code} - {response.text}")

        except serial.SerialException as e:
            print(f"❌ Erro na comunicação serial: {e}")
            break  # Encerra o loop se houver erro de comunicação
        except requests.RequestException as e:
            print(f"❌ Erro na requisição para a API: {e}")

if __name__ == "__main__":
    QRCodeV()
