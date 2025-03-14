import RPi.GPIO as GPIO
import time

class SensorDistancia:
    def __init__(self, sensor_pin=8):
        """
        Inicializa o sensor de distância.
        
        Args:
            sensor_pin (int): Pino GPIO ao qual o sensor está conectado
        """
        self.sensor_pin = sensor_pin
        self.inicializar()
        
"""Inicializa o GPIO e configura o pino do sensor como entrada."""
# Configuração do modo do GPIO (BCM ou BOARD)
GPIO.setmode(GPIO.BOARD)
# Configura o pino do sensor como entrada
GPIO.setup(self.sensor_pin, GPIO.IN)
print("Inicialização completa. Sistema pronto.")
        
    def verificar_sensor(self):
        """
        Verifica o estado do sensor e retorna o resultado.
        
        Returns:
            str: Mensagem indicando se um objeto foi detectado
        """
        # Lê o valor do sensor (0 ou 1)
        sensor_value = GPIO.input(self.sensor_pin)
        
        # Se o sensor retornar 0 (objeto detectado)
        if sensor_value == GPIO.LOW:
            return f"Objeto detectado! Valor: {sensor_value}"
        else:
            return f"Nenhum objeto detectado. Valor: {sensor_value}"
    
    def obter_valor_sensor(self):
        """
        Retorna o valor bruto do sensor (0 ou 1).
        
        Returns:
            int: Valor bruto do sensor
        """
        # Lê o valor do sensor
        valor = GPIO.input(self.sensor_pin)
        print(f"Função obter_valor_sensor() retornou: {valor}")
        return valor
    
    def objeto_detectado(self):
        """
        Verifica se há um objeto detectado.
        
        Returns:
            bool: True se um objeto for detectado, False caso contrário
        """
        # Lê o valor do sensor
        valor = GPIO.input(self.sensor_pin)
        resultado = valor == GPIO.LOW
        print(f"Função objeto_detectado() retornou: {'true (Objeto detectado)' if resultado else 'false (Nenhum objeto)'}")
        return resultado
    
    def monitorar_sensor(self):
        """
        Monitora o sensor e retorna o estado atual.
        
        Returns:
            str: Mensagem indicando o estado do sensor
        """
        # Lê o valor do sensor
        estado_sensor = GPIO.input(self.sensor_pin)
        
        # Retorna o estado do sensor
        if estado_sensor == GPIO.LOW:
            return "Estado do sensor: Objeto detectado."
        else:
            return "Estado do sensor: Nenhum objeto detectado."
    
    def distancia(self):
        """
        Retorna informações sobre o sensor de distância.
        Esta é a função principal solicitada na importação.
        
        Returns:
            dict: Dicionário com informações sobre o sensor
        """
        valor = self.obter_valor_sensor()
        detectado = self.objeto_detectado()
        estado = self.monitorar_sensor()
        
        return {
            "valor_bruto": valor,
            "objeto_detectado": detectado,
            "estado": estado,
            "timestamp": time.time()
        }
    
    def limpar(self):
        """Limpa as configurações de GPIO."""
        GPIO.cleanup()

# Cria uma instância global do sensor para facilitar o uso
sensor = SensorDistancia()

# Funções a nível de módulo para uso direto
def verificar_sensor():
    return sensor.verificar_sensor()

def obter_valor_sensor():
    return sensor.obter_valor_sensor()

def objeto_detectado():
    return sensor.objeto_detectado()

def monitorar_sensor():
    return sensor.monitorar_sensor()

def distancia():
    return sensor.distancia()

def limpar():
    sensor.limpar()

# Se este arquivo for executado diretamente
if __name__ == "__main__":
    try:
        print("Pressione CTRL+C para sair")
        while True:
            print("1. Função que monitora o sensor")
            print(verificar_sensor())
            time.sleep(1)
            
            print("2. Função que monitora o sensor")
            print(monitorar_sensor())
            time.sleep(1)
            
            print("3. Função que retorna o valor do sensor")
            valor_sensor = obter_valor_sensor()
            print(f"Valor bruto do sensor: {valor_sensor}")
            time.sleep(1)
            
            print("4. Função que retorna se o objeto foi detectado")
            detectado = objeto_detectado()
            print(f"Objeto detectado? {'Sim' if detectado else 'Não'}")
            time.sleep(1)
            
            print("5. Informações completas de distância")
            info = distancia()
            print(info)
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("Programa encerrado pelo usuário")
    finally:
        limpar()