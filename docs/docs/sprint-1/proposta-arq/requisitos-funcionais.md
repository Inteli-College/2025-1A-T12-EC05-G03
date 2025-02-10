---
sidebar_position: 2
custom_edit_url: null
---

# Requisitos Funcionais

##### Requisitos funcionais do projeto

&emsp;Os requisitos funcionais descrevem as funcionalidades essenciais que o sistema deve oferecer para garantir a automação eficiente e segura da montagem da "Fita de Medicamentos" no ambiente hospitalar. Esses requisitos estabelecem as interações do sistema com os usuários e outras plataformas, detalhando as capacidades necessárias para processar prescrições médicas, controlar manipuladores robóticos, validar medicamentos, rastrear processos em tempo real e integrar-se ao sistema de gestão hospitalar. Além disso, incluem funcionalidades como controle de estoque, geração de alertas, interface interativa para operadores e geração de relatórios para análise de desempenho. Dessa forma, esses requisitos garantem que o sistema atenda aos objetivos de eficiência, segurança e conformidade com normas médicas, melhorando significativamente a qualidade e precisão na administração de medicamentos, como é possível ver na tabela abaixo:

### Tabela de Requisitos

| RF#  | Descrição | Regra de negócio |
|------|-----------|------------------|
| RF01 | O sistema deve se integrar ao sistema de gestão hospitalar para obter as prescrições médicas. | As prescrições devem ser adquiridas automaticamente para iniciar a montagem da fita de medicamentos sem necessidade de inserção manual. |
| RF02 | O sistema deve comandar manipuladores robóticos para selecionar os medicamentos corretos. | O processo de separação deve ser automatizado para garantir precisão e reduzir erros humanos. |
| RF03 | O sistema deve validar a conformidade de cada medicamento antes de incluí-lo no kit. | A validação deve ocorrer por meio de sensores de código de barras e conferência com a prescrição médica. |
| RF04 | O sistema deve permitir a montagem simultânea de múltiplos kits de medicamentos. | A automação deve possibilitar a separação e montagem de diferentes fitas de medicamentos em paralelo, otimizando o tempo de preparo. |
| RF05 | O sistema deve registrar cada etapa do processo de separação e montagem. | O rastreamento deve permitir auditoria e consulta do histórico de montagem para garantir a conformidade e segurança do paciente. |
| RF06 | O sistema deve exibir um painel de status atualizado em tempo real. | O dashboard deve permitir a visualização de indicadores de desempenho, status do robô e fila de prescrições pendentes. |
| RF07 | O sistema deve atualizar o estoque hospitalar em tempo real conforme os medicamentos são utilizados. | Cada medicamento retirado deve ser subtraído do estoque automaticamente, evitando discrepâncias. |
| RF08 | O sistema deve gerar alertas para níveis baixos de estoque. | Quando um medicamento atingir um limite crítico, o sistema deve notificar a equipe responsável pela reposição. |
| RF09 | O sistema deve possibilitar a integração com fornecedores para reposição automatizada. | O sistema deve ser capaz de gerar pedidos automáticos para fornecedores quando um item atingir um nível crítico de estoque. |
| RF10 | O sistema deve possuir uma interface gráfica acessível por desktop e tablet. | A interface deve ser responsiva e de fácil usabilidade para farmacêuticos e operadores. |
| RF11 | O sistema deve permitir ajustes manuais em caso de falha na automação. | O operador deve poder intervir e corrigir eventuais problemas sem interromper todo o processo. |
| RF12 | O sistema deve exibir relatórios de desempenho e métricas do processo. | O sistema deve gerar relatórios sobre tempo médio de montagem, taxa de erro e eficiência operacional. |
| RF13 | O sistema deve exigir autenticação de usuários com diferentes níveis de permissão. | Apenas usuários autorizados devem acessar funcionalidades críticas, garantindo segurança e conformidade com normas médicas. |
| RF14 | O sistema deve gerar relatórios detalhados sobre eficiência e precisão do processo. | Os relatórios devem estar disponíveis para análise dos gestores e auxiliar na tomada de decisões. |

&emsp;Os requisitos funcionais definidos para o sistema de automação da montagem da "Fita de Medicamentos" garantem que a solução atenda às necessidades operacionais e de segurança do ambiente hospitalar. A implementação dessas funcionalidades permitirá a otimização do tempo de separação dos medicamentos, a redução de erros humanos, o rastreamento eficiente do estoque e a integração com o sistema hospitalar, resultando em maior precisão e confiabilidade no processo. Além disso, a geração de relatórios e a interface interativa proporcionarão maior controle e transparência para os profissionais da área. Com isso, o sistema contribuirá significativamente para a melhoria da eficiência operacional, a segurança dos pacientes e a gestão hospitalar, tornando-se um avanço essencial na automação de processos farmacêuticos.

---

## Bibliografia

FIGUEIREDO, Eduardo. Requisitos funcionais e requisitos não funcionais. Icex, Dcc/Ufmg, 2011. Acesso em: 10 de fevereiro de 2025

GASTALDO, Denise Lazzeri; MIDORIKAWA, Edson Toshimi. Processo de Engenharia de Requisitos Aplicado a Requisitos Não-Funcionais de Desempenho–Um Estudo de Caso. In: Workshop em Engenharia de Requisitos. Piracicaba. 2003. p. 302-316.