---
sidebar_position: 1
custom_edit_url: null
---

# Análise Financeira Industrial

## 1. Introdução ao Projeto de Automação da Separação de Medicamentos

&emsp;Este documento apresenta uma análise financeira detalhada para o projeto de automação da separação de medicamentos desenvolvido para o Hospital de Clínicas da Unicamp. Embora o protótipo atual seja implementado com tecnologias educacionais como Arduino Nano, Raspberry Pi, Dobot e periféricos acessíveis (leitor QR Code e sensor de distância), **esta análise financeira contempla uma projeção em escala industrial, alinhada com as expectativas do módulo de automação industrial.**

&emsp;Ademais, é importante pontuar que aqui consideramos parâmetros da cidade de São Paulo, como infraestrutura, carga tributária e salários médios. Para facilitar a navegação e dar maior clareza à leitura, **destacamos a seguir os valores-chave desta análise financeira** e indicamos onde cada um é desenvolvido com maior profundidade:

| Item                          | Faixa de Valor (R$)        | Natureza do Gasto       | Seção Detalhada                                                                 |
|------------------------------|----------------------------|--------------------------|----------------------------------------------------------------------------------|
| **CAPEX**                    | R$ 1.394.000 a R$ 2.413.000 | Pontual (Investimento Único) | [Seção 7 – Equipamentos e Infraestrutura](#7-tabela-de-análise-financeira---automação-da-fita-de-medicamentos-escala-industrial) |
| **OPEX**                     | R$ 302.000 a R$ 656.000     | Recorrente (Anual)       | [Seção 7 – Operação Contínua](#7-tabela-de-análise-financeira---automação-da-fita-de-medicamentos-escala-industrial) |
| **Despesas Operacionais**    | R$ 2.920.000 a R$ 4.310.000 | Recorrente (Anual)       | [Seção 7 – Recursos Humanos e Administração](#7-tabela-de-análise-financeira---automação-da-fita-de-medicamentos-escala-industrial) |
| **Impostos e Encargos**      | R$ 2.398.000 (valor fixo)   | Recorrente (Anual)       | [Seção 8.2 – Simulação de Carga Tributária](#82-simulação-de-carga-tributária-anual) |
| **Custo Total (C_total)**    | R$ 7.014.000 a R$ 9.777.000 | -                        | Calculado a partir de CAPEX + OPEX + Despesas + Impostos |
| **Lucro (20%)**              | R$1.753.500 a R$3.44.250 | -                        | [Seção 9 – Precificação com Lucro](#9-fórmula-de-precificação-com-lucro-desejado) |
| **Valor Total com Lucro (PV)** | **R$ R$ 8.767.500 a R$ 12.221.250** | -                  | [Seção 9.3 – Exemplo com Números](#93-exemplo-com-números) |

> **Nota:** O valor do custo de produção de um robô está dentro de **CAPEX**, variando de R$ 500.000 a R$ 675.000 (para mais informações, acessar a seção [Seção 6. Custo de um Robô Individual para o Sistema](#6-custo-de-um-robô-para-o-sistema)).

&emsp;Essa estrutura visa garantir uma **visualização rápida e objetiva dos principais resultados**, além de tornar a navegação mais fluida para leitores técnicos, acadêmicos ou investidores.

### 1.1 Contextualização do Projeto

&emsp;O projeto visa automatizar o processo de separação e montagem da "Fita de medicamentos" para pacientes internados no Hospital de Clínicas da Unicamp. Atualmente, este processo é realizado manualmente, o que demanda tempo considerável da equipe e apresenta riscos significativos como erros de separação e duplicidade, comprometendo tanto a segurança do paciente quanto a eficiência operacional da farmácia hospitalar.

### 1.2 Benefícios Esperados

&emsp;A solução proposta integra manipuladores robóticos, sensores inteligentes e um sistema digital de controle para otimizar a eficiência, reduzir erros e aumentar a segurança na entrega de medicamentos. Os benefícios esperados incluem:

- Redução de até 40% no tempo de montagem da "Fita de medicamentos"
- Diminuição significativa dos erros na separação
- Melhor rastreamento e gestão do estoque em tempo real
- Redução de desperdícios e aumento da produtividade da equipe

## 2. Conceitos Financeiros Fundamentais

&emsp;A compreensão adequada dos conceitos financeiros é essencial para a análise e tomada de decisão em projetos de automação e inovação tecnológica. Esta seção apresenta os fundamentos financeiros que serão utilizados como referência ao longo de toda a documentação, fornecendo uma base comum de conhecimento para todas as partes envolvidas no projeto.

&emsp;Os conceitos aqui apresentados – desde a distinção entre custos e despesas até a compreensão da diferença entre CAPEX e OPEX – serão constantemente referenciados nas análises econômicas, projeções financeiras e estudos de viabilidade apresentados em momentos subsequentes. Esta terminologia padronizada permitirá uma comunicação mais eficiente entre as equipes técnicas, administrativas e financeiras, além de facilitar a interpretação dos dados e resultados expostos ao longo do documento.

&emsp;Ao dominar estes fundamentos, os leitores estarão melhor preparados para compreender as implicações financeiras das decisões técnicas e operacionais, bem como para avaliar o real impacto econômico das soluções propostas para a automação da farmácia hospitalar.

### 2.1 Custo

**Definição**: São os gastos diretamente relacionados à produção de bens ou à prestação de serviços.

**Exemplos no contexto do projeto**:
- Custo dos componentes robóticos e sensores
- Custo dos sistemas de controle e software
- Mão de obra técnica diretamente envolvida na implementação
- Materiais consumíveis durante a instalação e testes

### 2.2 Custo Indireto

**Definição**: São gastos que não estão diretamente ligados à produção, mas são necessários para o funcionamento da operação.

**Exemplos no contexto do projeto**:
- Energia elétrica consumida pelos equipamentos
- Manutenção preventiva dos sistemas
- Treinamento da equipe
- Depreciação dos equipamentos ao longo do tempo
- Custos com infraestrutura de TI para suporte do sistema

### 2.3 Despesa

**Definição**: São gastos não relacionados diretamente à produção, mas necessários para a operação administrativa e comercial.

**Exemplos no contexto do projeto**:
- Salários da equipe administrativa do projeto
- Marketing e comunicação das mudanças de processo
- Contratos de suporte técnico
- Despesas com documentação e certificações
- Consultorias especializadas

### 2.4 Imposto

**Definição**: São tributos obrigatórios cobrados pelo governo sobre produtos, serviços, propriedades e transações financeiras.

**Exemplos no contexto do projeto**:
- Imposto sobre importação de componentes robóticos (II)
- Imposto sobre Produtos Industrializados (IPI)
- Imposto sobre Circulação de Mercadorias e Serviços (ICMS)
- PIS/COFINS sobre aquisição de equipamentos
- Imposto de Renda sobre o serviço prestado

### 2.5 CAPEX (Capital Expenditure)

**Definição**: CAPEX refere-se aos gastos de capital ou investimentos em bens físicos, como equipamentos, propriedades ou infraestrutura, que serão utilizados por um longo período. São considerados investimentos que geram valor para a empresa ao longo do tempo e geralmente são contabilizados como ativos no balanço patrimonial, sendo depreciados ao longo de sua vida útil.

**Características principais**:
- Representam investimentos de longo prazo
- São capitalizados no balanço patrimonial como ativos
- Sofrem depreciação ao longo do tempo
- Normalmente requerem aprovação orçamentária específica
- Tendem a ser investimentos pontuais de maior valor

**Exemplos de CAPEX no projeto**:
- Aquisição dos robôs industriais
- Compra de sistemas de visão computacional
- Investimento em servidores e infraestrutura de TI
- Aquisição de esteiras e sistemas de classificação
- Renovação ou adequação do espaço físico

### 2.6 OPEX (Operational Expenditure)

**Definição**: OPEX refere-se aos gastos operacionais necessários para o funcionamento diário do negócio. São despesas recorrentes que afetam diretamente o resultado do exercício e são contabilizadas como despesas na demonstração de resultados, não sendo capitalizadas ou depreciadas.

**Características principais**:
- Representam custos do dia a dia
- São contabilizados como despesas no período em que ocorrem
- Afetam diretamente o lucro do período
- Tendem a ser recorrentes e previsíveis
- Geralmente são geridos dentro do orçamento operacional

**Exemplos de OPEX no projeto**:
- Salários da equipe de operação
- Consumo de energia elétrica e água
- Custos de manutenção dos equipamentos
- Licenças de software (na modalidade de assinatura)
- Treinamentos periódicos
- Custos de suporte técnico
- Aluguel de instalações

### 2.7 Relação entre CAPEX e OPEX no Projeto

&emsp;No contexto do projeto de automação da farmácia hospitalar, é essencial equilibrar os investimentos de capital (CAPEX) com os custos operacionais (OPEX). Algumas considerações importantes:

- **Transformação de CAPEX em OPEX**: Atualmente, muitas soluções tecnológicas estão migrando do modelo de compra (CAPEX) para o modelo de serviço (OPEX), como no caso de softwares que passaram de licenças perpétuas para assinaturas.
- **Análise de Trade-off**: Em alguns casos, pode ser mais vantajoso aumentar o CAPEX inicial para reduzir o OPEX futuro. Por exemplo, investir em equipamentos mais robustos e de maior qualidade pode reduzir custos de manutenção a longo prazo.
- **Impactos contábeis e fiscais**: CAPEX e OPEX têm tratamentos contábeis e fiscais diferentes, o que pode impactar o fluxo de caixa e o resultado financeiro do projeto.
- **Planejamento orçamentário**: O CAPEX geralmente requer aprovações específicas e planejamento antecipado, enquanto o OPEX tende a ser gerido dentro do orçamento operacional regular.

## 3. Da Escala Educacional para a Industrial

&emsp;É importante destacar que, embora o protótipo educacional utilize componentes como Arduino Nano, Raspberry Pi e Dobot, a implementação em escala industrial requereria equipamentos mais robustos, como:

- Robôs industriais com maior capacidade de carga, precisão e durabilidade
- Sistemas de visão computacional mais avançados para identificação de medicamentos
- Linhas de produção automatizadas com esteiras e sensores industriais
- Sistemas de controle redundantes para garantir segurança e confiabilidade
- Software de gestão integrado com o sistema hospitalar existente

## 4. Investimentos e Custos para Implementação Industrial

### 4.1 Custos Diretos 

#### 4.1.1 Equipamentos e Hardware
- Robôs de automatização de medicamentos (nossa solução)
- Esteiras transportadoras e sistemas de classificação
- Gabinetes de armazenamento automatizados
- Computadores e servidores industriais
- Sistemas de backup e redundância

#### 4.1.2 Software e Integração
- Sistema de gerenciamento de armazém (WMS)
- Licenças de software especializado
- Desenvolvimento de APIs e integrações customizadas

#### 4.1.3 Instalação e Implementação
- Serviços de instalação de equipamentos
- Cabeamento e infraestrutura de rede
- Configuração de sistemas
- Testes de integração e validação
- Calibração de equipamentos e sensores

#### 4.1.4 Materiais Consumíveis
- Materiais para testes durante desenvolvimento
- Peças de reposição iniciais
- Suprimentos para validação do sistema

### 4.2 Custos Indiretos

#### 4.2.1 Energia e Utilidades
- Consumo de energia elétrica dos equipamentos
- Sistemas de refrigeração para servidores e equipamentos
- Água utilizada em processos de limpeza e manutenção
- Sistemas UPS e geradores de backup

#### 4.2.2 Manutenção
- Manutenção preventiva programada
- Aparo financeiro para manutenções corretivas
- Contratos de serviço para equipamentos críticos
- Calibração periódica de sensores e sistemas

#### 4.2.3 Treinamento
- Capacitação inicial da equipe técnica
- Treinamento de operadores
- Treinamento de equipe de suporte de primeiro nível
- Atualização de conhecimentos e certificações

#### 4.2.4 Depreciação
- Depreciação dos equipamentos robóticos
- Depreciação de hardware e infraestrutura
- Depreciação de melhorias em instalações

### 4.3 Despesas 

#### 4.3.1 Recursos Humanos

**Equipe de Desenvolvimento (estimativa inicial: 12-15 pessoas)**
- 1 Gerente de Projeto
- 2-3 Engenheiros de Automação Industrial
- 2-3 Desenvolvedores de Software
- 1-2 Especialistas em Integração de Sistemas
- 2 Farmacêuticos Especialistas (consultores de processo)
- 1-2 Técnicos de Validação
- 2 Técnicos de Manutenção
- 1 Especialista em Qualidade e Regulamentação

**Equipe de Operação (estimativa pós-implementação: 6-8 pessoas)**
- 1 Supervisor de Operações
- 2-3 Técnicos de Operação
- 1-2 Técnicos de Manutenção
- 1 Farmacêutico Responsável
- 1 Analista de Qualidade

#### 4.3.2 Instalações
- Aluguel de fábrica/espaço para desenvolvimento (aproximadamente 500-800 m²)
- Adequação do espaço físico (instalações elétricas, pisos técnicos)
- Segurança e controle de acesso
- Climatização e controles ambientais

#### 4.3.3 Administrativo
- Seguros (equipamentos, responsabilidade civil, etc.)
- Garantias estendidas para equipamentos críticos
- Custos de certificação (ISO, BPF, etc.)
- Material de escritório e suprimentos gerais
- Serviços de limpeza e manutenção predial

#### 4.3.4 Marketing e Comercial
- Material de divulgação do sistema
- Participação em feiras e eventos da área hospitalar
- Demonstrações para potenciais clientes
- Viagens e representação comercial

### 4.4 Impostos e Obrigações Fiscais

#### 4.4.1 Impostos sobre Aquisições
- Imposto de Importação (II) para equipamentos importados
- IPI (Imposto sobre Produtos Industrializados)
- ICMS (Imposto sobre Circulação de Mercadorias e Serviços)
- PIS/COFINS

#### 4.4.2 Impostos sobre Serviços
- ISS (Imposto Sobre Serviços)
- IRPJ (Imposto de Renda Pessoa Jurídica)
- CSLL (Contribuição Social sobre o Lucro Líquido)

#### 4.4.3 Obrigações Trabalhistas
- INSS Patronal
- FGTS
- Contribuições sindicais
- Provisões para férias e 13º salário

### 4.5 Custos de Operação Contínua

#### 4.5.1 Suporte e Manutenção
- Equipe de suporte técnico continuado
- Atualizações de software e sistema
- Substituição de componentes conforme ciclo de vida
- Calibrações e certificações periódicas

#### 4.5.2 Operação Diária
- Equipe de operação do sistema
- Monitoramento de performance
- Relatórios e análises de desempenho
- Gestão de inventário de peças de reposição

## 5. Estimativas de Custos e Valores

### 5.1 Custos Administrativos
&emsp;Os custos administrativos englobam despesas com gestão, contabilidade, recursos humanos e outros serviços de suporte. Estimativa inicial: entre R$ 10.000 a R$ 30.000 mensais, dependendo do porte da operação.

### 5.2 Aluguel de Fábrica
&emsp;O valor do aluguel de um galpão industrial depende da localização, tamanho e infraestrutura. Em São Paulo, uma regra comum é que o aluguel mensal represente entre 0,5% a 1% do valor de mercado do imóvel. Para um galpão avaliado em R$ 1.000.000, o aluguel mensal seria entre R$ 5.000 a R$ 10.000.

### 5.3 Equipamentos
- **Robô se Separação de Medicamentos**: Apresenta um custo médio R$ 500.000 entre R$ 675.000, podendo ser visto essa análise mais pra frente na [Seção 6 – Custo de um Robô Individual para o Sistema](#6-custo-de-um-robô-individual-para-o-sistema)

### 5.4 Utilidades
- **Água**: Custo médio para indústrias no Brasil aproximadamente R$ 5,75 por metro cúbico (m³).
- **Energia Elétrica**: Custo médio para o setor industrial cerca de R$ 329 por megawatt-hora (MWh), equivalente a R$ 0,329 por quilowatt-hora (kWh).

### 5.5 Manutenção
&emsp;Os custos de manutenção preventiva representam cerca de 5% a 10% do valor de reposição dos equipamentos anualmente. Para um equipamento avaliado em R$ 500.000, isso equivale a R$ 25.000 a R$ 50.000 por ano.

### 5.6 Garantias
&emsp;A garantia legal para equipamentos industriais é prevista pelo Código de Defesa do Consumidor, cobrindo defeitos de fabricação por um período determinado. É possível negociar garantias contratuais adicionais com os fornecedores.

### 5.7 Salários dos Funcionários
- **Engenheiro de Produção**: Salário médio de R$ 7.634,88 mensais.
- **Técnico de Manutenção Industrial**: Salário médio de R$ 4.291,66 mensais.
- **Operadores de Máquina**: Salário médio de R$ 2.500 a R$ 3.500 mensais, dependendo da região e experiência.

## 6. Custo de um Robô Individual para o Sistema

&emsp;Para uma compreensão mais granular dos custos envolvidos no projeto, é relevante analisar o investimento necessário para a aquisição e implementação de um único robô industrial compatível com as necessidades da automação da separação de medicamentos.

### 6.1 Composição do Custo de um Robô Individual

| Componente | Descrição | Custo Estimado (R$) |
|------------|-----------|---------------------|
| Braço robótico colaborativo | Robô industrial com 6 graus de liberdade, capacidade de carga de 5kg e precisão de ±0.1mm | R$ 350.000 - R$ 450.000 |
| Sistema de visão | Câmera industrial de alta resolução com iluminação e software de processamento de imagem | R$ 35.000 - R$ 50.000 |
| Garra específica | Garra customizada para manipulação segura de medicamentos | R$ 20.000 - R$ 30.000 |
| Controlador | Unidade de controle, incluindo hardware e software básico | R$ 40.000 - R$ 60.000 |
| Sensores adicionais | Sensores de força, proximidade e segurança | R$ 15.000 - R$ 25.000 |
| Integração | Serviços de instalação, programação e integração com o sistema | R$ 30.000 - R$ 45.000 |
| Treinamento | Capacitação específica para operação e manutenção básica | R$ 10.000 - R$ 15.000 |
| **Total para um robô completo** | **Solução individual pronta para operação** | **R$ 500.000 - R$ 675.000** |

### 6.2 Custos Operacionais Anuais por Robô

| Item | Valor Anual Estimado (R$) |
|------|---------------------------|
| Manutenção preventiva | R$ 25.000 - R$ 35.000 |
| Energia elétrica | R$ 5.000 - R$ 8.000 |
| Peças de reposição | R$ 15.000 - R$ 25.000 |
| Atualizações de software | R$ 10.000 - R$ 15.000 |
| **Total OPEX anual por robô** | **R$ 55.000 - R$ 83.000** |

### 6.3 Considerações sobre o Custo Individual

&emsp;É importante ressaltar que a aquisição de múltiplos robôs geralmente resulta em economias de escala, tanto no valor de aquisição quanto nos custos de manutenção. Para um projeto com 4-6 robôs, pode-se esperar:

- Desconto de 10-15% no valor unitário para aquisições em lote
- Redução de 20-25% nos custos de integração por unidade
- Compartilhamento de recursos de manutenção e treinamento
- Otimização do estoque de peças de reposição

&emsp;Dessa forma, o custo total por robô quando implementado em escala tende a ser cerca de 15-20% menor que o custo de aquisição individual, o que deve ser considerado no planejamento financeiro do projeto completo.

## 7. Tabela de Análise Financeira - Automação da Fita de Medicamentos (Escala Industrial)

| Item | Categoria | Descrição | Estimativa de Custo | Tipo de Gasto |
|------|-----------|-----------|----------------------|----------------|
| Robô industrial completo | Equipamentos e Hardware | Solução robótica individual com braço colaborativo, visão, garra, sensores, controlador, integração e treinamento | R$ 500.000 a R$ 675.000 | CAPEX |
| Gabinetes automatizados | Equipamentos e Hardware | Armazenamento inteligente de medicamentos | R$ 100.000 a R$ 200.000 | CAPEX |
| Computadores e servidores industriais | Equipamentos e Hardware | Controle de processos e processamento de dados | R$ 50.000 a R$ 120.000 | CAPEX |
| Sistema de backup e redundância | Equipamentos e Hardware | UPS, geradores e sistemas RAID | R$ 40.000 a R$ 70.000 | CAPEX |
| Software WMS e controle de robôs | Software e Integração | Sistema para gerenciamento de armazéns e robótica | R$ 200.000 a R$ 350.000 | CAPEX |
| Licenças de software | Software e Integração | Software de integração hospitalar e APIs | R$ 50.000 a R$ 100.000 | CAPEX |
| Instalação e infraestrutura | Instalação e Implementação | Cabeamento, montagem e testes | R$ 120.000 a R$ 250.000 | CAPEX |
| Materiais consumíveis e peças | Materiais Consumíveis | Peças de reposição, insumos de teste | R$ 30.000 a R$ 60.000 | CAPEX |
| Energia elétrica | Energia e Utilidades | Consumo médio industrial (mês) | R$ 5.000 a R$ 15.000 | OPEX |
| Água e refrigeração | Energia e Utilidades | Limpeza e controle de temperatura | R$ 1.000 a R$ 3.000 | OPEX |
| Manutenção preventiva e corretiva | Manutenção | Serviços programados e suporte emergencial | R$ 50.000 a R$ 100.000/ano | OPEX |
| Treinamento de equipe | Treinamento | Capacitação técnica, operadores e farmacêuticos | R$ 20.000 a R$ 40.000 | OPEX |
| Depreciação anual de ativos | Depreciação | Equipamentos, instalações e hardware | 10% do valor total de ativos | CAPEX |
| Salários da equipe de desenvolvimento (12-15 pessoas) | Recursos Humanos | Engenheiros, devs, técnicos, farmacêuticos | R$ 120.000 a R$ 180.000/mês | Despesa |
| Salários da equipe de operação (6-8 pessoas) | Recursos Humanos | Operadores, manutenção e supervisão | R$ 50.000 a R$ 70.000/mês | Despesa |
| Aluguel de fábrica (500-800 m²) | Instalações | Espaço para operação industrial | R$ 12.000 a R$ 24.000/mês | CAPEX |
| Adequação de instalações | Instalações | Climatização, elétrica, controle de acesso | R$ 80.000 a R$ 150.000 | CAPEX |
| Certificações e seguros | Administrativo | ISO, BPF, seguros de operação | R$ 50.000 a R$ 100.000/ano | Despesa |
| Marketing e representação | Marketing e Comercial | Feiras, divulgação e visitas técnicas | R$ 30.000 a R$ 50.000 | Despesa |
| Impostos sobre equipamentos | Impostos | II, IPI, ICMS, PIS/COFINS | 20% a 40% sobre valor de aquisição | Despesa |
| Obrigações trabalhistas | Obrigações Fiscais | INSS, FGTS, 13º, férias | R$ 50.000 a R$ 80.000/mês | Despesa |
| Suporte técnico e atualizações | Operação Contínua | Equipe técnica, software e substituições | R$ 100.000 a R$ 200.000/ano | OPEX |
| Gestão e análise de dados | Operação Contínua | Equipe de análise, relatórios e dashboards | R$ 60.000 a R$ 100.000/ano | OPEX |

### 7.1 Documentação da Tabela de Análise Financeira

&emsp;A tabela foi estruturada para organizar, justificar e estimar os principais investimentos e custos envolvidos na implementação da solução em escala industrial.

#### 7.1.1 Coluna: Item
&emsp;Esta coluna lista de forma objetiva cada elemento específico da solução, permitindo entender com clareza o que está sendo adquirido ou mantido, servindo como base para organização orçamentária e criação de planos de aquisição por fases (curto, médio e longo prazo).

#### 7.1.2 Coluna: Categoria
&emsp;Agrupa os itens por áreas de investimento ou funcionalidade, facilitando a gestão segmentada do orçamento por tipo de demanda (tecnológica, humana, estrutural).

#### 7.1.3 Coluna: Descrição
&emsp;Oferece uma explicação resumida da função e relevância de cada item dentro da solução, justificando sua presença na lista de investimentos ou custos.

#### 7.1.4 Coluna: Estimativa de Custo
&emsp;Apresenta uma faixa de preço realista com base em pesquisa de mercado (valores atualizados para São Paulo – capital, 2025). Os valores são apresentados como intervalo (mínimo e máximo) por item ou por período (mensal ou anual).

#### 7.1.5 Coluna: Tipo de Gasto
&emsp;Classifica cada linha conforme seu impacto contábil e estratégico, usando os conceitos de CAPEX, OPEX e Despesa.

## 8. Impostos e Obrigações Fiscais

### 8.1 Tabela de Impostos e Obrigações Fiscais

| Imposto / Encargo | Categoria | Descrição | Base de Cálculo ou Alíquota |
|-------------------|-----------|-----------|----------------------------|
| Imposto de Importação (II) | Impostos sobre Aquisições | Incide sobre produtos importados. Aumenta o custo de equipamentos estrangeiros. | 0% a 20% sobre o valor CIF |
| IPI | Impostos sobre Aquisições | Aplica-se a produtos industrializados (nacionais ou importados). | 5% a 15% sobre o valor do produto |
| ICMS | Impostos sobre Aquisições | Imposto estadual sobre circulação de mercadorias e bens. | 7% a 18%, conforme o estado |
| PIS/COFINS | Impostos sobre Aquisições | Contribuições sociais sobre receita e aquisições. | 0,65% a 9,25%, conforme regime tributário |
| ISS | Impostos sobre Serviços | Imposto municipal sobre prestação de serviços (manutenção, instalação etc). | 2% a 5% sobre o valor do serviço |
| IRPJ (Imposto de Renda PJ) | Impostos sobre Serviços | Imposto federal sobre o lucro da empresa. | 15% sobre lucro real + 10% adicional |
| CSLL (Contribuição Social sobre Lucro) | Impostos sobre Serviços | Imposto federal que complementa o IRPJ. | 9% sobre o lucro líquido ajustado |
| INSS Patronal | Obrigações Trabalhistas | Contribuição obrigatória da empresa à Previdência Social. | 20% sobre a folha salarial |
| FGTS | Obrigações Trabalhistas | Depósito obrigatório na conta do trabalhador. | 8% sobre salário bruto |
| Contribuições sindicais | Obrigações Trabalhistas | Valores definidos em convenções coletivas ou acordos sindicais. | Valor fixo ou percentual variável |
| Provisões: Férias e 13º salário | Obrigações Trabalhistas | Encargos trabalhistas obrigatórios ao final de cada ano. | 21,5% da folha (13,33% + 8,33%) |

### 8.2 Simulação de Carga Tributária Anual

| Tributo / Encargo | Base de Cálculo (R$) | Alíquota (%) | Valor Estimado (R$) |
|-------------------|----------------------|--------------|---------------------|
| Imposto de Importação (II) | 2.000.000,00 | 10,00% | 200.000,00 |
| IPI | 2.000.000,00 | 10,00% | 200.000,00 |
| ICMS | 2.000.000,00 | 12,00% | 240.000,00 |
| PIS/COFINS | 2.000.000,00 | 3,65% | 73.000,00 |
| ISS | 500.000,00 | 4,00% | 20.000,00 |
| IRPJ (anual) | 750.000,00 | 15,00% | 112.500,00 |
| CSLL (anual) | 750.000,00 | 9,00% | 67.500,00 |
| INSS Patronal (anual) | 3.000.000,00 | 20,00% | 600.000,00 |
| FGTS (anual) | 3.000.000,00 | 8,00% | 240.000,00 |
| Férias + 13º + 1/3 (anual) | 3.000.000,00 | 21,50% | 645.000,00 |

### 8.3 Análise da Carga Tributária

&emsp;A simulação acima foi baseada nos seguintes valores:
- Investimentos em equipamentos e softwares (CAPEX): R$ 2.000.000
- Serviços contratados (instalação, integração, suporte): R$ 500.000
- Folha de pagamento anual estimada: R$ 3.000.000

#### 8.3.1 Impostos sobre Aquisições
&emsp;II, IPI, ICMS e PIS/COFINS são encargos que aumentam o custo efetivo dos equipamentos importados ou industrializados no Brasil. Juntos, esses tributos adicionam aproximadamente R$ 713.000,00 sobre os R$ 2 milhões em aquisições.

#### 8.3.2 Impostos sobre Serviços
&emsp;O ISS incide sobre os serviços técnicos contratados, como instalação e configuração. Já o IRPJ e CSLL incidem sobre o lucro, e foram simulados com base em uma margem de lucro de 30% sobre a operação.

#### 8.3.3 Obrigações Trabalhistas
&emsp;INSS Patronal, FGTS, Férias e 13º compõem o bloco mais pesado da carga fiscal trabalhista. A soma desses encargos representa R$ 1.485.000,00 ao ano, o que corresponde a praticamente 50% adicional sobre a folha bruta anual.

### 8.4 Interpretações e Recomendações

- A carga tributária total estimada ultrapassa R$ 2,8 milhões ao ano, sendo:
  - ~25% corresponde a impostos diretos sobre compra e serviço
  - ~50% a encargos trabalhistas fixos
- A empresa deve se planejar para reservar pelo menos 40% do orçamento de folha e CAPEX para encargos e tributos
- Estratégias de incentivo fiscal (como regimes especiais de importação ou crédito de ICMS) podem reduzir significativamente essa carga
- É recomendável manter um fundo de provisão tributária mensal e contar com apoio contábil especializado

## 9. Fórmula de Precificação com Lucro Desejado

&emsp;Para determinar o preço de venda (PV) que garanta:
- Pagamento de todos os custos (diretos, indiretos e despesas)
- Cobertura da carga tributária
- Lucro líquido de 20% sobre a receita total (e não apenas sobre o custo)

### 9.1 Variáveis
- **C_total**: Custo total (CAPEX, OPEX, Despesas + Impostos e encargos)
- **Lucro_desejado**: Margem de lucro desejada sobre o preço final (20% = 0.20)
- **PV**: Preço de venda final com margem de lucro incluída

### 9.2 Fórmula Clássica da Precificação com Lucro
**PV = C_total / (1 - Lucro_desejado)**

### 9.3 Exemplo com Números
&emsp;Se os custos totais do projeto (C_total) forem de R$ 3.000.000, e você deseja um lucro de 20%, temos:
- PV = 3.000.000 / (1 - 0.20)
- PV = 3.000.000 / 0.80
- PV = R$ 3.750.000

**Preço de venda final sugerido: R$ 3.750.000**

&emsp;Esse valor cobre todos os custos e ainda entrega um lucro de R$ 750.000, o que representa 20% sobre a receita total.

## 10. Conclusão

&emsp;A análise financeira detalhada do projeto de automação da separação de medicamentos para o Hospital de Clínicas da Unicamp revela um investimento substancial, porém com potencial significativo de retorno através da otimização de processos, redução de erros e aumento da segurança do paciente.

### 10.1 Principais Conclusões

1. **Investimento inicial significativo**: A implementação industrial completa requer um CAPEX entre R$ 2,5 milhões e R$ 4,5 milhões, dependendo da escala e sofisticação dos equipamentos escolhidos.

2. **Carga tributária expressiva**: Os impostos e encargos representam aproximadamente 40% do custo total do projeto, destacando a importância do planejamento tributário e da busca por incentivos fiscais para inovação tecnológica na saúde.

3. **Equilíbrio entre CAPEX e OPEX**: A migração estratégica de alguns componentes de CAPEX para OPEX (como licenças de software por assinatura) pode melhorar o fluxo de caixa e diluir o investimento ao longo do tempo.

4. **Impacto trabalhista**: Os encargos relacionados à folha de pagamento representam cerca de 50% dos custos de pessoal, o que exige uma avaliação cuidadosa da dimensão das equipes de desenvolvimento e operação.

5. **Economia de escala**: A implementação com múltiplos robôs oferece economia significativa em relação à aquisição unitária, com potencial redução de 15-20% no custo por unidade.

### 10.2 Recomendações Estratégicas

1. **Implementação por fases**: Considerar uma abordagem gradual, iniciando com 2-3 robôs e expandindo conforme validação dos resultados operacionais e financeiros.

2. **Parcerias estratégicas**: Buscar parcerias com fornecedores de tecnologia dispostos a compartilhar riscos em troca de cases de sucesso no setor de saúde.

3. **Incentivos à inovação**: Explorar linhas de financiamento específicas para inovação na saúde, como as oferecidas pelo BNDES e FINEP, que podem reduzir o custo efetivo do capital.

4. **Mensuração de benefícios intangíveis**: Além da redução direta de custos, considerar na análise de ROI os benefícios relacionados à redução de erros médicos, melhoria na experiência do paciente e incremento na reputação institucional.

5. **Formação de preço competitivo**: Utilizar a fórmula de precificação para determinar o valor adequado, caso a solução seja comercializada para outras instituições de saúde após validação interna.

### 10.3 Considerações Finais

&emsp;O projeto de automação da separação de medicamentos representa não apenas um avanço tecnológico para o Hospital de Clínicas da Unicamp, mas também uma inovação com potencial de transformar a gestão da farmácia hospitalar no cenário brasileiro. Apesar do investimento substancial, os ganhos em eficiência, segurança e qualidade assistencial justificam a implementação, especialmente quando considerada a médio e longo prazo.

&emsp;A redução estimada de 40% no tempo de montagem da "Fita de medicamentos", aliada à minimização dos erros de medicação e ao melhor controle de estoque, pode resultar em economias operacionais significativas que, ao longo do tempo, compensarão o investimento inicial e gerarão valor sustentável para a instituição.

## Referências

ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR 6023:2018 – Informação e documentação – Referências – Elaboração.** Rio de Janeiro: ABNT, 2018.

AGÊNCIA NACIONAL DE ENERGIA ELÉTRICA (ANEEL). **Banco de Informações de Geração – Tarifas de energia elétrica.** Disponível em: https://www.aneel.gov.br. Acesso em: mar. 2025.

BANCO NACIONAL DE DESENVOLVIMENTO ECONÔMICO E SOCIAL (BNDES). **Cartilha de apoio à formação de preço de venda para micro e pequenas empresas.** Rio de Janeiro: BNDES, 2021.

BRASIL. **Receita Federal.** Impostos Federais: IRPJ, CSLL, IPI, PIS/COFINS, INSS Patronal. Disponível em: https://www.gov.br/receitafederal. Acesso em: mar. 2025.

CONFEDERAÇÃO NACIONAL DA INDÚSTRIA (CNI). **Estudo técnico sobre custos industriais no Brasil.** Brasília: CNI, 2022.

FIESP – Federação das Indústrias do Estado de São Paulo. **Custo-Brasil: Impacto tributário e trabalhista na indústria.** São Paulo: FIESP, 2023. Disponível em: https://www.fiesp.com.br. Acesso em: mar. 2025.

IBGE – Instituto Brasileiro de Geografia e Estatística. **Salários Médios da Indústria Brasileira.** Disponível em: https://www.ibge.gov.br. Acesso em: mar. 2025.

INDICADORES ECONÔMICOS – SALÁRIO.COM.BR. **Salários médios por função: engenheiro de produção, técnico de manutenção e operador industrial.** Disponível em: https://www.salario.com.br. Acesso em: mar. 2025.

INVESTE SP. **Guia de custos industriais no Estado de São Paulo.** São Paulo: Governo do Estado de SP, 2022. Disponível em: https://www.investe.sp.gov.br. Acesso em: mar. 2025.

PORTAL CONTÁBEIS. **Carga tributária no Brasil por regime de lucro real e presumido.** Disponível em: https://www.contabeis.com.br. Acesso em: mar. 2025.

PORTAL TRIBUTÁRIO. **Tabela de alíquotas dos principais tributos: ICMS, IPI, ISS, PIS/COFINS.** Disponível em: https://www.portaltributario.com.br. Acesso em: mar. 2025.

RAIS – Relação Anual de Informações Sociais. **Dados de mercado de trabalho formal.** Ministério do Trabalho. Disponível em: https://www.gov.br/trabalho. Acesso em: mar. 2025.

ROBÔ INDUSTRIAL – PREÇOS E MODELOS. **Guia de custos de robôs industriais e CLPs.** Automação Industrial Brasil. Disponível em: https://www.automacaobrasil.com.br. Acesso em: mar. 2025.

SEBRAE. **Formação do preço de venda: orientações e modelos.** São Paulo: SEBRAE, 2022. Disponível em: https://www.sebrae.com.br. Acesso em: mar. 2025.
