---
sidebar_position: 1
custom_edit_url: null
---

# Documentação da Esquemática dos Periféricos

##### Esquemático dos Periféricos

## Introdução
Este documento descreve a conexão e funcionalidade dos periféricos utilizados no projeto, incluindo um **Arduino Nano**, um **sensor TCRT5000** e um **scanner MH-ET LIVE**. O objetivo é detalhar as conexões e os papéis de cada componente na implementação do sistema.

---
## Imagem da esquematica

<p style={{textAlign: 'center'}}>Figura X - Esquematico dos periféricos</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/fisico/esquematica.png").default} style={{width: 800}} alt="Diagrama de blocos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Componentes Utilizados

### 1. **Arduino Nano**
- Conectado no microcontralor do sistema com um cabo **USB**.
- Alimenta com **5V** e **3V3** (Ultilizamos apenas a de 5V).
- Possui **14 pinos digitais** e **8 pinos analógicos**.

### 2. **Sensor TCRT5000 (Sensor Óptico Reflexivo)**
- Utilizado para **detecção de objetos próximos ou leitura de superfícies**.
- Possui um **emissor infravermelho** e um **fototransistor**.
- Necessita de **resistores** de 330 Ohms e 10 kOhms para correta leitura dos sinais.

### 3. **Scanner MH-ET LIVE**
- Scanner de código de barras e QR Code.
- Comunicação via **TX/RX** com o Arduino.
- Alimentação de 5v.

---

## Conexões do Circuito

### **1. Conexões do Arduino Nano**
- **Alimentação:**
  - **5V** do Arduino → **VCC/VDD** do Scanner e do Sensor.
  - **GND** do Arduino → **GND** do Scanner e do Sensor.
- **Comunicação Serial (Scanner MH-ET LIVE):**
  - **TX (Scanner)** → **D3 (Arduino)**
  - **RX (Scanner)** → **D2 (Arduino)**
- **Sensor TCRT5000:**
  - **VCC do Sensor** → **5V do Arduino**
  - **GND do Sensor** → **GND do Arduino**
  - **Saída do Sensor** → **Pino D8 do Arduino** (entrada de leitura)
  
### **2. Componentes adicionais**
- **Resistores** (um de 330 Ohms e um de 10 kOhms) conectados ao sensor TCRT5000.
- **Fios de conexão** garantindo a comunicação entre os periféricos.

### **2. Componentes adicionais para finalização**
- **Espaguete Termo-retrátil** para acabamento e durabilidade.
- **Cabo de rede** garantindo a comunicação entre os periféricos com um corpo mais forte e durável. 


---

## Funcionamento Geral
1. O **Arduino Nano** recebe os sinais do **sensor TCRT5000**, identificando se há um objeto próximo.
2. O **scanner MH-ET LIVE** realiza a leitura de códigos e envia os dados para o Arduino.
3. O Arduino processa as informações e passa tudo para o Raspberry Pi por por um cabo USB.

---

## Considerações Finais
Este documento descreveu as conexões e funcionamento dos principais periféricos do sistema. A correta ligação dos componentes garante um funcionamento confiável do circuito.