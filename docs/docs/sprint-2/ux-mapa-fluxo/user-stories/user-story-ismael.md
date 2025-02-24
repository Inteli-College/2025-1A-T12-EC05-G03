---
sidebar_position: 1
custom_edit_url: null
---

# User Stories - Ismael Gonçalves

##### User Stories do Farmaceutico chefe Ismael Gonçalves

&nbsp;&nbsp;&nbsp;&nbsp;Utilizamos as User Stories no desenvolvimento do projeto para entender as necessidades dos usuários em requisitos que são claros e práticos. Entendendo essas necessidades coseguimos garantir que as funcionalidades do nosso sistema estejam de acordo com as atividades que o cliente precisa realizar. No contexto do farmacêutico chefe Ismael Gonçalves, essas histórias foram estruturadas para representar as principais interações que ele realiza, desde a gestão de prescrições até o controle de medicamentos sensíveis.

&nbsp;&nbsp;&nbsp;&nbsp;Assim, apresentamos as User Stories que orientam o desenvolvimento das funcionalidades do sistema, garantindo que a automação hospitalar atenda às necessidades reais do farmacêutico chefe, otimizando os processos de separação, revisão e controle de estoque:

### **Cadastro no sistema**  
Identificação | 01  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe
User Story | "Como farmacêutico chefe, quero me cadastrar na plataforma para ter acesso às funcionalidades de gestão de prescrições, controle de estoque e revisão de separações."  
Critério de aceite 1 | CR1: Ismael deve poder acessar uma página de cadastro e preencher suas informações (nome, e-mail, cargo, senha).  
Critério de aceite 2 | CR2: Após o cadastro, ele deve receber uma confirmação via e-mail e conseguir fazer login para acessar a plataforma.  

---

### **Login no sistema**  
Identificação | 02  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero fazer login na plataforma de maneira rápida e segura para começar a revisar as prescrições e organizar o estoque sem atrasos."  
Critério de aceite 1 | CR1: Ismael deve poder inserir suas credenciais (e-mail e senha) e acessar o sistema.  
Critério de aceite 2 | CR2: Caso insira a senha errada, o sistema deve exibir uma mensagem de erro e permitir recuperação de senha via e-mail.

---

### **Aprovar prescrição**  
Identificação | 03 
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero visualizar e revisar prescrições médicas para aprovar os pedidos de medicamentos, garantindo que tudo esteja correto antes da separação."  
Critério de aceite 1 | CR1: Ismael deve poder acessar a aba de prescrições e visualizar a lista de pedidos pendentes. 
Critério de aceite 2 | CR2:  O sistema deve exibir detalhes como nome do paciente, medicamentos solicitados, dosagem e médico responsável.
Critério de aceite 3 | CR3:  Ele deve poder aprovar a prescrição.

---

### **Reprovar prescrição**  
Identificação | 04  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero visualizar e revisar prescrições médicas para reprovar os pedidos de medicamentos que não estão corretos."
Critério de aceite 1 | CR1: Ismael deve poder acessar a aba de prescrições e visualizar a lista de pedidos pendentes.  
Critério de aceite 2 | CR2: O sistema deve exibir detalhes como nome do paciente, medicamentos solicitados, dosagem e médico responsável.
Critério de aceite 3 | CR3: Ele deve poder reprovar a prescrição, com a opção de adicionar uma justificativa.


---

### **Aprovar prescrição em partes**  
Identificação | 05  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero visualizar e revisar prescrições médicas para aprovar somente algumas partes do pedido de medicamentos, reprovando a parte que está inválida ou incorreta."  
Critério de aceite 1 | CR1: Ismael deve poder acessar a aba de prescrições e visualizar a lista de pedidos pendentes.  
Critério de aceite 2 | CR2: O sistema deve exibir detalhes como nome do paciente, medicamentos solicitados, dosagem e médico responsável.
Critério de aceite 3 | CR3: Ele deve poder aprovar somente uma parte da prescrição, com a opção de adicionar uma justificativa para a parte reprovada.

---

