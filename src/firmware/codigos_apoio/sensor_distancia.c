// Defina os pinos do sensor
const int sensorPin = 8;  // Sensor no pino digital 8
int sensorValue = 0;  // Variável para armazenar o valor lido do sensor

// Função para inicializar o sensor
void setup() {
  // Inicializa o pino do sensor como entrada
  pinMode(sensorPin, INPUT);
  
  // Inicializa a comunicação serial para monitoramento
  Serial.begin(9600);

  // Aguarda um tempo para a comunicação estabilizar
  delay(1000);
  Serial.println("Inicialização completa. Sistema pronto.");
}

// Função para o loop principal do código
void loop() {
  
  // Chama a função que verifica o sensor
  Serial.print("1. Função que monitora o sensor");
  verificarSensor();
  delay(5000);

  // Chama a função que monitora o sensor
  Serial.print("2. Função que monitora o sensor");
  monitorarSensor();
  delay(5000);

}

// Função 1: Verificar o estado do sensor e imprimir o resultado
void verificarSensor() {
  // Lê o valor do sensor (0 ou 1)
  sensorValue = digitalRead(sensorPin);
  
  // Se o sensor retornar 0 (objeto detectado)
  if (sensorValue == LOW) {
    Serial.print("Objeto detectado! Valor: ");
    Serial.println(sensorValue);  // Imprime o valor 0 (detecção)
  } else {
    Serial.print("Nenhum objeto detectado. Valor: ");
    Serial.println(sensorValue);  // Imprime o valor 1 (sem detecção)
  }
}

// Função 2: Retorna o valor bruto do sensor (0 ou 1)
int obterValorSensor() {
  // Lê o valor do sensor
  int valor = digitalRead(sensorPin);
  
  // Adicionando um Serial.print() para debug
  Serial.print("Função obterValorSensor() retornou: ");
  Serial.println(valor);
  
  return valor;
}