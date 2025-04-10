---
sidebar_position: 2
custom_edit_url: null
---

# Matriz de Risco

## Introdução

&nbsp;&nbsp;&nbsp;&nbsp; A matriz de riscos e oportunidades é uma ferramenta que ajuda a identificar e organizar os possíveis problemas e as vantagens que podem aparecer em um projeto ou negócio. Ela permite visualizar, de forma clara, quais situações podem atrapalhar o andamento das atividades e quais podem trazer benefícios. Para isso, cada risco e oportunidade é avaliado considerando a chance de acontecer e o impacto que terá no resultado final. Assim, fica mais fácil definir onde concentrar os esforços para evitar prejuízos e aproveitar as boas oportunidades que surgirem.
<br />


<p style={{textAlign: 'center'}}>Figura 1 - Matriz de Risco</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/riscos.png").default} style={{width: 800}} alt="Diagrama de blocos" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


<br />

&nbsp;&nbsp;&nbsp;&nbsp;A figura acima é a matriz de risco e oportunidades do nosso projeto. Nela, cada situação identificada é posicionada de acordo com a probabilidade de ocorrência e o impacto que pode causar. Dessa forma, os riscos e oportunidades com alta probabilidade e grande impacto ficam destacados, sinalizando que exigem ações imediatas para evitar prejuízos ou para aproveitar os benefícios. Já os itens com baixa probabilidade e impacto são monitorados sem a necessidade de intervenções urgentes. Essa matriz nos ajuda a direcionar recursos e esforços de forma inteligente, garantindo uma gestão mais eficiente dos desafios e oportunidades que podem influenciar os resultados do projeto.

## **Ameaças:**


### **Os custos para implementar o robô serem excessivamente altos:** 
- **Descrição:** O alto custo de aquisição, instalação e manutenção do manipulador robótico pode tornar o projeto inviável financeiramente, especialmente para hospitais públicos e instituições com orçamento restrito. Além do hardware, existem despesas adicionais, como adaptação da infraestrutura, treinamento da equipe, serviço de nuvem e suporte técnico contínuo, que podem aumentar os gastos inesperadamente.

- **Impacto:** Moderado – Pode dificultar a adoção da solução e limitar sua escalabilidade no mercado.   


- **Probabilidade:** Média (~50%) – Depende do modelo de braço mecânico escolhido, da necessidade de personalização e dos custos operacionais envolvidos. Embora os valores iniciais possam parecer elevados, para muitas equipes e instituições, esse investimento representa uma oportunidade benéfica de longo prazo, com retorno significativo em termos de eficiência, segurança e redução de custos operacionais.

### **Tempo de Resposta Elevado na Comunicação entre Robô e Sistema Web:** 
- **Descrição:** Atrasos na troca de informações entre a solução web e o robô podem comprometer a eficiência da solução, causando lentidão na separação dos medicamentos e possíveis gargalos no fluxo de trabalho. Isso pode ocorrer devido a sobrecarga no servidor, largura de banda insuficiente ou processamento inadequado dos comandos enviados ao robô. 

- **Impacto:** Alto – Pode comprometer a eficiência prometida pelo sistema, impactando a experiência do usuário e resultando em uma solução menos eficaz do que o processo manual atual.   


- **Probabilidade:** Média (~50%) – Depende da infraestrutura de rede do hospital e da otimização do código.

### **Nossas APIs não possuírem compatibilidade com o sistema atual do cliente:** 
- **Descrição:** Durante o desenvolvimento da solução, iremos criar algumas APIs, responsáveis por tornar o sistema 100% funcional. Porém, o sistema do cliente pode utilizar padrões, protocolos ou tecnologias que não sejam compatíveis com as APIs desenvolvidas, dificultando a integração e exigindo adaptações, resultando em atrasos na implementação da solução. 

- **Impacto:** Alto – Pode impedir a adoção da solução ou exigir trabalhos adicionais para que tudo funcione como deve.   


