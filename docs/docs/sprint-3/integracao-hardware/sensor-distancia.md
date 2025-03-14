---
sidebar_position: 1
custom_edit_url: null
---

# Sensor de Distância

<p style={{textAlign: 'center'}}>Imagem scanner de Qr codes MH-ET Live</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/componentes/sensor.png").default} style={{width: 800}} alt="Imagem informativa de Clara e suas informações dispostas nas colunas." />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: https://www.digikey.com.br/pt/products/detail/vishay-semiconductor-opto-division/TCRT5000/1681167 (2025). </p>


##### Desenvolvimento e Integração do Sensor TCRT5000 no Projeto

&emsp;A implementação do sensor de distância TCRT5000 no nosso projeto foi um passo essencial para garantir a detecção precisa de objetos a até 25mm de distância. Como esse sensor opera com leitura de reflexão de luz infravermelha, sua precisão e tempo de resposta foram pontos críticos a serem validados. Para integrar essa funcionalidade ao nosso sistema principal, utilizamos um Arduino como intermediário, comunicando-se com o Raspberry Pi via USB. Essa decisão foi tomada para garantir uma comunicação confiável e minimizar o impacto no processamento do Raspberry, além de facilitar a manipulação do sensor, já que o Arduino oferece maior flexibilidade para o tratamento direto de sinais digitais em tempo real.

## **Motivo para o Uso do Arduino**
&emsp;A escolha de um Arduino para processar os dados do TCRT5000 foi baseada em alguns fatores essenciais:
1. **Baixa Latência na Leitura do Sensor** – O Arduino permite leituras mais rápidas e consistentes do sensor, sem depender do sistema operacional do Raspberry Pi, que pode ter variações de tempo devido ao uso multitarefa.
2. **Facilidade na Manipulação de Sinais Digitais** – Como o TCRT5000 opera com um simples HIGH (1) ou LOW (0), o Arduino pode lidar com esses sinais diretamente e processá-los antes de enviá-los ao Raspberry Pi.
3. **Estabilidade da Comunicação Serial** – A transmissão dos dados do sensor para o código principal, escrito em **Python**, foi realizada através da comunicação RX/TX entre o Arduino e o Raspberry Pi, garantindo uma transmissão eficiente e de baixa latência.
4. **Facilidade de Expansão** – Com o Arduino intermediando a leitura do sensor, futuras expansões podem ser implementadas sem sobrecarregar o Raspberry Pi.

## **Desenvolvimento das Funcionalidades**
&emsp;Para garantir que o sensor funcionasse de forma eficiente, implementamos diferentes funções em C++ no Arduino para modularizar e otimizar sua operação:

### **1️⃣ Função `verificarSensor()`**
&emsp;Essa função lê diretamente o estado do sensor e exibe o resultado no Monitor Serial. Se um objeto for detectado (LOW), ele imprime a mensagem correspondente, permitindo que os dados sejam acompanhados em tempo real.
```cpp
void verificarSensor() {
  sensorValue = digitalRead(sensorPin);
  if (sensorValue == LOW) {
    Serial.print("Objeto detectado! Valor: ");
    Serial.println(sensorValue);
  } else {
    Serial.print("Nenhum objeto detectado. Valor: ");
    Serial.println(sensorValue);
  }
}
```

### **2️⃣ Função `obterValorSensor()`**
&emsp;Criamos essa função para retornar o valor digital bruto do sensor, permitindo que outras partes do sistema usem esse dado para validações.
```cpp
int obterValorSensor() {
  int valor = digitalRead(sensorPin);
  Serial.print("Função obterValorSensor() retornou: ");
  Serial.println(valor);
  return valor;
}
```

### **3️⃣ Função `objetoDetectado()`**
&emsp;Essa função retorna um valor booleano (true ou false), indicando se um objeto foi detectado. Essa lógica simplificada permite que o código principal do Raspberry Pi processe os dados de maneira mais intuitiva.
```cpp
bool objetoDetectado() {
  int valor = digitalRead(sensorPin);
  Serial.print("Função objetoDetectado() retornou: ");
  Serial.println(valor == LOW ? "true (Objeto detectado)" : "false (Nenhum objeto)");
  return valor == LOW;
}
```

### **4️⃣ Função `monitorarSensor()`**
&emsp;Essa função mantém a leitura contínua do sensor e envia o estado do objeto via comunicação serial, garantindo que o Raspberry Pi sempre receba os dados atualizados.
```cpp
void monitorarSensor() {
  int estadoSensor = digitalRead(sensorPin);
  Serial.print("Estado do sensor: ");
  if (estadoSensor == LOW) {
    Serial.println("Objeto detectado.");
  } else {
    Serial.println("Nenhum objeto detectado.");
  }
}
```

## **Testes e Depuração de Erros**
&emsp;Durante o processo de desenvolvimento, realizamos testes intensivos para validar a precisão e confiabilidade do sensor. Algumas das principais dificuldades encontradas e as soluções aplicadas foram:

1. **Oscilações nas Leituras** – Inicialmente, o sensor apresentou leituras intermitentes devido a variações na superfície dos objetos testados. Ajustamos a posição e ângulo do sensor para melhorar a consistência.
2. **Interferência na Comunicação Serial** – O envio contínuo de dados pelo Serial.print() gerava ruído na comunicação com o Raspberry Pi. Para resolver isso, otimizamos a taxa de atualização e implementamos um delay adequado.
3. **Calibração da Sensibilidade** – Durante os testes, percebemos que objetos de cores escuras não eram detectados corretamente. Isso ocorre porque superfícies escuras absorvem mais luz infravermelha, reduzindo a reflexão. Para mitigar esse problema, realizamos testes com diferentes materiais e ajustamos a posição do sensor.

## **Testes com LED como Indicador Visual**
&emsp;Para facilitar a validação prática, implementamos um LED no circuito de testes, que acendia automaticamente quando um objeto era detectado. Esse indicador foi extremamente útil para testes rápidos, permitindo verificar o funcionamento do sensor sem a necessidade de monitoramento constante do Serial Monitor.

&emsp;O código para essa funcionalidade foi simples:
```cpp
const int ledPin = 13;  // LED no pino 13

void setup() {
  pinMode(sensorPin, INPUT);
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = digitalRead(sensorPin);
  if (sensorValue == LOW) {
    digitalWrite(ledPin, HIGH);  // Acende o LED
    Serial.println("Objeto detectado!");
  } else {
    digitalWrite(ledPin, LOW);   // Apaga o LED
    Serial.println("Nenhum objeto detectado.");
  }
  delay(500);
}
```
&emsp;Com essa abordagem, conseguimos validar rapidamente o funcionamento do sensor sem depender do Monitor Serial, tornando os testes mais práticos.

## **Conclusão**
&emsp;A integração do TCRT5000 utilizando um Arduino como intermediário proporcionou uma solução robusta e eficiente para a detecção de objetos no projeto. O uso do Monitor Serial, aliado a um LED como indicador visual, permitiu depurar erros e ajustar parâmetros de forma prática. Além disso, a comunicação via RX/TX com o Raspberry Pi garantiu que os dados do sensor fossem utilizados de maneira eficiente no código principal, desenvolvido em Python. Com os testes validados e o sistema operando de forma estável, o próximo passo será integrar esses sensores de forma definitiva ao processo de automação do nosso projeto.

