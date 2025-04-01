---
sidebar_position: 2
custom_edit_url: null
---

# Funcionalidades Implementadas

Este documento detalha as principais funcionalidades implementadas no sistema de gerenciamento de medicamentos para farmácia hospitalar.

## Autenticação e Cadastro

### Login
O sistema possui uma tela de login que permite que apenas usuários autorizados acessem o sistema. Os usuários precisam informar e-mail e senha para autenticação.

<p style={{textAlign: 'center'}}>Figura 1 - Tela de Login</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/tela_login.jpg").default} style={{width: 800}} alt="Tela de Login" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**
- Validação de campos obrigatórios
- Link para recuperação de senha
- Redirecionamento para a página de cadastro

### Cadastro
A tela de cadastro permite que novos usuários se registrem no sistema.

<p style={{textAlign: 'center'}}>Figura 2 - Tela de Cadastro</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/tela_cadastro.jpg").default} style={{width: 800}} alt="Tela de Cadastro" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**
- Formulário com campos obrigatórios para novo usuário
- Seleção de cargo (Farmacêutico ou Técnico em Farmácia)
- Validação de confirmação de senha
- Verificação de e-mail já cadastrado
- Redirecionamento para login após cadastro bem-sucedido

## Página Inicial (Home)

A página inicial serve como dashboard principal do sistema, exibindo informações importantes e resumos de atividades que requerem atenção.

<p style={{textAlign: 'center'}}>Figura 3 - Página Inicial (Home)</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/home_page.png").default} style={{width: 800}} alt="Página Inicial" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**

### Painel de Prescrições
- Filtros por status: Aguardando Avaliação e Avaliadas
- Exibição de prescrições aguardando análise farmacêutica
- Contadores para cada categoria de prescrição
- Botões de ação para avaliar prescrições

### Painel de Pedidos
- Visualização do fluxo de trabalho dos pedidos
- Filtros por status (Aguardando Separação, Em Separação, Em Revisão, Concluído)
- Tabela detalhada de pedidos

### Modal de Avaliação de Prescrição
Permite ao farmacêutico avaliar medicamentos prescritos.

<p style={{textAlign: 'center'}}>Figura 4 - Modal de Avaliação de Prescrição</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/modal_avaliacao.png").default} style={{width: 800}} alt="Modal de Avaliação" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**
- Visualização dos dados do paciente
- Lista de medicamentos prescritos com checkboxes para aprovar/reprovar
- Botões para confirmar ou cancelar a avaliação
- Geração automática de pedido após avaliação

### Modal de Revisão de Pedido
Permite a revisão final dos pedidos antes da dispensação.

<p style={{textAlign: 'center'}}>Figura 5 - Modal de Revisão de Pedido</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/modal_revisao.png").default} style={{width: 800}} alt="Modal de Revisão" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**
- Exibição dos dados do pedido e paciente
- Lista de medicamentos com checkboxes para confirmar itens separados corretamente
- Confirmação da revisão com atualização automática do status

## Gerenciamento de Estoque

A página de estoque oferece funcionalidades completas para gerenciamento do inventário de medicamentos.

<p style={{textAlign: 'center'}}>Figura 6 - Página de Estoque</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/estoque.png").default} style={{width: 800}} alt="Página de Estoque" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**

### Visualização de Estoque
- Tabela de medicamentos em estoque com informações sobre:
  - Nome do medicamento
  - Número do lote
  - Quantidade disponível
  - Botão para detalhes do medicamento

### Cadastro de Medicamentos e Lotes
- Modal para cadastro de novos medicamentos (princípio ativo)
- Modal para cadastro de lotes com campos para:
  - Seleção do medicamento
  - Número do lote
  - Data de validade
  - Fabricante
  - Quantidade
  - QR Code

<p style={{textAlign: 'center'}}>Figura 7 - Modal de Cadastro de Lote</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/cadastro_lote.png").default} style={{width: 800}} alt="Cadastro de Lote" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Controle de Validade
- Destaque visual para medicamentos vencidos
- Alerta para medicamentos próximos a vencer
- Filtro para visualizar lotes vencidos ou próximos a vencer

