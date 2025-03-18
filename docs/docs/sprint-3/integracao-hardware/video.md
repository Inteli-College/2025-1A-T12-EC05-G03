---
sidebar_position: 4
custom_edit_url: null
---

# Funcionamento do Robô com Novos Periféricos

##### Demonstração do robô com os periféricos 

### Funcionamento do Robô com Sensor de Distância e Leitor de QR Code

&emsp;Para garantir maior segurança e precisão na separação dos medicamentos, desenvolvemos um robô automatizado que integra tanto o **sensor de distância TCRT5000** quanto o **leitor de QR Code MH-ET**. O robô realiza sua operação em etapas bem definidas, alinhadas ao fluxo de montagem da “Fita de Medicamentos”.

&emsp;O processo começa com o **robô se movendo até a posição de coleta**. O **leitor de QR Code MH-ET** realiza a leitura do código do medicamento no bin, verificando se ele corresponde à prescrição. Caso a leitura seja válida, o robô **suga o medicamento**, sobe para a posição inicial e, **antes de continuar o movimento**, verifica novamente o **sensor de distância TCRT5000** para garantir que o medicamento foi coletado corretamente.

&emsp;Após essa verificação, o robô move-se até a **fita de medicamentos**. **Antes de descer para realizar a entrega**, o sensor de distância é consultado novamente para garantir que o medicamento ainda está no bin correto. Se o sensor confirmar a presença do medicamento, o robô realiza o movimento de descida no eixo Z para entregar o item. Caso contrário, ele retorna à posição inicial e tenta novamente o processo de coleta e verificação.

## Testes de Erro e Tratamento de Falhas

&emsp;Durante a implementação, realizamos diversos **testes de erro** para garantir que o robô pudesse lidar com falhas sem interromper todo o processo de separação. Esses testes foram realizados para simular cenários como **falta de correspondência no QR Code**, **ausência de medicamento no bin** e **erros de leitura do sensor**.

1. **Falha na Leitura do QR Code**: Caso o QR Code não corresponda à prescrição ou não seja lido corretamente, o robô **tenta a verificação novamente**. Se o erro persistir, o robô **pula o medicamento**, registra o incidente no **log** e continua com o processo de separação dos outros medicamentos, evitando que o fluxo seja interrompido.
   
2. **Erro na Detecção do Medicamento pelo Sensor de Distância**: Quando o robô **não consegue detectar o medicamento no bin**, ele **tenta a leitura novamente**. Se o erro continuar, o robô **pula a coleta do medicamento** e o erro é registrado no **log** para monitoramento e ajustes futuros.

3. **Falha na Verificação Pós-Coleta**: Após a coleta do medicamento, o robô realiza uma nova verificação com o **sensor de distância TCRT5000** para garantir que o medicamento foi realmente retirado do bin. Se o sensor não detectar o objeto, o robô tenta a coleta novamente. Se o erro persistir, ele **pula o medicamento e registra o erro no log**.

&emsp;Esses testes garantem que o robô não continue o processo sem confirmação de que cada etapa foi realizada corretamente, proporcionando maior segurança e eficiência na separação dos medicamentos. O log de erros também facilita o diagnóstico de problemas e permite ajustes contínuos no sistema, melhorando sua performance ao longo do tempo.

&emsp;Desse modo, no vídeo abaixo, é possível observar o funcionamento integrado do robô, evidenciando como o sensor de distância e o leitor de QR Code garantem um processo seguro e eficiente.












