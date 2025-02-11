---
sidebar_position: 1
custom_edit_url: null
---

# Arquitetura do Sistema

## Diagrama de Blocos
&nbsp;&nbsp;&nbsp;&nbsp; Os diagramas de bloco são representações gráficas que mostram o funcionamento de um sistema ou processo por meio de blocos conectados por linhas, sem detalhar componentes individuais<sup>[1](#foot1)</sup>. A ideia principal é simplificar a compreensão do funcionamento do sistema da nossa automatização, nesse contexto, segue o nosso diagrama de blocos:


<p style={{textAlign: 'center'}}>Figura - Diagrama de Blocos da Arquitetura</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../media/diagrama_de_blocos.png").default} style={{width: 800}} alt="Diagrama de blocos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Descrição dos elementos do diagrama de blocos

O fluxo do nosso sistema possui duas entradas: uma via API, que recebe prescrições do sistema do hospital, e outra via front-end, utilizada pelo farmacêutico para revisar e aprovar as prescrições.

Uma vez dentro do sistema, as informações são processadas pelo back-end, que gerencia toda a lógica e regras de negócio. Ele também se comunica com o banco de dados para armazenar, consultar e atualizar informações sobre as prescrições e pacientes.

Após a aprovação, o back-end aciona o robô, que executa a separação dos medicamentos de acordo com a prescrição recebida, garantindo que as "fitas de medicamentos" sejam organizados para envio às UTIs.

# Bibliografia:

[1] SINCLAIR, Ian. Electronics Simplified. 3rd ed. Newnes, 2011. Disponível em: https://www.sciencedirect.com/book/9780080970639/electronics-simplified. Acesso em: 10 de fevereiro de 2025.<a name="foot1"></a>