- **Probabilidade:** Baixa a média (~30%) – Depende da padronização do sistema do cliente e da flexibilidade da API a ser desenvolvida.


### **Falhas técnicas nos manipuladores robóticos e sensores:** 
- **Descrição:** Problemas técnicos nos manipuladores robóticos ou sensores podem comprometer a precisão da separação dos medicamentos, causando erros na montagem da fita. Falhas como mau funcionamento dos atuadores, imprecisão na leitura de códigos de barras, sensores defeituosos ou desgaste dos componentes podem impactar sua operação.

- **Impacto:** Alto – Pode comprometer a viabilidade do projeto e a aceitação no mercado. 


- **Probabilidade:** Média (~50%) –  Depende da eficiência dos manipuladores robóticos e da otimização do fluxo de trabalho.

### **O robô não reduz significativamente o tempo de montagem de uma fita:** 
- **Descrição:** Caso a automação não consiga reduzir de forma significativa o tempo de montagem da fita de medicamentos, o custo-benefício da solução pode ser questionado. Se a velocidade do robô for similar ou apenas ligeiramente melhor do que o processo manual, o cliente pode considerar a adoção inviável, especialmente devido ao alto investimento inicial.

- **Impacto:** Alto – Pode comprometer a viabilidade do projeto e a aceitação no mercado. 


- **Probabilidade:** Média (~50%) –  Depende da eficiência dos manipuladores robóticos e da otimização do fluxo de trabalho.

### **Ataques Cibernéticos e Vazamento de Dados Sensíveis** 
- **Descrição:** O sistema automatizado estará integrado ao banco de dados do hospital, lidando com informações sensíveis de pacientes e prescrições médicas. Caso haja vulnerabilidades na segurança, o sistema pode ser alvo de ataques cibernéticos, resultando no vazamento de dados, interrupção da operação ou até manipulação maliciosa das prescrições.

- **Impacto:** Muito alto – Pode comprometer a privacidade dos pacientes, gerar penalizações por não conformidade com a LGPD e afetar a confiabilidade do sistema.


- **Probabilidade:** Baixa (~10%) –  Depende do nível de proteção implementado e do interesse de agentes maliciosos em explorar vulnerabilidades. 

### **Falta de padronização nas prescrições médicas:** 
- **Descrição:** Se as prescrições médicas não seguirem um padrão, o sistema automatizado pode ter dificuldades para interpretar corretamente as informações, levando a erros na separação dos medicamentos. Diferenças na nomenclatura, abreviações, formatos de dosagem e instruções médicas podem dificultar a integração e processamento automático dos pedidos.

- **Impacto:** Muito Alto – Pode comprometer a precisão da separação dos medicamentos e gerar riscos para a segurança dos pacientes.


- **Probabilidade:** Baixa (~10%) – Embora dependa do nível de digitalização e padronização adotado pelo hospital e seus profissionais, essa solução foi sugerida pelo próprio cliente, o que reduz significativamente a probabilidade de erros nessa etapa.

### **Falhas no Sistema durante o expediente:** 
- **Descrição:** Se o sistema apresentar instabilidades ou falhas durante o expediente, a separação dos medicamentos pode ser interrompida, causando atrasos na entrega e impactando diretamente o atendimento aos pacientes. Problemas como bugs de software, travamentos, falhas de rede ou erros na comunicação com o robô podem comprometer a operação. 

- **Impacto:** Muito alto – Pode gerar atrasos no fornecimento de medicamentos, o que, em casos mais graves, pode resultar em consequências fatais para os pacientes afetados. 


- **Probabilidade:** Alta a muito alta (~70%) –  Erros são inevitáveis durante o processo, mas sua frequência e gravidade dependerão do nível de refinamento e robustez do projeto até a entrega.

