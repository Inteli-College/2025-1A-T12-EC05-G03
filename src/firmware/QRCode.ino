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
        Serial.println(qrText);
    } else {
        Serial.println("❌ Nenhum QR Code detectado no tempo limite.");
    }

    delay(1000);  
}
