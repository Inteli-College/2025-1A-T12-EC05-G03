---
sidebar_position: 4
custom_edit_url: null
---

# Funcionamento do Robô com Novos Periféricos

##### Demonstração do robô com os periféricos 

&emsp;Para garantir maior segurança e precisão na separação dos medicamentos, desenvolvemos um robô automatizado que integra tanto o **sensor de distância TCRT5000** quanto um **leitor de QR Code MH-ET**. O robô realiza sua operação em etapas bem definidas, alinhadas ao fluxo de montagem da “Fita de Medicamentos”.

&emsp;O **sensor de distância TCRT5000** foi posicionado estrategicamente no braço do robô para detectar a presença de medicamentos nos bins. Sempre que o robô se movimenta até a posição de coleta, o sensor verifica se há um medicamento disponível dentro do raio de leitura (até 25mm). Em seguida, o robô utiliza o **leitor de QR Code MH-ET** para bipar o código do medicamento, enviando a informação via HTTP para validação no sistema principal.

&emsp;**Somente após a validação correta do QR Code e a confirmação da presença do medicamento pelo sensor**, o robô realiza o movimento de descida no eixo Z para coletar o item. Caso o sensor não detecte nenhum objeto ou a leitura do QR Code não corresponda à prescrição, o robô retorna à posição inicial e não avança para o próximo medicamento, evitando erros.





