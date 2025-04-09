---
sidebar_position: 7
custom_edit_url: null
---

# Atualizações do front-end

### Atualizações do front-end

&emsp;Durante a Sprint 5, realizamos diversas alterações no front-end com base nos feedbacks coletados durante o teste de usabilidade, ocorrido na review da Sprint 4. A seguir, detalhamos as melhorias implementadas:

#### Implementação da dosagem de remédios na home page
&emsp;Anteriormente, a dosagem de cada medicamento não era exibida na home page. Agora, essa informação está visível em todas as seções onde são mencionados medicamentos.

<p style={{textAlign: 'center'}}>Figura 1 - Dosagem de medicamento no detalhes da prescrição</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/mostrar_dosagem_sprint5.png").default} style={{width: 600}} alt="Mostra detalhes da prescrição na home page, com a feature de dosagem do medicamento" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### Implementação da dosagem de remédios no controle de estoque
&emsp;A dosagem também foi adicionada à página de controle de estoque. Antes, essa informação não era apresentada; agora, está disponível em todas as seções relevantes.

<p style={{textAlign: 'center'}}>Figura 2 - Dosagem de medicamento no controle de estoque</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/dosagem_em_estoque_geral.png").default} style={{width: 800}} alt="Mostra a página de controle de estoque com dosagem" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>


#### Implementação da dosagem de remédios na criação do remédio
&emsp;Na página de criação de medicamentos, anteriormente não era possível inserir a dosagem no momento do cadastro. Essa funcionalidade foi desenvolvida e integrada nesta Sprint 5.

<p style={{textAlign: 'center'}}>Figura 3 - Dosagem de medicamento na aba de criar medicamentos</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/dosagem_em_criar_medicamento.png").default} style={{width: 800}} alt="Mostra a página de criar medicamento com a dosagem como slote possível" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### Implementação da aba de notificações funcional na home page
&emsp;A aba de notificações, anteriormente apenas mockada, foi totalmente integrada ao back-end nesta sprint. Agora, ela exibe dinamicamente dois tipos de alerta:
 - Lotes com validade próxima;
 - Lotes com menos de 10 unidades disponíveis.

<p style={{textAlign: 'center'}}>Figura 4 - Aba de notificações funcional na home page</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/notificacoes_sprint5.png").default} style={{width: 400}} alt="Mostra as notificações na homepage estando funcional" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### Implementação da página de histórico dos logs
&emsp;Nesta sprint, também foi desenvolvida uma nova página dedicada ao histórico de logs. Nela, é possível visualizar todos os registros de ações do robô, proporcionando maior rastreabilidade ao sistema.

<p style={{textAlign: 'center'}}>Figura 5 - Página de histórico de logs</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/historico_logs.png").default} style={{width: 800}} alt="Página de histórico de logs" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

#### Conclusão:

&emsp;As atualizações realizadas nesta sprint contribuíram para a melhoria da usabilidade e da eficiência do sistema, tornando-o mais completo, funcional e alinhado às necessidades dos usuários, permitindo assim que atingíssemos o nosso MVP.