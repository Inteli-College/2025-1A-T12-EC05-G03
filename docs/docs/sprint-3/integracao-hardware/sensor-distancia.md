---
sidebar_position: 1
custom_edit_url: null
---

# Sensor de Distância

##### Desenvolvimento e Integração do Sensor TCRT5000 no Projeto

&emsp;A implementação do sensor de distância TCRT5000 no nosso projeto foi um passo essencial para garantir a detecção precisa de objetos a até 25mm de distância. Como esse sensor opera com leitura de reflexão de luz infravermelha, sua precisão e tempo de resposta foram pontos críticos a serem validados. Para integrar essa funcionalidade ao nosso sistema principal, utilizamos um Arduino como intermediário, comunicando-se com o Raspberry Pi via RX/TX. Essa decisão foi tomada para garantir uma comunicação confiável e minimizar o impacto no processamento do Raspberry, além de facilitar a manipulação do sensor, já que o Arduino oferece maior flexibilidade para o tratamento direto de sinais digitais em tempo real.
