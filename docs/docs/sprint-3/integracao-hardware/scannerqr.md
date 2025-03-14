---
sidebar_position: 2
custom_edit_url: null
---

# Scanner de QR Code  

##### Desenvolvimento e Integração do Scanner MH-ET Live no Projeto 

<p style={{textAlign: 'center'}}>Imagem scanner de Qr codes MH-ET Live</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/componentes/scanner.png").default} style={{width: 800}} alt="Imagem informativa de Clara e suas informações dispostas nas colunas." />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: https://www.tinytronics.nl/en/sensors/optical/cameras-and-scanners/mh-et-live-barcode-scanner-v3.0 (2025). </p>
 

&emsp;A implementação do scanner de QR Code MH-ET Live no nosso projeto foi fundamental para a identificação ágil e precisa das medicações. Esse módulo supostamente tem tudo para funcionar, mandando as informações diretamente para o Raspberry Pi, mas enfrentamos problemas com a alimentação do scanner pelo fio que estava ligado diretamente no microcontrolador, que provou não ser suficiente para alimentar o scanner. Para possibilitar a conexão com o robô, utilizamos um Arduino Nano como intermediário, que se comunica com um Raspberry Pi via USB. Essa abordagem assegura uma comunicação eficiente e reduz o impacto no processamento do Raspberry Pi.  

## **Motivo para o Uso do Arduino**  
&emsp;A decisão de utilizar um Arduino como intermediário foi baseada nos seguintes fatores:  
1. **Incapacidade de alimentação** – O Arduino tem capacidade para alimentar o módulo e ainda processar as informações antes de passá-las para o Raspberry Pi.  
2. **Menor valor entre as opções** – De todas as possíveis peças de hardware que poderíamos ter utilizado para resolver o problema, essa era financeiramente a opção mais vantajosa, solucionando o problema com o menor preço.  

## **Desenvolvimento das Funcionalidades**  
&emsp;Para garantir um funcionamento eficiente do scanner, implementamos este código, que recebe as informações obtidas após o scan do QR Code:  

```cpp
#include <SoftwareSerial.h>

SoftwareSerial qrSerial(2, 3);  

void setup() {
    Serial.begin(9600);
    qrSerial.begin(9600);

    Serial.println("Aguardando QR Code...");
}

void loop() {
    String qrText = "";
    unsigned long startTime = millis(); 

    while (millis() - startTime < 1000) {
        if (qrSerial.available()) {
            char c = qrSerial.read();
            qrText += c;
            startTime = millis();  
        }
    }

    qrText.trim();

    if (qrText.length() > 0) {
        Serial.println("✅ QR Code detectado: " + qrText);
    } else {
        Serial.println("❌ Nenhum QR Code detectado no tempo limite.");
    }

    delay(1000);  
}
```  

## **Desafios Enfrentados**  
&emsp;Durante o desenvolvimento, encontramos diversos desafios que dificultaram nosso progresso:  

1. **Problema com o hardware** – Nosso primeiro scanner apresentou um defeito de fábrica. Passamos um dia inteiro tentando fazê-lo funcionar, mas só conseguimos solucionar o problema quando trocamos a peça por uma nova.  
2. **Alimentação do sensor com o Raspberry Pi** – O Raspberry Pi não tinha capacidade de energizar o módulo corretamente.  
3. **Scanner travado** – Em determinado momento, o scanner ficou travado e não conseguia ler nem mesmo os códigos de configuração necessários para seu funcionamento. Felizmente, conseguimos solucionar o problema.  

## **Conclusão**  
&emsp;A integração do scanner MH-ET Live utilizando um Arduino como intermediário foi complicada, mas resultou em um sistema eficiente e confiável para a leitura de QR Codes. A comunicação via USB com o Raspberry Pi garantiu um fluxo de dados contínuo e estável, permitindo que o código principal em Python utilizasse as informações capturadas de forma eficiente. Com os testes validados e o sistema operando conforme esperado, o próximo passo será expandir sua aplicação para automação e identificação digital dentro do projeto, além de possivelmente criar códigos que configurem o leitor automaticamente e não exijam a leitura de QR Codes subsequentes.