### **Visualizar histórico de prescrições**  
Identificação | 06  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero acessar o histórico de prescrições processadas para verificar as prescrições que foram aprovadas, reprovadas, corrigidas manualmente, e quem realizou a revisão da prescrição."  
Critério de aceite 1 | CR1: Ismael deve poder acessar uma aba de histórico e visualizar todas as prescrições processadas.  
Critério de aceite 2 | CR2:  O sistema deve permitir a filtragem por status (aprovada, reprovada, corrigida, pendente).
Critério de aceite 3 | CR3: O histórico deve incluir data, horário, responsável pela ação e detalhes da prescrição.

---


### **Visualizar histórico de medicamentos**  
Identificação | 07  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, preciso visualizar rapidamente o estoque de medicamentos para acompanhar a disponibilidade e planejar a reposição."  
Critério de aceite 1 | CR1: Ismael deve poder acessar a aba de estoque e visualizar uma lista de medicamentos com informações de quantidade, lote e validade. 
Critério de aceite 2 | CR2: O sistema deve exibir alertas para medicamentos próximos ao vencimento ou com baixa quantidade.

---


### **Cadastrar novo medicamento no estoque**  
Identificação | 08  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero cadastrar e atualizar os lotes de medicamentos para manter as informações do estoque sempre corretas."  
Critério de aceite 1 | CR1: Ismael deve poder adicionar novos lotes informando nome, quantidade, fornecedor e data de validade.  
Critério de aceite 2 | CR2: O sistema deve exigir confirmação antes de salvar alterações nos lotes.
Critério de aceite 3 | CR3: Medicamentos vencidos devem ser automaticamente bloqueados para separação, com um aviso no sistema.
---


### **Remover medicamentos do histórico**  
Identificação | 09  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero remover medicamentos não disponíveis para manter as informações do estoque sempre corretas"  
Critério de aceite 1 | CR1: Ismael deve poder acessar todos os medicamentos registrados no estoque. 
Critério de aceite 2 | CR2: Ismael deve poder excluir um medicamento dos registros com autenticação para salvar informação.

---


### **Revisar e corrigir as separações da fita de medicamentos**  
Identificação | 10  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero revisar e corrigir separações de medicamentos para evitar que pedidos com erros sejam enviados aos pacientes."  
Critério de aceite 1 | CR1:  Ismael deve poder acessar uma lista de separações pendentes de revisão.  
Critério de aceite 2 | CR2: O sistema deve exibir os medicamentos separados, quantidade, lote e data de validade.
Critério de aceite 3 | CR3: Ele deve poder aprovar a separação ou corrigi-la manualmente, justificando a alteração.

---

### **Receber notificações sobre novas prescrições**  
Identificação | 11  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero receber notificações sobre prescrições pendentes e novos registros de prescrições para avaliação."  
Critério de aceite 1 | CR1: O sistema deve exibir notificações no painel inicial assim que Ismael fizer login.
Critério de aceite 2 | CR2: Ele deve ser alertado sobre novas prescrições e prescrições pendentes de avaliação.

---

### **Receber notificação sobre medicamento em falta no estoque**  
Identificação | 12  
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero receber notificações sobre medicamentos em baixa quantidade no estoque e medicamentos perto da data de vencimento."  
Critério de aceite 1 | CR1: O sistema deve exibir notificações no painel inicial assim que Ismael fizer login.  
Critério de aceite 2 | CR2: Ele deve ser alertado sobre medicamentos vencidos ou com estoque crítico.


---

### **Registrar e auditar contagens de psicotrópicos**  
Identificação | 13 
--- | ---  
Persona | Ismael Gonçalves – Farmacêutico Chefe 
User Story | "Como farmacêutico chefe, quero registrar a contagem diária de psicotrópicos para garantir o controle rígido desses medicamentos."  
Critério de aceite 1 | CR1: Ismael deve poder registrar a contagem diária de medicamentos controlados.  
Critério de aceite 2 | CR2: Se houver divergência entre a contagem física e o sistema, deve ser gerado um alerta.
Critério de aceite 3 | CR3:  Ajustes no estoque de psicotrópicos devem exigir autenticação extra para segurança.

---

&nbsp;&nbsp;&nbsp;&nbsp;As User Stories do farmacêutico chefe Ismael Gonçalves são importantes para que a plataforma atenda às demandas complexas do ambiente de separação da fita de medicamentos. Ao traduzir as atividades diárias em funcionalidades claras e bem definidas, garantimos que o sistema contribuirá diretamente para a segurança, organização e agilidade no atendimento aos pacientes. 

