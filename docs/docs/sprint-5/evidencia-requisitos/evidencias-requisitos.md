---
sidebar_position: 1
custom_edit_url: null
---

# Evidência do Preenchimento dos Requisitos Funcionais e Não Funcionais

#### Evidência do Preenchimento dos Requisitos Funcionais e Não Funcionais

&emsp;Durante o desenvolvimento do sistema automatizado de separação e montagem da Fita de Medicamentos para o Hospital de Clínicas da UNICAMP, um dos principais pilares foi garantir que todos os requisitos funcionais e não funcionais previamente definidos fossem contemplados de forma prática e mensurável. Esta documentação tem como objetivo apresentar, de maneira clara e objetiva, as **evidências de que tais requisitos foram considerados, implementados e validados** na entrega da solução desenvolvida.

&emsp;O alinhamento entre requisitos e entregas é essencial para assegurar não apenas o sucesso técnico do projeto, mas também a sua aplicabilidade real no ambiente hospitalar, especialmente considerando os aspectos críticos de **segurança, rastreabilidade, eficiência operacional e integração com processos médicos**.


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