### **Questões legais e regulatórias que impactam a automação farmacêutica:** 
- **Descrição:** A solução deve atender a diversas normas e regulamentações da área da saúde, como as diretrizes da **ANVISA**, **LGPD (Lei Geral de Proteção de Dados)** e outras regras hospitalares. O não cumprimento dessas normas pode resultar em impedimentos legais, multas ou até na proibição do uso do sistema. A validação e implementação de qualquer alteração nessas normas é um processo demorado e complexo, frequentemente sujeito a extensos trâmites burocráticos.   


- **Impacto:** Muito alto – Pode tornar inviável a implementação do sistema ou gerar penalizações para o hospital.  


- **Probabilidade:** Muito alta (~90%) –  É importante destacar que a automação na área da saúde ainda é uma tecnologia emergente, sujeita a regulamentações em constante evolução. Como resultado, o projeto pode enfrentar aprovações e rejeições em diferentes momentos, dependendo das mudanças nas normas e da interpretação dos órgãos reguladores. 

 
<br />


## **Oportunidades:**

### **Integração com Telemedicina:** 
- **Descrição:** Com o crescimento da telemedicina, a automação da separação de medicamentos pode ser integrada a sistemas de prescrição digital, permitindo que medicamentos sejam preparados automaticamente assim que uma receita for emitida remotamente. Isso reduziria o tempo entre a prescrição e a disponibilização do medicamento, melhorando a eficiência hospitalar e a experiência do paciente. 


- **Impacto:** Muito alto – Pode ampliar o escopo da solução, tornando-a ainda mais valiosa para hospitais e clínicas.


- **Probabilidade:** Baixa a média (~30%) –  Depende de uma maior aceitação da telemedicina e da compatibilidade entre os sistemas.

### **Expansão para outras Instituições de Saúde:** 
- **Descrição:** Caso o sistema automatizado de separação de medicamentos demonstre eficiência e segurança no Hospital de Clínicas da Unicamp, ele poderá ser adotado por outros hospitais, clínicas e até redes de farmácias. A padronização da solução e sua escalabilidade podem abrir portas para novos mercados, incluindo instituições privadas e operadoras de saúde.   


- **Impacto:** Muito alto – Pode transformar o projeto em um **produto comercializável**, ampliando seu alcance e impacto no setor de saúde.


- **Probabilidade:** Média (~50%) –  Depende do sucesso da implementação inicial e do interesse de outras instituições em adotar a tecnologia.

### **Expandir a solução para outros setores além das redes hospitalares:** 
- **Descrição:** A tecnologia de automação da separação de medicamentos pode ser adaptada para outros setores que exigem **armazenamento, separação e distribuição precisa de insumos**, como **farmácias de grande porte, laboratórios, indústrias farmacêuticas e centros de logística de medicamentos**. Essa diversificação pode ampliar o mercado da solução e aumentar sua viabilidade comercial.   


- **Impacto:** Muito alto – Pode transformar o sistema em uma solução **multiuso**, escalável para diferentes segmentos.


- **Probabilidade:** Muito alta (~90%) –  A implementação, embora dependente da tecnologia e demanda setorial, é uma tendência inevitável em diversos mercados.

### **Inovar a maneira como fitas de medicamento são montadas no país:** 
- **Descrição:** A automação do processo de montagem das fitas de medicamentos pode estabelecer um **novo padrão na área hospitalar**, reduzindo erros humanos, aumentando a eficiência e melhorando a rastreabilidade dos medicamentos. Se bem-sucedida, a solução pode influenciar o modelo a ser seguido por outras instituições de saúde no Brasil.  


- **Impacto:** Alto – Pode transformar a logística hospitalar, trazendo mais **segurança, eficiência e padronização** ao processo.  


- **Probabilidade:** Baixa a média (~30%) – Depende da aceitação do mercado, regulamentações e comprovação dos benefícios da solução.

### **Desenvolvimento de novas parcerias com o Hospital das Clínicas:** 
- **Descrição:** Caso a parceria seja bem-sucedida, novas oportunidades de colaboração entre o Inteli e o Hospital das Clínicas da Unicamp podem surgir, resultando em projetos conjuntos adicionais que ampliem o impacto e a inovação no setor de saúde.


