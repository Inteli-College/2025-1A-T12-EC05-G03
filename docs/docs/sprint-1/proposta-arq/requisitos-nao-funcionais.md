---
sidebar_position: 3
custom_edit_url: null
---

# Requisitos Não Funcionais

##### Requisitos não funcionais do projeto

&emsp;Os requisitos não funcionais definem as características de qualidade que o sistema deve possuir para garantir seu desempenho, segurança, usabilidade e confiabilidade no ambiente hospitalar. Diferente dos requisitos funcionais, que descrevem as ações específicas do sistema, os requisitos não funcionais estabelecem critérios como tempo de resposta, disponibilidade, compatibilidade com diferentes plataformas, proteção contra acessos não autorizados e capacidade de manutenção. Esses aspectos são essenciais para assegurar que a automação da montagem da "Fita de Medicamentos" opere de maneira eficiente, minimizando falhas e garantindo a segurança dos pacientes e dos profissionais envolvidos.

### Tabela de Requisitos

| RNF#  | Descrição | Aspecto de Qualidade |
|------|-----------|------------------|
| RNF01 | O sistema deve garantir alta disponibilidade, operando com tempo de inatividade inferior a 0,1% para evitar atrasos na montagem dos kits de medicamentos. | Disponibilidade |
| RNF02 | O sistema deve processar prescrições e montar os kits de medicamentos em um tempo máximo determinado para garantir a eficiência operacional. | Performance |
| RNF03 | A interface do sistema deve ser intuitiva e acessível, permitindo que operadores consigam visualizar e ajustar processos com facilidade. | Usabilidade |
| RNF04 | O sistema deve garantir proteção contra acessos não autorizados, seguindo normas de segurança hospitalar como LGPD e HIPAA. | Segurança |
| RNF05 | O software deve ser compatível com diferentes sistemas operacionais e navegadores para permitir que a interface seja acessada em diversas plataformas. | Compatibilidade |
| RNF06 | O sistema deve permitir manutenção e atualizações sem interromper a operação principal, garantindo correções de falhas e melhorias contínuas. | Manutenibilidade |
| RNF07 | O armazenamento de dados deve garantir integridade e rastreabilidade, possibilitando auditorias de histórico de prescrições e montagem de medicamentos. | Confiabilidade |
| RNF08 | O sistema deve operar corretamente em ambientes hospitalares, considerando restrições de espaço, temperatura e possíveis interferências eletrônicas. | Robustez |
| RNF09 | O tempo de resposta do sistema ao usuário deve ser inferior a 2 segundos para operações críticas, como validação de medicamentos e exibição de status em tempo real. | Tempo de Resposta |

&emsp;Além disso, para assegurar o cumprimento dos requisitos não funcionais, é fundamental conduzir testes específicos que analisem a qualidade e o desempenho do sistema em termos de eficiência, disponibilidade, usabilidade, segurança, compatibilidade e manutenibilidade. Esses testes reproduzem cenários reais e diferentes condições de uso, possibilitando a validação de cada critério por meio de métricas detalhadas, garantindo que o sistema funcione de forma confiável, intuitiva e com suporte adequado para manutenção contínua.

### Tabela de Como Testar os Requisitos Não Funcionais 

| RNF#  | Como Testar |
|------|------------|
| RNF01 | Realizar testes de estresse e carga para verificar a disponibilidade, simulando um grande volume de prescrições sendo processadas ao mesmo tempo e medindo possíveis tempos de inatividade. |
| RNF02 | Medir o tempo médio de processamento de uma prescrição desde a sua entrada no sistema até a montagem completa do kit, garantindo que esteja dentro dos padrões estabelecidos. |
| RNF03 | Conduzir testes de usabilidade com farmacêuticos e operadores, analisando a facilidade de navegação na interface, o tempo para realizar tarefas e coletando feedbacks qualitativos. |
| RNF04 | Aplicar testes de penetração para verificar vulnerabilidades no sistema, além de validar criptografia de dados e autenticação de múltiplos fatores. |
| RNF05 | Testar a interface do sistema em diferentes sistemas operacionais (Windows, MacOS, Linux) e navegadores (Chrome, Firefox, Safari, Edge) para identificar e corrigir possíveis incompatibilidades. |
| RNF06 | Simular atualizações do software enquanto o sistema está em operação, garantindo que os processos não sejam interrompidos e que as atualizações sejam aplicadas corretamente. |
| RNF07 | Realizar testes de integridade de dados ao longo do tempo, verificando se o armazenamento mantém a consistência dos registros sem perda ou corrupção de informações. |
| RNF08 | Implantar o sistema em um ambiente de teste hospitalar e medir sua capacidade de funcionamento sob diferentes condições físicas e elétricas. |
| RNF09 | Executar testes de tempo de resposta medindo o intervalo entre a entrada de um comando do usuário e a resposta do sistema, garantindo que esteja abaixo do limite de 2 segundos. |

&emsp;Portanto, os requisitos não funcionais são fundamentais para garantir que o sistema de automação da montagem da "Fita de Medicamentos" opere de maneira confiável, segura e eficiente no ambiente hospitalar. Através da definição de critérios como disponibilidade, desempenho, usabilidade, compatibilidade e segurança, assegura-se que o sistema não apenas cumpra suas funções, mas também ofereça uma experiência robusta e estável para os usuários. A validação desses requisitos por meio de testes rigorosos permitirá a identificação e mitigação de possíveis falhas, garantindo que a solução atenda aos padrões de qualidade exigidos no setor de saúde e contribua para a otimização dos processos farmacêuticos hospitalares.

---

## Bibliografia
CYSNEIROS, Luiz Marcio; DO PRADO LEITE, Julio Cesar Sampaio. Definindo requisitos não funcionais. In: Anais do XI Simpósio Brasileiro de Engenharia de Software. SBC, 1997. p. 49-64. Acesso em: 10 de fevereiro de 2025

FIGUEIREDO, Eduardo. Requisitos funcionais e requisitos não funcionais. Icex, Dcc/Ufmg, 2011. Acesso em: 10 de fevereiro de 2025
