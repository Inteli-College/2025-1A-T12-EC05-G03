---
sidebar_position: 4
custom_edit_url: null
---

# Acesso às Funcionalidades do Sistema

## Introdução

&emsp;Este documento apresenta um guia completo sobre como acessar e utilizar as principais funcionalidades do sistema de automação da Fita de Medicamentos. O sistema foi desenvolvido para atender às necessidades específicas dos profissionais da farmácia hospitalar, permitindo a gestão eficiente de prescrições, pedidos, estoque de medicamentos e operação do robô separador.

## Acesso ao Sistema

### Login e Autenticação

&emsp;Para acessar o sistema, o usuário deve seguir os passos abaixo:

1. Abra o navegador e acesse a URL: `https://two025-1a-t12-ec05-g03.onrender.com/`
2. Na tela de login, insira seu e-mail e senha cadastrados
3. Clique no botão "Entrar"

<p style={{textAlign: 'center'}}>Figura X: Tela de login do sistema</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/telaLogin.png").default} style={{width: 800}} alt="Tela de login do sistema" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Navegação Principal

&emsp;Após o login bem-sucedido, você será redirecionado para a página inicial (Home) do sistema. A interface está organizada da seguinte forma:

### Menu Lateral

&emsp;O menu lateral contém os seguintes itens:

- **Home**: Visão geral das prescrições e pedidos em andamento
- **Estoque**: Gestão do estoque de medicamentos
- **Histórico**: Consulta ao histórico de prescrições e pedidos

## Módulo de Prescrições

&emsp;Este módulo permite a gestão completa das prescrições médicas, desde o recebimento até a aprovação ou rejeição.

### Visualização de Prescrições Pendentes

1. Acesse a parte de "Prescrições" no Home
2. Procure por "Aguardando avaliação"
3. Você verá uma lista de todas as prescrições pendentes de avaliação

### Avaliação de Prescrições

1. Na lista de prescrições pendentes, clique no botão "Avaliar" na prescrição desejada
2. Revise os detalhes da prescrição, incluindo:
   - Dados do paciente
   - Medicamentos solicitados (princípio ativo, dosagem)
   - Médico responsável
3. Você pode aprovar ou não uma prescrição:
   - **Todos os medicamentos selecionados**: Aprova todos os medicamentos da prescrição
   - **Ao retirar a seleção de alguns medicamentos**: Permite selecionar quais medicamentos serão aprovados
   - **Reprovar**: Rejeita completamente a prescrição

4. Clique em "Confirmar" para finalizar a avaliação

<p style={{textAlign: 'center'}}>Figura X: Tela de avaliação de prescrições</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/PlataformaWeb.png").default} style={{width: 800}} alt="Tela de avaliação de prescrições" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Histórico de Prescrições

<p style={{textAlign: 'center'}}>Figura X: Tela de histórico de prescrições</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/telaHistorico.png").default} style={{width: 800}} alt="Tela de histórico de prescrições" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

1. Acesse o "Histórico" no painel lateral
2. Utilize os filtros disponíveis para refinar sua busca:
   - Status (Pendente, Avaliado ou Rejeitado)
   - Data
   - Paciente (HC)
4. Clique em "Visualizar" para visualizar informações completas sobre a prescrição selecionada

### Acompanhamento de Pedidos em Andamento

1. Acesse o menu "Home" no painel lateral
2. Visualize os pedidos organizados por status:
   - **Aguardando Separação**: Pedidos aprovados aguardando início da separação
   - **Em Separação**: Pedidos sendo processados pelo robô
   - **Em Revisão**: Pedidos que requerem revisão manual
   - **Concluído**: Pedidos finalizados e prontos para entrega

### Iniciando a Separação de Pedidos

1. Na lista de pedidos "Aguardando Avaliação", clique no botão "Avaliar prescrição" no pedido desejado
2. O sistema enviará o pedido para o robô e atualizará o status para "Em Separação" 
## Módulo de Estoque

&emsp;Este módulo permite o gerenciamento completo do estoque de medicamentos.

### Visualização do Estoque

1. Acesse o menu "Estoque" no painel lateral
2. Visualize a lista completa de medicamentos disponíveis
3. Utilize os filtros ou a barra de pesquisa para localizar medicamentos específicos

<p style={{textAlign: 'center'}}>Figura X: Tela de estoque</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/telaEstoque.png").default} style={{width: 800}} alt="Tela de estoque" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Cadastro de Novos Medicamentos

1. Na tela de Estoque, clique no botão "Cadastrar Medicamento"
2. Adicione o nome do princípio ativo do medicamento
3. Clique em Cadastrar Lote
4. Preencha os campos obrigatórios:
   - Princípio ativo
   - Fabricante
   - Número do lote
   - Quantidade
   - Data de validade
   - QR Code do bin (local de armazenamento)
5. Clique em "Confirmar" para concluir o cadastro

### Remoção de Medicamentos

1. Clique em "Retirar Medicamento"
2. Na lista de medicamentos, localize o item desejado e lote
3. Clique no botão "Confirmar"
4. Confirme a ação na janela de diálogo que será exibida
## Controle do Robô

&emsp;O sistema permite o controle e monitoramento do robô separador de medicamentos.

### Modo Automático

&emsp;O modo automático é ativado automaticamente quando um pedido entra em separação. Durante este processo:

1. O robô segue a sequência de medicamentos definida no pedido
2. Realiza a leitura do QR Code para identificação do medicamento
3. Utiliza o sensor de distância para confirmar a coleta e entrega do medicamento
4. Atualiza o status do pedido em tempo real na interface

## Notificações e Alertas

&emsp;O sistema fornece notificações e alertas importantes para os usuários.

### Acesso às Notificações

1. Clique em Home na barra lateral
2. Visualize a lista de notificações recentes
3. Clique em ver histórico completo para ver todas as notificações

### Notificação

- **Validade Próxima**: Avisa sobre medicamentos próximos à data de vencimento

<p style={{textAlign: 'center'}}>Figura X: Painel de notificações do sistema</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/telaNotificacoes.png").default} style={{width: 800}} alt="Painel de notificações do sistema" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Conclusão

&emsp;Este documento fornece um guia completo para acessar e utilizar todas as funcionalidades disponíveis no sistema de automação da Fita de Medicamentos. O sistema foi projetado para ser intuitivo e eficiente, atendendo às necessidades específicas dos profissionais da farmácia hospitalar e garantindo maior segurança e rastreabilidade no processo de separação de medicamentos.