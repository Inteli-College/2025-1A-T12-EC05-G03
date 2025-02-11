---
sidebar_position: 1
custom_edit_url: null
---

# Arquitetura do Sistema

## Diagrama de Blocos
&nbsp;&nbsp;&nbsp;&nbsp; Os diagramas de bloco são representações gráficas que mostram o funcionamento de um sistema ou processo por meio de blocos conectados por linhas, sem detalhar componentes individuais<sup>[1](#foot1)</sup>. A ideia principal é simplificar a compreensão do funcionamento do sistema da nossa automatização, nesse contexto, segue o nosso diagrama de blocos:


<p style={{textAlign: 'center'}}>Figura X - Diagrama de Blocos da Arquitetura</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/diagrama_de_blocos.png").default} style={{width: 800}} alt="Diagrama de blocos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Descrição dos elementos do diagrama de blocos

#### Entradas

O fluxo do nosso sistema possui duas entradas: 
 - API: Responsável por conectar o sistema do hospital (HC) ao nosso sistema, assim trazendo as prescrições requeridas pelo médico
 - Front-end: Interface utiizada pelo farmacêutico para revisar e aprovar as prescrições

Assim, todas essas informações são enviadas para nosso back-end, onde fica toda nossa lógica e regras de negócio

#### Back-end
O back-end é responsável pela lógica de negócio e comunicação entre os diferentes módulos do sistema. Suas funções incluem:

- Processar e fazer o controle das prescrições recebidas via API e via front-end;
- Realizar consultas e atualizações no banco de dados, armazenando informações sobre prescrições, pacientes e medicamentos;
- Acionar o robô para a separação dos medicamentos conforme a prescrição aprovada.

#### Banco de Dados
O banco de dados armazena todas as informações para o funcionamento do sistema, como:

 - Prescrições a serem aprovadas
 - Prescrições aprovadas
 - Registro das "fita de medicamentos" feitas
 - Informações do paciente para rastreio

#### Robô
O Robô, do modelo Magician Lite, terá sua conexão via cabo usb com o servidor, assim após a aprovação do farmacêutico, o sistema aciona o robô para a separação dos medicamentos. Ele recebe as instruções processadas pelo back-end e executa os movimentos necessários para organizar as fitas de medicamentos destinadas às UTIs.

Com esse fluxo, o sistema garante o sucesso da automação, assim obtendo eficiência no gerenciamento de medicamentos para as UTIs.

# Bibliografia:

[1] SINCLAIR, Ian. Electronics Simplified. 3rd ed. Newnes, 2011. Disponível em: https://www.sciencedirect.com/book/9780080970639/electronics-simplified. Acesso em: 10 de fevereiro de 2025.<a name="foot1"></a>