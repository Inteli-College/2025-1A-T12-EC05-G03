---
sidebar_position: 2
custom_edit_url: null
---

# Evidência do Preenchimento dos Requisitos Funcionais e Não Funcionais

#### Evidência do Preenchimento dos Requisitos Funcionais e Não Funcionais

&emsp;Durante o desenvolvimento do sistema automatizado de separação e montagem da Fita de Medicamentos para o Hospital de Clínicas da UNICAMP, um dos principais pilares foi garantir que todos os requisitos funcionais e não funcionais previamente definidos fossem contemplados de forma prática e mensurável. Esta documentação tem como objetivo apresentar, de maneira clara e objetiva, as **evidências de que tais requisitos foram considerados, implementados e validados** na entrega da solução desenvolvida.

&emsp;O alinhamento entre requisitos e entregas é essencial para assegurar não apenas o sucesso técnico do projeto, mas também a sua aplicabilidade real no ambiente hospitalar, especialmente considerando os aspectos críticos de **segurança, rastreabilidade, eficiência operacional e integração com processos médicos**. 

&emsp;Dessa forma, após a realização dos testes de usabilidade, foi possível avaliar na prática a eficácia da nossa solução em atender aos requisitos definidos. A partir desses testes, coletamos evidências que nos ajudaram a chegar nas seguintes conclusões:


## Requisitos Funcionais

| **RF#** | **Descrição** | **Evidência de Atendimento** |
|--------|---------------|------------------------------|
| **RF01** | Integração com sistema hospitalar para prescrições | A solução possui uma rota de API dedicada para receber prescrições externas, permitindo futura integração automática com sistemas hospitalares. |
| **RF02** | Comando de manipuladores robóticos | O robô é utilizado para realizar, de forma automatizada, os movimentos de coleta de medicamentos nos eixos XY e Z. |
| **RF03** | Validação de conformidade dos medicamentos | A solução realiza leitura e validação do QR Code do medicamento antes da descida do robô para garantir a conformidade com a prescrição e quando ele está para soltar o medicamento. |
| **RF04** | Montagem simultânea de múltiplos kits | A lógica é escalável, mas a versão atual da solução opera com montagem de uma fita por vez, dado que há apenas um robô disponível. |
| **RF05** | Registro de cada etapa do processo | Cada etapa do processo de montagem (validação, movimentação, coleta) é registrada por meio de logs, permitindo rastreabilidade completa. |
| **RF06** | Exibição de painel de status em tempo real | A solução exibe, via interface  o status atualizado de cada etapa do processo. |
| **RF07** | Atualização automática do estoque | Ao validar e coletar um medicamento, a solução prepara os dados para decrementar o estoque hospitalar via integração futura. |
| **RF08** | Alertas para estoque crítico | O sistema possui estrutura para detecção de estoques baixos. |
| **RF09** | Integração com fornecedores | Este requisito não foi contemplado na solução atual, mas está planejado para versões futuras com geração automática de pedidos. |
| **RF10** | Interface acessível por desktop e tablet | A solução pode ser acessada por navegador em dispositivos desktop e tablet, com layout responsivo em HTML simples. |
| **RF11** | Ajustes manuais em caso de falha | A interface permite que o operador cancele ações e retorne o robô ao estado inicial em caso de falhas, sem travar o sistema. |
| **RF12** | Relatórios de desempenho e métricas | A geração de relatórios estruturados ainda não foi implementada, embora os dados necessários estejam registrados nos logs. |
| **RF13** | Autenticação de usuários e permissões | A versão atual permite acesso único de acordo com permissões pré-estabelecidas. |
| **RF14** | Relatórios sobre precisão e eficiência | O time extraiu manualmente informações dos logs para avaliar taxa de acertos, falhas e tempo médio de montagem, mas não desenvolveu relatórios automáticos. |


## Requisitos Não Funcionais

| **RNF#** | **Descrição** | **Evidência de Atendimento** |
|---------|---------------|------------------------------|
| **RNF01** | Alta disponibilidade (< 0,1% downtime) | A solução operou de forma estável e contínua durante os testes, sem travamentos ou falhas. |
| **RNF02** | Processamento eficiente de prescrições | A montagem completa de uma fita ocorre em menos de 1 minuto, validando a eficiência esperada. |
| **RNF03** | Interface intuitiva e acessível | A interface fornece comandos simples e mensagens claras ao operador; o desenvolvimento de uma interface gráfica está em planejamento. |
| **RNF04** | Segurança e conformidade (LGPD/HIPAA) | A aplicação é executada localmente, sem exposição externa. Há planejamento para autenticação e controle de acessos em versões futuras. |
| **RNF05** | Compatibilidade com plataformas diversas | O sistema funciona em ambientes Windows e Linux, com suporte a navegadores como Chrome e Edge. |
| **RNF06** | Atualizações sem interromper operação | A arquitetura permite alterações nos scripts sem afetar o funcionamento global do sistema. |
| **RNF07** | Integridade e rastreabilidade de dados | Todos os eventos são registrados em arquivos de log, garantindo rastreabilidade total do histórico de montagem. |
| **RNF08** | Operação em ambiente hospitalar | Não foi possível testar a solução em ambiente hospitalar. |
| **RNF09** | Resposta inferior a 2s em ações críticas | A validação de medicamentos e comandos robóticos são processados com tempo de resposta inferior a 2 segundos. |

## Conclusão

&emsp;A aderência aos requisitos definidos no início do projeto foi fundamental para garantir que a solução desenvolvida não apenas funcionasse tecnicamente, mas atendesse de forma eficaz às necessidades reais do ambiente hospitalar. 

&emsp;Os requisitos funcionais asseguraram que o sistema oferecesse automatização segura, rastreável e validada da montagem das fitas, enquanto os requisitos não funcionais garantiram desempenho, confiabilidade, segurança e adaptabilidade em contexto médico real.

&emsp;Essas evidências demonstram que a solução entregue está em conformidade com o escopo planejado e preparada para evoluir rumo à integração total no fluxo hospitalar, promovendo eficiência, economia de tempo e maior segurança no tratamento dos pacientes.
