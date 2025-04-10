---
sidebar_position: 3
custom_edit_url: null
---

# Elementos Selecionados Para Montagem

&emsp;Este documento detalha como o usuário visualiza e interage com os elementos selecionados no sistema de gerenciamento de medicamentos para farmácia hospitalar.

## Menu de Navegação

&emsp;O sistema utiliza um menu lateral retrátil (sidebar) que permite ao usuário navegar entre as principais seções do sistema.

<p style={{textAlign: 'center'}}>Figura 1 - Menu de Navegação</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/menu_navegacao.jpg").default} style={{width: 300}} alt="Menu de Navegação" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Menu expansível/retrátil através do ícone de hambúrguer
- Indicação visual da página atual (realce do item selecionado)
- Ícones intuitivos para cada seção
- Navegação persistente entre páginas
- Estado do menu (expandido/retraído) preservado entre sessões

**Funcionalidades:**
- Acesso à página inicial (Home)
- Acesso ao módulo de Estoque
- Acesso ao módulo de Histórico de Prescrições

## Seleção de Prescrições

&emsp;Na página inicial (Home), o usuário pode selecionar entre visualizar prescrições aguardando avaliação ou já avaliadas.

<p style={{textAlign: 'center'}}>Figura 2 - Seleção de Categorias de Prescrições</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/selecao_prescricoes1.jpg").default} style={{width: 800}} alt="Logo do Núcleo de Desenvolvimento Conectado." />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

<p style={{textAlign: 'center'}}>Figura 3 - Seleção de Categorias de Prescrições</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/selecao_prescricoes2.jpg").default} style={{width: 800}} alt="Seleção de Categorias de Prescrições" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Boxes clicáveis para alternar entre categorias
- Realce visual da categoria selecionada
- Contador de itens em cada categoria
- Atualização automática da lista conforme a seleção
- Indicação clara do tipo de prescrição sendo visualizada

&emsp;A seleção de uma categoria carrega dinamicamente a lista de prescrições correspondentes na interface, permitindo que o usuário visualize apenas o conjunto relevante de dados.

### Seleção de Prescrição Individual

&emsp;Para cada prescrição listada, o usuário pode selecioná-la para visualização detalhada ou avaliação.

<p style={{textAlign: 'center'}}>Figura 4 - Seleção de Prescrição Individual</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/selecao_prescricao_individual.jpg").default} style={{width: 800}} alt="Seleção de Prescrição Individual" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**
- Card de prescrição com informações resumidas
- Botão "Avaliar" para prescrições pendentes
- Botão "Visualizar" para prescrições já avaliadas

&emsp;Ao selecionar uma prescrição individual, o sistema abre um modal que exibe suas informações detalhadas e permite ações específicas dependendo do status da prescrição.

## Seleção de Medicamentos para Avaliação

&emsp;No processo de avaliação de prescrições, o farmacêutico pode selecionar quais medicamentos serão aprovados ou rejeitados.

<p style={{textAlign: 'center'}}>Figura 5 - Seleção de Medicamentos na Avaliação</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/selecao_medicamentos_avaliacao.jpg").default} style={{width: 800}} alt="Seleção de Medicamentos na Avaliação" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Checkboxes para cada medicamento prescrito
- Todos os medicamentos são pré-selecionados por padrão
- Visualização clara das informações de cada medicamento
- Feedback visual do estado selecionado/não selecionado
- Aprovação parcial ou total da prescrição com base na seleção

**Funcionalidades:**
- Seleção/desseleção individual de medicamentos
- Confirmação da avaliação via botão de confirmação
- Geração de status automático baseado na seleção:
  - Todos selecionados: Aprovação Total (status 2)
  - Alguns selecionados: Aprovação Parcial (status 3)
  - Nenhum selecionado: Reprovada (status 4)

&emsp;A interface facilita a análise farmacêutica, permitindo que o profissional avalie cada item individualmente e confirme sua decisão através de um processo claro e intuitivo.

## Filtros e Seleção de Visualização

&emsp;O sistema oferece diversos filtros para selecionar e personalizar a visualização dos dados em diferentes módulos.

### Filtros no Estoque

<p style={{textAlign: 'center'}}>Figura 6 - Filtros de Estoque</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/filtros_estoque.jpg").default} style={{width: 800}} alt="Filtros de Estoque" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Modal de filtros com múltiplas opções
- Seleção de medicamento através de dropdown
- Seleção de fabricante através de dropdown
- Faixa de quantidade em estoque com valores mínimo e máximo
- Checkboxes para filtragem por validade
- Botão para limpar todos os filtros
- Botão para aplicar os filtros selecionados
- Indicação visual quando existem filtros ativos

**Funcionalidades:**
- Filtragem combinada por múltiplos critérios
- Preservação dos filtros entre sessões
- Busca textual integrada com os filtros
- Atualização em tempo real da tabela de estoque

### Filtros no Histórico

<p style={{textAlign: 'center'}}>Figura 7 - Filtros de Histórico</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/filtros_historico_detalhado.jpg").default} style={{width: 800}} alt="Filtros de Histórico" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Seleção de status da prescrição
- Filtro por período com data inicial e final
- Busca por HC do paciente
- Combinação de múltiplos filtros
- Indicação visual de filtros ativos

**Funcionalidades:**
- Filtragem por status específico
- Delimitação de período para análise
- Busca específica por paciente
- Filtragem combinada de múltiplos critérios
- Limpar todos os filtros com um único clique

### Seleção de Pedidos por Status

<p style={{textAlign: 'center'}}>Figura 8 - Seleção de Status de Pedidos</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/selecao_status_pedidos.jpg").default} style={{width: 800}} alt="Seleção de Status de Pedidos" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Boxes clicáveis para cada etapa do fluxo de trabalho
- Realce visual do status selecionado
- Contadores de pedidos em cada status
- Ícones intuitivos para cada etapa do processo
- Mudança automática da tabela baseada na seleção