### Filtros Avançados
- Busca por nome de medicamento ou número de lote
- Filtros por fabricante
- Filtros por quantidade (mínima e máxima)
- Filtros por status de validade

<p style={{textAlign: 'center'}}>Figura 8 - Modal de Filtros</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/modal_filtros_estoque.png").default} style={{width: 800}} alt="Filtros de Estoque" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Visualização Detalhada
- Modal com informações detalhadas do medicamento e lote
- Exibição de todas as informações cadastradas
- Suporte para visualização do QR Code

## Histórico de Prescrições

A página de histórico permite consultar todas as prescrições processadas no sistema.

<p style={{textAlign: 'center'}}>Figura 9 - Página de Histórico</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/historico.png").default} style={{width: 800}} alt="Página de Histórico" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**

### Visualização do Histórico
- Tabela com todas as prescrições registradas
- Informações sobre ID, paciente, HC, data de entrada e status
- Indicação visual do status da prescrição através de cores
- Botão para visualizar detalhes da prescrição

### Filtros de Prescrições
- Filtro por status da prescrição (Pendente, Avaliado, Rejeitado)
- Filtro por período (data inicial e final)
- Filtro por número HC

<p style={{textAlign: 'center'}}>Figura 10 - Modal de Filtros de Histórico</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/filtros_historico.png").default} style={{width: 800}} alt="Filtros de Histórico" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Detalhes da Prescrição
- Modal com informações completas sobre a prescrição
- Dados do paciente e da prescrição
- Lista de medicamentos prescritos com dosagem, frequência e via

<p style={{textAlign: 'center'}}>Figura 11 - Modal de Detalhes da Prescrição</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/detalhes_prescricao.png").default} style={{width: 800}} alt="Detalhes da Prescrição" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Notificações

O sistema dispõe de um sistema de notificações para manter os usuários informados sobre eventos importantes.

<p style={{textAlign: 'center'}}>Figura 12 - Painel de Notificações</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/notificacoes.png").default} style={{width: 400}} alt="Painel de Notificações" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

**Funcionalidades:**

### Exibição de Notificações
- Painel lateral com notificações recentes
- Indicação visual para notificações novas
- Exibição da data e hora da notificação

### Histórico de Notificações
- Modal com histórico completo de notificações
- Agrupamento de notificações por data

<p style={{textAlign: 'center'}}>Figura 13 - Histórico de Notificações</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/historico_notificacoes.png").default} style={{width: 800}} alt="Histórico de Notificações" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Tipos de Notificações
O sistema gera notificações automáticas para diversos eventos:
- Novas prescrições aguardando avaliação
- Prescrições avaliadas
- Novos pedidos criados
- Mudanças de status dos pedidos
- Conclusão de pedidos

## Conclusão

O sistema de gerenciamento de medicamentos apresenta uma interface completa, intuitiva e funcional para atender às necessidades específicas do ambiente de farmácia hospitalar. As funcionalidades implementadas cobrem o ciclo completo de processos relacionados ao fluxo de medicamentos:

1. **Ciclo do medicamento**: Desde o cadastro no estoque até a dispensação para o paciente, com controle de lotes e validade
2. **Ciclo da prescrição**: Da entrada da prescrição no sistema, passando pela avaliação farmacêutica, até a geração do pedido
3. **Ciclo do pedido**: Da criação automática, passando pela separação e revisão, até a conclusão e dispensação

O sistema apresenta um equilíbrio entre simplicidade de uso e robustez funcional, permitindo que os usuários gerenciem eficientemente o estoque de medicamentos e as prescrições médicas. A interface e os fluxos de trabalho bem definidos contribuem para a segurança do processo de dispensação de medicamentos, reduzindo riscos de erros e aumentando a produtividade da equipe de farmácia.

As notificações em tempo real e o sistema de histórico permitem acompanhamento constante das atividades, enquanto os controles de acesso garantem que apenas usuários autorizados possam realizar operações específicas. Essa combinação de funcionalidades torna o sistema uma ferramenta essencial para a gestão moderna de farmácias hospitalares, atendendo às exigências regulatórias e às melhores práticas do setor.
