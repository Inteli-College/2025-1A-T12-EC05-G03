---
sidebar_position: 1
custom_edit_url: null
---

# User Stories - Clara Boia

##### User Stories da técnica em farmácia Clara Boia

&emsp; No desenvolvimento de sistemas, as User Stories desempenham um papel essencial ao traduzirem as necessidades dos usuários em requisitos claros e objetivos. Elas são narrativas curtas que descrevem, do ponto de vista do usuário final, quais ações ele precisa realizar na plataforma e quais benefícios espera obter. Essas histórias facilitam a comunicação entre os times de desenvolvimento, design e produto, garantindo que as funcionalidades atendam de maneira eficaz às demandas reais dos usuários. No contexto deste projeto, as User Stories foram estruturadas para representar as principais interações da técnica em farmácia Clara Boia, detalhando suas atividades diárias, como a gestão do estoque, o acompanhamento de pedidos e a correção de erros operacionais. Abaixo, estão as User Stories que guiam o desenvolvimento das funcionalidades do sistema para atender suas necessidades com precisão e eficiência.

## **Cadastro/Login**  

### **Cadastro na plataforma**  
Identificação | 01  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, quero me cadastrar na plataforma para acessar as funcionalidades que me ajudam na organização do estoque e no acompanhamento dos pedidos de medicamentos."  
Critério de aceite 1 | CR1: Clara deve poder acessar uma página de cadastro e preencher suas informações (nome, e-mail, cargo, senha).  
Critério de aceite 2 | CR2: Após o cadastro, ela deve receber uma confirmação via e-mail e conseguir fazer login para acessar a plataforma.  

---

### **Login no sistema**  
Identificação | 02  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, quero fazer login na plataforma de maneira rápida e segura para começar meu turno sem atrasos."  
Critério de aceite 1 | CR1: Clara deve poder inserir suas credenciais (e-mail e senha) e acessar o sistema.  
Critério de aceite 2 | CR2: Caso insira a senha errada, o sistema deve exibir uma mensagem de erro e permitir recuperação de senha via e-mail.  

## **Gestão de Estoque**  

### **Visualizar estoque de medicamentos**  
Identificação | 03  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, preciso visualizar rapidamente os medicamentos disponíveis no estoque, pois frequentemente preciso conferir se há medicamentos suficientes para as prescrições."  
Critério de aceite 1 | CR1: Clara deve poder acessar a aba de estoque e visualizar uma lista de medicamentos disponíveis.  
Critério de aceite 2 | CR2: A lista deve exibir informações como nome do medicamento, quantidade disponível, lote e validade.  

---

### **Atualizar informações dos medicamentos no estoque**  
Identificação | 04  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, quero atualizar as quantidades dos medicamentos no estoque conforme recebo novos lotes, para manter as informações sempre corretas e evitar problemas de abastecimento."  
Critério de aceite 1 | CR1: Clara deve poder selecionar um medicamento e editar sua quantidade, lote e data de validade.  
Critério de aceite 2 | CR2: O sistema deve exigir confirmação antes de salvar as alterações feitas.  

---

### **Remover medicamentos vencidos ou não disponíveis**  
Identificação | 05  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, preciso remover medicamentos vencidos do sistema para que eles não sejam utilizados acidentalmente."  
Critério de aceite 1 | CR1: Clara deve poder identificar facilmente os medicamentos vencidos na tela de estoque.  
Critério de aceite 2 | CR2: O sistema deve permitir que ela remova medicamentos, exigindo uma justificativa antes da exclusão.  

## **Histórico de Prescrições e Pedidos**  

### **Consultar histórico de prescrições**  
Identificação | 06  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, quero acessar o histórico de prescrições para verificar quais medicamentos foram aprovados e quais foram recusados, garantindo que tudo esteja correto para os pacientes."  
Critério de aceite 1 | CR1: Clara deve poder acessar uma aba de histórico e visualizar todas as prescrições anteriores.  
Critério de aceite 2 | CR2: O sistema deve permitir a filtragem por status (aprovado, reprovado, aprovado parcialmente).  