**Funcionalidades:**
- Filtragem rápida por status de pedido
- Visualização do fluxo de trabalho completo
- Atualização da tabela em tempo real
- Título dinâmico indicando o status selecionado

## Seleção de Itens para Pedidos

&emsp;Durante o processo de revisão de pedidos, o farmacêutico pode selecionar quais itens foram corretamente separados.

<p style={{textAlign: 'center'}}>Figura 9 - Seleção de Itens na Revisão de Pedidos</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/selecao_itens_revisao.jpg").default} style={{width: 800}} alt="Seleção de Itens na Revisão" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Checkboxes para cada medicamento do pedido
- Todos os itens são pré-selecionados por padrão
- Informações detalhadas de cada medicamento
- Feedback visual do estado de seleção
- Botões para confirmar ou cancelar a revisão

**Funcionalidades:**
- Seleção/desseleção individual de itens
- Confirmação da revisão completa
- Status do pedido determinado pela seleção:
  - Todos os itens confirmados: Concluído com êxito (status 4)
  - Itens faltando/incorretos: Concluído com erros (status 5)
- Registro do usuário que realizou a revisão

&emsp;Esta interface permite uma revisão eficiente dos pedidos antes de sua dispensação final, garantindo a segurança do processo.

## Visualização de Detalhes

&emsp;O sistema oferece visualizações detalhadas para diversos elementos.

### Visualização de Detalhes de Medicamento

<p style={{textAlign: 'center'}}>Figura 10 - Visualização de Detalhes de Medicamento</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/detalhes_medicamento.jpg").default} style={{width: 800}} alt="Detalhes de Medicamento" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Modal com informações completas do medicamento e lote
- Organização clara em seções de informação
- Exibição de todos os dados cadastrados
- Informações do princípio ativo
- Detalhes específicos do lote (número, validade, fabricante, quantidade)
- Informações do QR Code

**Funcionalidades:**
- Acesso rápido através de botão "Visualizar" na tabela de estoque
- Fácil fechamento via botão de fechar ou clique fora do modal
- Visualização não editável para consulta segura

### Visualização de Detalhes de Prescrição

<p style={{textAlign: 'center'}}>Figura 11 - Visualização de Detalhes de Prescrição</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/detalhes_prescricao_completo.jpg").default} style={{width: 800}} alt="Detalhes de Prescrição" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Modal com informações completas da prescrição
- Organização em seções lógicas:
  - Dados do paciente
  - Informações da prescrição
  - Lista de medicamentos
  - Dados da avaliação
- Exibição de status com indicador visual colorido
- Tabela de medicamentos com informações detalhadas

**Funcionalidades:**
- Visualização completa da prescrição
- Botão para avaliar prescrição (se pendente)
- Interface adaptada conforme o status da prescrição

### Visualização de Detalhes de Pedido

<p style={{textAlign: 'center'}}>Figura 12 - Visualização de Detalhes de Pedido</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/detalhes_pedido.jpg").default} style={{width: 800}} alt="Detalhes de Pedido" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Características:**
- Modal com informações completas do pedido
- Seções organizadas para:
  - Dados do paciente
  - Informações do pedido
  - Status atual com indicador visual
  - Lista de medicamentos
  - Datas de cada etapa do processo
- Botões de ação específicos conforme o status

**Funcionalidades:**
- Visualização detalhada do pedido
- Botões adaptados ao status atual:
  - Pedidos aguardando: botão para iniciar separação
  - Pedidos em separação: botão para enviar para revisão
  - Pedidos em revisão: botão para concluir pedido
- Rastreabilidade completa do processo com datas e responsáveis

## Conclusão

&emsp;A abordagem adotada para visualização e seleção de elementos no sistema de gerenciamento de medicamentos destaca-se pela consistência, clareza e eficiência, proporcionando uma experiência de usuário otimizada para o ambiente de farmácia hospitalar.

### Pontos de destaque da interface:

1. **Consistência visual**: Padrões de design consistentes são aplicados em toda a interface, incluindo modais, botões de ação, cores indicativas de status e organização de informações. Essa consistência reduz a curva de aprendizado e aumenta a intuitividade do sistema.

2. **Hierarquia de informações**: Os elementos são organizados seguindo uma hierarquia clara, com informações mais relevantes destacadas e agrupamento lógico de dados relacionados. Essa estruturação facilita o escaneamento visual e a compreensão rápida das informações.

3. **Feedback visual**: O sistema fornece feedback visual constante sobre os elementos selecionados e ações realizadas, utilizando cores, ícones e alterações de estado para informar ao usuário sobre o status atual e possíveis próximas ações.

4. **Adaptabilidade contextual**: As interfaces se adaptam ao contexto de uso, apresentando apenas as opções e informações relevantes para cada situação específica. Botões, filtros e visualizações mudam dinamicamente conforme o contexto operacional.

5. **Suporte à decisão**: Os elementos selecionáveis e as visualizações detalhadas fornecem todas as informações necessárias para tomada de decisão segura pelos farmacêuticos e técnicos, contribuindo para a redução de erros no fluxo de medicamentos.

&emsp;A combinação desses elementos proporciona uma experiência fluida para os usuários, permitindo que farmacêuticos e técnicos naveguem eficientemente entre diferentes tarefas, visualizem informações críticas e realizem ações com segurança e confiabilidade. A estrutura visual claramente definida contribui significativamente para a eficiência operacional e para a segurança do paciente, garantindo que os medicamentos sejam gerenciados, avaliados e dispensados de forma precisa e controlada.