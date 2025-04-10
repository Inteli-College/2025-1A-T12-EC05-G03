---
sidebar_position: 4
custom_edit_url: null
---

# Próximos passos

#### Próximos Passos

&emsp;Após um ciclo de 10 semanas de desenvolvimento, estruturado em 5 sprints, nosso projeto em parceria com o Hospital de Clínicas da UNICAMP chegou ao fim, e com isso, como grupo, paramos para refletir sobre tudo o que foi entregue até aqui e pensar nos próximos passos para aprimorar ainda mais a solução. <br/>
&emsp;Durante este período, avançamos significativamente no desenvolvimento do MVP, atingindo os principais objetivos definidos inicialmente: criamos um sistema funcional que integra manipuladores robóticos (Dobot), sensores inteligentes e um sistema digital para automatizar a montagem das fitas de medicamentos. Também estruturamos a base para integração com o sistema hospitalar e garantimos o registro detalhado de operações, com foco na rastreabilidade. <br/>
&emsp;Contudo, como todo projeto, há muito a evoluir. Com base nos nossos encontros com o parceiro, feedback da equipe e análise do nosso processo, identificamos melhorias que irão elevar ainda mais a eficiência, a usabilidade e a integração do sistema com o ambiente hospitalar.

&emsp;A seguir, desenvolvemos cada um desses pontos, detalhando o porquê da proposta, o impacto esperado e como cada ação se conecta à visão de futuro da solução.

---

## Melhorias Técnicas

### 1. Detalhamento dos logs do sistema

&emsp;Os logs atuais registram eventos básicos do funcionamento da nossa solução, o que atende bem ao objetivo do nosso sistema atual. Porém, considerando que o sistema do  Hospital é significativamente mais complexo e envolve um volume de dados, funções e interações muito maior, serial ideal que nossos registros sejam ainda mais detalhados e estruturados.

&emsp;A proposta é aprimorar os logs para capturar não apenas as operações principais, mas também informações complementares que facilitem a integração com o ecossistema hospitalar, como:
- Marcações temporais precisas de cada operação.
- Status dos sensores e respostas do sistema a cada comando.
- Tentativas e resultados das leituras de QR Code.
- Intervenções manuais realizadas pelo operador.
- Registros de alertas e exceções do sistema.
- Funções que eles já possuem no sistema deles.

**Impacto:**  
Com esse aprimoramento, os logs se tornarão uma ferramenta útil para rastrear qualquer ocorrência, facilitando diagnósticos rápidos, garantindo auditorias eficientes e preparando o sistema para operar de forma confiável.


---

### 2. Aprimorar interface de avaliação de prescrição e pedido

&emsp;Atualmente, a avaliação de prescrição se baseia numa interface funcional, mas ainda funcional apenas para o nossos sistema. Com funções que ainda não estão integradas, por não termos tido contato com o sistema.

&emsp;A proposta é redesenhar essa interface com foco no operador da farmácia, adotando todas as funcionalidades que garantam:
- Visualização clara de medicamentos críticos.
- Alertas visuais para potenciais inconsistências.
- Fluxo lógico que acompanhe a operação do processo hospitalar.
- Todas as ferramentas que existem no sistema atual.

**Impacto:**  
Uma interface mais amigável, mas principalmente mais funcional para eles, onde o robô não se torna um problema, mas sim um aliado. 

---

### 3. Otimizar notificações do sistema

&emsp;O sistema já emite alertas básicos, mas podemos evoluir para um mecanismo de notificações mais inteligente:
- Priorizar alertas por criticidade.
- Diferenciar visual e sonoramente os tipos de notificações.
- Registrar notificações nos logs para posterior análise.
- Pensar em notificações para smartphones, e-mail e outras plataformas que sejam interessantes.

**Impacto:**  
Notificações eficazes aumentam a reatividade da equipe diante de eventos inesperados, evitam paradas prolongadas e melhoram o fluxo contínuo da produção de fitas, elevando o nível de segurança operacional.

---

### 4. Implementar gestão flexível da fila de processamento (não apenas FIFO)

&emsp;Hoje, seguimos a ordem FIFO (First In, First Out), que embora funcional, limita a flexibilidade diante de urgências ou mudanças de prioridade.

&emsp;Propomos implementar:
- Reordenação manual da fila.
- Priorizações automáticas baseadas em critérios como emergências da UTI ou medicações críticas.

**Impacto:**  
Isso trará uma resposta mais ágil a necessidades hospitalares dinâmicas, permitindo que a farmácia atenda rapidamente a casos urgentes sem interromper o fluxo geral de montagem.

---

### 5. Estudar viabilidade de múltiplos braços mecânicos

&emsp;Atualmente, operamos com um único braço robótico, o que para o nosso projeto foi suficiente, mas talvez cause gargalos em uma execução real do projeto. A expansão para múltiplos braços operando de forma coordenada permitirá:
- Aumento da capacidade produtiva.
- Redução do tempo total de montagem.
- Redundância em caso de falha de um dos braços.

**Impacto:**  
Uma solução escalável que atende não só a atual demanda da UTI, mas possibilita expansão futura para outras áreas do hospital ou até hospitais parceiros.

---

### 6. Responsividade completa do sistema

&emsp;Nossa interface hoje é funcional para desktop, mas recomendamos expandir para plena responsividade:
- Compatibilidade total com tablets e smartphones.
- Interface adaptativa para diferentes tamanhos de tela.
- Facilitar o monitoramento remoto e mobilidade dentro da farmácia.

**Impacto:**  
Permite maior flexibilidade operacional e oferece mobilidade para que farmacêuticos e técnicos acompanhem o processo de qualquer lugar dentro da farmácia ou hospital.

---

## Integrações Estratégicas

### 7. Integrar funcionalidades ao sistema de gestão do HC/Unicamp

&emsp;Nosso sistema foi desenvolvido com integração futura em mente. Pensamos nesses pontos para concretizar essa integração plena:
- Sincronização de estoque em tempo real.
- Registro automático de operações no prontuário do paciente.
- Comunicação bidirecional entre os sistemas.

**Impacto:**  
Garante alinhamento total entre o sistema automatizado e os registros oficiais do hospital, aumentando a segurança e reduzindo o retrabalho administrativo.

---

## Conclusão

&emsp;Durante as 5 sprints realizadas, conseguimos transformar um desafio real da operação hospitalar em uma solução funcional, capaz de automatizar a montagem das fitas de medicamentos de forma mais eficiente e segura, atendendo aos principais objetivos definidos no início da parceria. <br/>
&emsp;Embora este documento apresente oportunidades e caminhos para evolução futura do sistema, entendemos que essas sugestões ficarão como legado para futuras equipes ou para o próprio hospital, caso desejem dar continuidade ao desenvolvimento e aprimoramento da solução. <br/>
&emsp;Nossa contribuição se encerra aqui, com a certeza de que entregamos uma base sólida que pode, no futuro, ser expandida para atender às demandas mais amplas da farmácia hospitalar. Deixamos documentadas as possíveis melhorias para que o projeto tenha continuidade, caso haja interesse, garantindo que nosso trabalho sirva de alicerce para novas evoluções. <br/>
&emsp;A partir daqui, as próximas etapas dependerão de novas iniciativas que venham a dar sequência ao que foi desenvolvido até o momento. Nosso papel se encerra na entrega deste MVP, com todas as informações necessárias documentadas para viabilizar futuras melhorias, caso sejam desejadas ou viáveis no contexto do hospital.

---

