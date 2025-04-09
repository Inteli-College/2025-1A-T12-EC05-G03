---
sidebar_position: 2
custom_edit_url: null
---

# Aprimorações no Front-end

#### Aprimorações no Front-end

# Documentação da Página Index - NDC System

## Introdução

A página index do NDC System foi desenvolvida como ponto de entrada para os usuários do sistema de automação farmacêutica hospitalar. O projeto já estava completamente desenvolvido, e criamos esta landing page para ser uma recepção acolhedora e informativa, apresentando o propósito e recursos do sistema.

## Estrutura da Página

A landing page inclui as seguintes seções:

### Hero Section

Apresenta o nome do sistema e call-to-action.

<p style={{textAlign: 'center'}}>Figura 3 - Hero Section</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/index1.png").default} style={{width: 800}} alt="Hero Section" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Quem Somos

Contextualiza o projeto acadêmico.

<p style={{textAlign: 'center'}}>Figura 4 - Seção Quem Somos</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/index2.png").default} style={{width: 800}} alt="Seção Quem Somos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Features

Apresenta os principais componentes tecnológicos:
- Manipuladores robóticos
- Sensores inteligentes
- Sistema digital de controle

<p style={{textAlign: 'center'}}>Figura 5 - Seção de Features</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/index3.png").default} style={{width: 800}} alt="Seção de Features" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Comparativo

Contrasta o processo tradicional com a solução automatizada.

<p style={{textAlign: 'center'}}>Figura 6 - Seção de Comparativo</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/index4.png").default} style={{width: 800}} alt="Seção de Comparativo" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Nossa Equipe

Apresenta os membros responsáveis pelo desenvolvimento.

<p style={{textAlign: 'center'}}>Figura 7 - Seção de Equipe</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/index5.png").default} style={{width: 800}} alt="Seção de Equipe" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


## Conclusão

A página index do NDC System serve como porta de entrada atrativa para o sistema já desenvolvido de automação farmacêutica. Ela cumpre o objetivo de comunicar claramente o propósito e benefícios da solução, além de fornecer um acesso fácil ao sistema através dos botões de login.

# Documentação do Guia de Usuário para o Sistema de Gerenciamento de Remédios

## 1. Introdução

A implementação de um guia interativo de usuário é fundamental para sistemas com múltiplas funcionalidades, como nosso Sistema de Gerenciamento de Remédios. Esse tipo de guia contextual tem dois objetivos principais:

1. Proporcionar uma experiência de primeiro acesso mais amigável, onde o usuário é apresentado gradualmente às principais funcionalidades do sistema.
2. Oferecer um mecanismo de ajuda permanente através de um botão de acesso rápido, permitindo que usuários consultem instruções específicas a qualquer momento.

Um onboarding interativo reduz significativamente o tempo de adaptação e aumentam a satisfação do usuário, especialmente em aplicações com fluxos de trabalho complexos. Em um ambiente hospitalar ou farmacêutico, onde a precisão é um ponto a ser considerado, ter um guia sempre disponível também diminui a ocorrência de erros operacionais.

Nosso sistema implementa um guia baseado em "balões" (tooltips) que aparecem em sequência lógica, destacando cada elemento da interface e explicando sua função, com opções para navegar entre as instruções ou pular o tutorial.

<p style={{textAlign: 'center'}}>Figura 1 - Botão de Ajuda do Sistema</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/botao-ajuda.png").default} style={{width: 800}} alt="Botão de Ajuda" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## 2. Desenvolvimento

O guia de usuário foi implementado através da criação de dois novos arquivos (`guia-usuario.css` e `guia-usuario.js`) e da modificação do arquivo principal (`home-page.html`). Vamos analisar cada componente do guia:

### 2.1. Tour de Boas-vindas no Primeiro Acesso

Quando o usuário acessa o sistema pela primeira vez, o guia é iniciado automaticamente, apresentando uma série de balões informativos em sequência. O primeiro balão destaca o menu lateral.

<p style={{textAlign: 'center'}}>Figura 2 - Primeiro Passo do Guia: Menu Principal</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/guia-menu-principal.png").default} style={{width: 800}} alt="Guia Menu Principal" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### 2.2. Navegação Entre os Passos do Guia

Cada balão informativo possui botões de navegação que permitem ao usuário avançar para o próximo item ou pular o tutorial. O elemento atual sendo explicado é destacado visualmente com um efeito de pulsação e o restante da interface é escurecido.

<p style={{textAlign: 'center'}}>Figura 3 - Navegação Entre Passos do Guia</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/navegacao-guia.png").default} style={{width: 800}} alt="Navegação Entre Passos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### 2.3. Explicação do Menu de Navegação

O guia explica cada item do menu lateral, destacando sua função específica:

#### 2.3.1. Home

<p style={{textAlign: 'center'}}>Figura 4 - Explicação do Menu Home</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/menu-home.png").default} style={{width: 800}} alt="Menu Home" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### 2.3.2. Estoque