---

### **Visualizar histórico de pedidos de medicamentos**  
Identificação | 07  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, quero acessar o histórico de pedidos finalizados para verificar se todos os medicamentos foram entregues corretamente."  
Critério de aceite 1 | CR1: Clara deve poder acessar uma aba de histórico e visualizar os pedidos já finalizados.  
Critério de aceite 2 | CR2: O sistema deve exibir detalhes como data, medicamentos incluídos e status final do pedido.   


## **Acompanhamento de Status na Home**  

### **Ver status dos pedidos em tempo real**  
Identificação | 08  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, preciso acompanhar o status dos pedidos em tempo real para saber quais medicamentos estão sendo separados e quais já estão prontos para entrega."  
Critério de aceite 1 | CR1: Clara deve poder visualizar na tela home uma lista de pedidos em andamento com seu status atualizado.  
Critério de aceite 2 | CR2: O sistema deve permitir a filtragem por status como 'Aguardando Separação', 'Em Separação' , 'Em Revisão', 'Finalizado e Enviado' ou 'Finalizado com Erro'.  

---
### **Corrigir ou descartar pedidos finalizados com erro**
Identificação | 09
--- | ---
Persona | Clara Boia - Técnica em Farmácia
User Story | "Como técnica em farmácia, quero corrigir manualmente pedidos finalizados com erro ou descartá-los, garantindo que os pacientes recebam apenas os medicamentos corretos."
Critério de aceite 1 | CR1: Clara deve poder visualizar em 'Finalizado com Erro' uma lista de pedidos que foram finalizados com algum problema, não sendo enviados ao paciente.
Critério de aceite 2 | CR2: O sistema deve permitir que ela edite e corrija os pedidos errados, enviando-os novamente para o paciente.
Critério de aceite 3 | CR3: Caso o erro não possa ser corrigido, Clara deve poder descartar o pedido, justificando a ação.
---

### **Receber notificações sobre medicamentos perto do vencimento**  
Identificação | 10  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, preciso ser notificada quando um medicamento estiver perto de vencer para que eu possa tomar providências antes que falte para os pacientes."  
Critério de aceite 1 | CR1: O sistema deve gerar notificações automáticas quando um medicamento estiver com a validade próxima.  
Critério de aceite 2 | CR2: A notificação deve conter o nome do medicamento, a quantidade restante e a data de vencimento.  

---

### **Receber alertas sobre medicamentos com estoque baixo**  
Identificação | 11  
--- | ---  
Persona | Clara Boia - Técnica em Farmácia  
User Story | "Como técnica em farmácia, preciso ser avisada quando um medicamento estiver com estoque baixo para que eu possa solicitar reposição antes que ele acabe."  
Critério de aceite 1 | CR1: O sistema deve definir um limite mínimo para cada medicamento no estoque.  
Critério de aceite 2 | CR2: Clara deve receber uma notificação quando um medicamento atingir esse limite.  

&emsp; Logo, as User Stories apresentadas servem como um guia fundamental para o desenvolvimento do sistema, garantindo que as funcionalidades implementadas estejam alinhadas com as necessidades reais da técnica em farmácia Clara Boia. Ao traduzir suas demandas diárias em requisitos claros e acionáveis, o projeto se torna mais intuitivo, eficiente e adaptado ao fluxo de trabalho hospitalar. Além disso, essa abordagem facilita a priorização de entregas e a validação contínua da plataforma, assegurando que a automação da Fita de Medicamentos realmente otimize processos, reduza erros e melhore a gestão de estoque. Com isso, o sistema não apenas melhora a eficiência operacional, mas também contribui para a segurança e qualidade no atendimento aos pacientes.

---

## Bibliografia

ZACHARIAS, Isabela Cristina Simões; CUNHA, Lorena Pereira da; COSTA, Janaina Mascarenhas Hornos da. User stories: quem, quando e como deve ser usado?. Anais, 2017.

