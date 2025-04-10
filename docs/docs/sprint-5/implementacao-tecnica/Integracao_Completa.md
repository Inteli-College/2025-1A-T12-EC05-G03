---
sidebar_position: 1
custom_edit_url: null
---

# Integração Completa

## Integração dos Componentes do Sistema

&emsp;O nosso MVP final é composto por uma solução de automação para a separação de medicamentos, desenvolvida para a farmácia hospitalar do Hospital de Clínicas da Unicamp. Abaixo, detalhamos como todos os componentes foram conectados, o fluxo do nosso sitema e como o sistema é testado.

### Arquitetura Geral

&emsp;O sistema integra os seguintes componentes:

- **Robô Dobot**: Responsável pela movimentação física e separação dos medicamentos.
- **Raspberry Pi 5 (8GB RAM)**: Atua como central de controle e comunicação entre os sistemas.
- **Arduino Uno**: Gerencia os periféricos (sensor de distância e leitor de QR Code).
- **Sensor de Distância**: Garante que o medicamento foi corretamente agarrado e transportado.
- **Leitor de QR Code**: Valida a identidade dos medicamentos nos slots de armazenamento.
- **Back-end (Flask)**: Implementado em Python, gerencia lógica de negócio e comunicação via APIs.
- **Banco de Dados (PostgreSQL)**: Armazena todos os dados utilizados no sistema
- **Front-end (HTML, CSS, JS puro)**: Interface gráfica para visualização e aprovação de prescrições, controle de estoque e acesso ao histórico de prescrições.

### Integração Técnica

- O **Arduino Uno** é conectado via **serial** ao **Raspberry Pi 5**, que interpreta os dados dos sensores e do leitor de QR Code, transformando-os em comandos e validações úteis para o controle do robô.
- O **Dobot** é controlado diretamente pelo Raspberry Pi, que executa os movimentos e verificações de acordo com as requisições recebidas do back-end via chamadas de API.
- O **front-end**, desenvolvido em **HTML, CSS e JavaScript puro**, se comunica diretamente com o **back-end (Flask)** por meio de chamadas javascript, permitindo a visualização das prescrições e interação do usuário com o sistema.
- A comunicação entre o **back-end e o banco de dados PostgreSQL** é feita por meio do **SQLAlchemy**, um ORM (Object-Relational Mapper) em Python, que facilita as operações no banco de dados.

### Fluxo de uma Prescrição

1. A **prescrição é enviada para o sistema** via API, integrada ao sistema do Hospital de Clínicas da Unicamp (HC).

2. A prescrição aparece na interface do **front-end**, onde o **farmacêutico pode avaliá-la**, optando por aprovar totalmente, aprovar parcialmente ou reproavar a prescrição.  
   - Assim que aprovada, a prescrição **se transforma em um pedido** e **entra na fila de separação do robô**.
   - Nesse momento, também ocorre uma **validação automática de estoque**, garantindo que todos os medicamentos aprovados estejam disponíveis.

3. O robô **consulta periodicamente uma rota da API** que retorna o próximo pedido da fila (seguindo a lógica FIFO).  
   - Quando um pedido é selecionado, seu **status é atualizado de “aguardando separação” para “em separação”**.

4. O processo de separação é iniciado pelo robô, que executa os seguintes passos para **cada medicamento** do pedido:
   - Desloca-se até o **slot onde o medicamento está armazenado**.
   - Lê o **QR Code** do medicamento e envia uma requisição à API para **validar se o código lido corresponde ao medicamento esperado**.
     - Se a validação falhar, o medicamento **não é retirado do estoque** e um **log da tentativa é enviado**.
   - Se o QR Code for validado com sucesso, o robô **agarra o medicamento com o sugador** e utiliza o **sensor de distância** para verificar se o agarre foi bem-sucedido, enviando também um log dessa etapa.
   - Em seguida, o robô **transporta o medicamento até a fita de separação**, valida novamente, via sensor, se ele ainda está preso ao sugador antes de soltar o medicamento, e **registra o log da operação**.

5. Após concluir a separação de todos os medicamentos do pedido, o robô:
   - **Atualiza o status do pedido para “em revisão”**.
   - **Inicia a separação do próximo pedido da fila**.

6. Com o status "em revisão", o **farmacêutico acessa o pedido no front-end** para revisar se a fita foi montada corretamente.  
   - Após a revisão, o pedido pode ser **finalizado como "concluído com sucesso" ou "concluído com erro"**, sendo então inserido no histórico do sistema.

Ademais, segue o link de um [vídeo de demonstração do robô separando um pedido](https://drive.google.com/file/d/1IHO-P5_FbC3rfQVECcTFLMk20KfCZ6js/view?usp=sharing).


### Testando o Sistema

&emsp;Para testar o sistema, o usuário deve:

1. **Ligar o robô** e verificar se todas as conexões físicas (com o Raspberry Pi, Arduino e sensores) estão corretamente estabelecidas.
2. Garantir que **existam prescrições pendentes de avaliação** no sistema. Caso não haja, o usuário pode inserir novas prescrições por meio da API, utilizando a rota `/prescricoes/cadastrar`.  
   - Para mais detalhes sobre essa e outras rotas, consulte a [**documentação completa da API**](./Atualizacao_Rotas.md).

3. Com prescrições cadastradas, o usuário deve:
   - Acessar a **interface web** do sistema.
        - [Link do sistema](https://two025-1a-t12-ec05-g03.onrender.com)
   - **Realizar o login**.
   - **Avaliar as prescrições** disponíveis na página principal, aprovando total ou parcialmente a prescrição.

4. Após a aprovação, o pedido será inserido na **fila do robô**, e o processo de separação será iniciado automaticamente.  
   - O usuário deve então **acompanhar a execução do robô** e **verificar se o pedido foi separado corretamente**, conforme os logs e o resultado físico na fita.

&emsp;Além da separação de pedidos, o sistema também oferece funcionalidades de **controle de estoque**. É possível:

- **Visualizar os medicamentos disponíveis**.
- **Cadastrar novos medicamentos**.
- **Adicionar lotes aos medicamentos existentes**.
- **Visualizar lotes que estão com baixa quantidade ou estão perto da sua validade**;
- **Deletar lotes vencidos ou fora de uso**.

&emsp;Esses recursos estão disponíveis tanto via interface quanto por chamadas à API.

### Conclusão
&emsp;O sistema desenvolvido cumpre o objetivo de automatizar a separação de medicamentos na farmácia do Hospital de Clínicas da Unicamp. A integração entre as partes, desde o robô até o banco de dados, foi feita de forma que todas as etapas funcionem juntas, permitindo que farmacêuticos possam acompanhar e revisar o processo com clareza.

&emsp;Além da automação da separação, o sistema oferece ferramentas úteis de controle de estoque e registro de operações. O uso de APIs e uma interface simples facilita a inserção e avaliação das prescrições.

&emsp;No fim, o projeto entrega um MVP de um sistema funcional que automatize a separação de medicamentos de um protocolo pré-definido, com validação por sensores e montagem de kits básicos para a UTI, apresentando rastreamento dos medicamentos e relatório de atividades, assim, garantindo mais organização no dia a dia da farmácia.