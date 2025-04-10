---
sidebar_position: 1
custom_edit_url: null
---

# Arquitetura do Sistema

## Diagrama de Blocos

&nbsp;&nbsp;&nbsp;&nbsp; A arquitetura desenvolvida para o sistema de automação hospitalar foi pensada para garantir escalabilidade, modularidade e integração eficiente entre os diferentes componentes. Validamos a proposta inicial e a mantivemos como estrutura final, considerando sua aderência aos requisitos do projeto.

&nbsp;&nbsp;&nbsp;&nbsp; O diagrama de blocos a seguir apresenta de forma clara e objetiva a organização do sistema, destacando as conexões entre os módulos essenciais e facilitando a visualização do fluxo de informações ao longo do processo de prescrição e dispensação de medicamentos:

<p style={{textAlign: 'center'}}>Figura 1 - Diagrama de Blocos da Arquitetura</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/diagrama_de_blocos.png").default} style={{width: 800}} alt="Diagrama de blocos" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Componentes da Arquitetura

#### Entradas

O sistema conta com duas principais entradas de dados:

- **API**: Responsável por integrar o sistema hospitalar (HC) ao nosso backend, permitindo a importação das prescrições realizadas por médicos.
- **Front-end**: Interface utilizada pelos farmacêuticos para revisar, aprovar prescrições, realizar o controle de estoque dos remédios, assim garantindo maior controle e segurança no processo.

Ambas as entradas se juntam no back-end, onde é realizada a validação e o processamento das informações recebidas.

#### Back-end

O back-end atua como núcleo lógico do sistema, sendo responsável por:

- Controlar e processar prescrições provenientes da API e do front-end;
- Realizar controle de estoque de remédios;
- Realizar transações com o banco de dados, armazenando e atualizando informações relevantes;
- Enviar comandos ao robô para que este execute a separação física dos medicamentos conforme as prescrições aprovadas.

#### Banco de Dados

O banco de dados centraliza as informações necessárias para o funcionamento do sistema, incluindo:

- Prescrições pendentes e aprovadas;
- Registros das fitas de medicamentos organizadas;
- Registros do estoque de remédios;
- Informações de pacientes para rastreabilidade e histórico.

#### Robô

O robô utilizado é o **Magician Lite**, conectado via USB ao servidor. Após a aprovação da prescrição pelo farmacêutico, o sistema envia os comandos necessários ao robô, que realiza a separação dos medicamentos de forma automatizada e precisa, garantindo a conformidade com os dados processados.

Esse fluxo, já testado e validado, reforça a eficiência e a segurança do sistema na gestão de medicamentos destinados às UTIs hospitalares.

## Referência

[1] SINCLAIR, Ian. *Electronics Simplified*. 3rd ed. Newnes, 2011. Disponível em: https://www.sciencedirect.com/book/9780080970639/electronics-simplified. Acesso em: 10 de fevereiro de 2025.
