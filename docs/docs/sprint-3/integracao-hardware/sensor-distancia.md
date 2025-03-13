---
sidebar_position: 1
custom_edit_url: null
---

# Sensor de Distância

##### Desenvolvimento e Integração do Sensor TCRT5000 no Projeto

&emsp;A implementação do sensor de distância TCRT5000 no nosso projeto foi um passo essencial para garantir a detecção precisa de objetos a até 25mm de distância. Como esse sensor opera com leitura de reflexão de luz infravermelha, sua precisão e tempo de resposta foram pontos críticos a serem validados. Para integrar essa funcionalidade ao nosso sistema principal, utilizamos um Arduino como intermediário, comunicando-se com o Raspberry Pi via RX/TX. Essa decisão foi tomada para garantir uma comunicação confiável e minimizar o impacto no processamento do Raspberry, além de facilitar a manipulação do sensor, já que o Arduino oferece maior flexibilidade para o tratamento direto de sinais digitais em tempo real.

## **Motivo para o Uso do Arduino**
&emsp;A escolha de um Arduino para processar os dados do TCRT5000 foi baseada em alguns fatores essenciais:
1. **Baixa Latência na Leitura do Sensor** – O Arduino permite leituras mais rápidas e consistentes do sensor, sem depender do sistema operacional do Raspberry Pi, que pode ter variações de tempo devido ao uso multitarefa.
2. **Facilidade na Manipulação de Sinais Digitais** – Como o TCRT5000 opera com um simples HIGH (1) ou LOW (0), o Arduino pode lidar com esses sinais diretamente e processá-los antes de enviá-los ao Raspberry Pi.
3. **Estabilidade da Comunicação Serial** – A transmissão dos dados do sensor para o código principal, escrito em **Python**, foi realizada através da comunicação RX/TX entre o Arduino e o Raspberry Pi, garantindo uma transmissão eficiente e de baixa latência.
4. **Facilidade de Expansão** – Com o Arduino intermediando a leitura do sensor, futuras expansões podem ser implementadas sem sobrecarregar o Raspberry Pi.

## **Testes e Depuração de Erros**
&emsp;Durante o processo de desenvolvimento, realizamos testes intensivos para validar a precisão e confiabilidade do sensor. Algumas das principais dificuldades encontradas e as soluções aplicadas foram:

1. **Oscilações nas Leituras** – Inicialmente, o sensor apresentou leituras intermitentes devido a variações na superfície dos objetos testados. Ajustamos a posição e ângulo do sensor para melhorar a consistência.
2. **Interferência na Comunicação Serial** – O envio contínuo de dados pelo Serial.print() gerava ruído na comunicação com o Raspberry Pi. Para resolver isso, otimizamos a taxa de atualização e implementamos um delay adequado.
3. **Calibração da Sensibilidade** – Durante os testes, percebemos que objetos de cores escuras não eram detectados corretamente. Isso ocorre porque superfícies escuras absorvem mais luz infravermelha, reduzindo a reflexão. Para mitigar esse problema, realizamos testes com diferentes materiais e ajustamos a posição do sensor.

## **Conclusão**
&emsp;A integração do TCRT5000 utilizando um Arduino como intermediário proporcionou uma solução robusta e eficiente para a detecção de objetos no projeto. O uso do Monitor Serial, aliado a um LED como indicador visual, permitiu depurar erros e ajustar parâmetros de forma prática. Além disso, a comunicação via RX/TX com o Raspberry Pi garantiu que os dados do sensor fossem utilizados de maneira eficiente no código principal, desenvolvido em Python. Com os testes validados e o sistema operando de forma estável, o próximo passo será integrar esses sensores de forma definitiva ao processo de automação do nosso projeto.