<p style={{textAlign: 'center'}}>Figura 5 - Explicação do Menu Estoque</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/menu-estoque.png").default} style={{width: 800}} alt="Menu Estoque" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### 2.3.3. Histórico

<p style={{textAlign: 'center'}}>Figura 6 - Explicação do Menu Histórico</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/menu-historico.png").default} style={{width: 800}} alt="Menu Histórico" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### 2.3.4. Logs

<p style={{textAlign: 'center'}}>Figura 7 - Explicação do Menu Logs</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/menu-logs.png").default} style={{width: 800}} alt="Menu Logs" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### 2.4. Explicação da Seção de Prescrições

O guia explica a seção principal de prescrições, destacando os diferentes filtros e funcionalidades disponíveis:

<p style={{textAlign: 'center'}}>Figura 8 - Explicação da Seção de Prescrições</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/secao-prescricoes.png").default} style={{width: 800}} alt="Seção de Prescrições" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### 2.4.1. Filtros de Prescrições

<p style={{textAlign: 'center'}}>Figura 9 - Explicação dos Filtros de Prescrições</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/filtros-prescricoes.png").default} style={{width: 800}} alt="Filtros de Prescrições" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### 2.5. Explicação da Seção de Pedidos

<p style={{textAlign: 'center'}}>Figura 10 - Explicação da Seção de Pedidos</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/secao-pedidos.png").default} style={{width: 800}} alt="Seção de Pedidos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### 2.6. Explicação do Painel de Notificações

<p style={{textAlign: 'center'}}>Figura 11 - Explicação do Painel de Notificações</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/painel-notificacoes.png").default} style={{width: 800}} alt="Painel de Notificações" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### 2.7. Botão de Ajuda Permanente

Após completar o tour ou em qualquer acesso posterior, o usuário pode acessar o guia a qualquer momento através do botão de ajuda fixo no canto inferior direito da tela.

<p style={{textAlign: 'center'}}>Figura 12 - Botão de Ajuda Permanente</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/botao-ajuda.png").default} style={{width: 800}} alt="Botão de Ajuda Permanente" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## 3. Arquivos Criados e Modificados

### 3.1. Arquivos Novos

#### 3.1.1. guia-usuario.css

Este arquivo contém todos os estilos necessários para o funcionamento do guia do usuário, incluindo:
- Estilos para os balões informativos (tooltips)
- Efeitos visuais para destacar elementos
- Estilos para o botão de ajuda permanente
- Animações para tornar a experiência mais fluida
- Estilos responsivos para diferentes tamanhos de tela

O CSS foi desenvolvido seguindo o padrão de cores e estilos já existentes na aplicação, mantendo a consistência visual.

#### 3.1.2. guia-usuario.js

Este arquivo contém toda a lógica de funcionamento do guia, incluindo:
- Definição dos passos do guia com respectivos elementos, posições e conteúdos
- Funções para inicializar e controlar o guia
- Gerenciamento do estado do guia (primeiro acesso vs. acessos subsequentes)
- Lógica para destacar elementos e posicionar os balões informativos
- Funções para criação e manipulação de elementos DOM
- Gerenciamento de eventos de clique e navegação

O script utiliza armazenamento local (localStorage) para manter a preferência do usuário entre sessões, garantindo que o guia automático apareça apenas no primeiro acesso.

### 3.2. Arquivo Modificado

#### 3.2.1. home-page.html

O arquivo HTML principal foi modificado para:
- Incluir links para os novos arquivos CSS e JavaScript
- Adicionar o modal do guia de usuário com opções para diferentes tipos de guia
- Integrar o guia com a estrutura existente

## 4. Conclusão

A implementação do guia de usuário interativo representa uma melhoria significativa na experiência de uso do Sistema de Gerenciamento de Remédios. Oferecendo orientações contextuais no primeiro acesso e mantendo um botão de ajuda permanentemente disponível, o sistema torna-se mais acessível e intuitivo para novos usuários, ao mesmo tempo que oferece suporte contínuo para usuários experientes.

Este tipo de assistência interativa é especialmente importante em sistemas críticos como gerenciamento de medicamentos, onde erros podem ter consequências sérias. O guia não apenas acelera o aprendizado, mas também ajuda a prevenir erros operacionais, aumentando a confiabilidade geral do sistema.

A arquitetura modular adotada (separando CSS, JavaScript e HTML) facilita a manutenção e eventuais atualizações no guia, permitindo que ele evolua junto com o restante da aplicação. A responsividade implementada no design garante que o guia funcione adequadamente em diferentes dispositivos e tamanhos de tela.

Como desenvolvimentos futuros, pode-se considerar a ampliação do guia para incluir instruções mais detalhadas sobre processos específicos, como avaliação de prescrições ou gerenciamento de estoque, potencialmente com tutoriais em vídeo ou simulações interativas.