- **Impacto:** Alto – Pode aumentar a popularidade do Inteli em meio a instituições de grande nome, assim como o Hospital de Clínicas da Unicamp.  


- **Probabilidade:** Alta a muito alta (~70%) –  Parcerias estreitas com o Hospital das Clínicas podem não apenas validar o produto, mas também permitir melhorias contínuas com base no feedback real, criando uma solução cada vez mais eficaz. Isso aumenta a credibilidade do projeto dentro do setor de saúde.

### **Maior Aproveitamento da Equipe do Cliente para Funções Estratégicas:** 
- **Descrição:** Com a automação do processo de separação de medicamentos, a equipe do hospital pode ser liberada de tarefas operacionais e repetitivas, permitindo que se concentre em funções mais estratégicas, como gestão de processos, melhoria contínua e interação com pacientes. Isso pode aumentar a eficiência operacional do hospital e melhorar o desempenho geral da equipe. 


- **Impacto:** Alto – A equipe do cliente poderá dedicar mais tempo às áreas que agregam mais valor à instituição, como a tomada de decisões estratégicas, o que pode impactar diretamente a qualidade dos serviços prestados e a satisfação do paciente.


- **Probabilidade:** Muito alta (~90%) –  Com a automação da separação de medicamentos, o potencial de liberar a equipe para tarefas mais estratégicas é elevado, dado que o sistema desenvolvido visa reduzir significativamente o tempo dedicado às atividades operacionais.

<br />


&nbsp;&nbsp;&nbsp;&nbsp;Ao elaborar a matriz de risco, é possível obter uma visão clara e estruturada de todas as ameaças ao projeto, desde as de menor impacto até as mais críticas. Essa abordagem permite estruturar planos de mitigação mais eficazes, aumentando a viabilidade do projeto. Da mesma forma, a matriz de oportunidades permite identificar e capitalizar os aspectos positivos do projeto, contribuindo para seu crescimento e aprimoramento.<br />
&nbsp;&nbsp;&nbsp;&nbsp;A automação do processo de montagem das fitas de medicamentos pode estabelecer um novo padrão na área hospitalar, reduzindo erros humanos, aumentando a eficiência e melhorando a rastreabilidade dos medicamentos. Se bem-sucedida, a solução pode influenciar o modelo a ser seguido por outras instituições de saúde no Brasil, revolucionando a logística hospitalar e a segurança do paciente. <br />
&nbsp;&nbsp;&nbsp;&nbsp;Os riscos são fundamentais para evidenciar as limitações do projeto, mas identificá-los é o passo mais importante do processo. Ao reconhecê-los com antecedência, torna-se possível mitigar seus impactos e otimizar o tempo e os recursos do projeto.

## **Bibliografia:** 
 
1. **SILVA, J. P.** *Introdução à Automação Farmacêutica*. 2. ed. São Paulo: Editora Acadêmica, 2020.

2. **COSTA, A. R.** "Automação na Dispensação de Medicamentos: Benefícios e Desafios." *Revista Brasileira de Farmácia Hospitalar*, São Paulo, v. 35, n. 2, p. 123-130, abr./jun. 2022.

3. **MENDES, L. F.** *Automação de Processos Farmacêuticos no Ambiente Hospitalar*. 2023. 150 f. Dissertação (Mestrado em Engenharia Biomédica) – Universidade Estadual de Campinas, Campinas, 2023.

4. **ALVES, R.** "Inovações Tecnológicas na Saúde." *Jornal da Ciência*, Brasília, 15 mar. 2024. Seção Tecnologia, p. B3. Disponível em: [https://www.jornaldaciencia.org.br/inovacoes-tecnologicas-na-saude](https://www.jornaldaciencia.org.br/inovacoes-tecnologicas-na-saude). Acesso em: 09 fev. 2025.
