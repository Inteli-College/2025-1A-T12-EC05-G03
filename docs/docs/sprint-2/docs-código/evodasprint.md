---
sidebar_position: 3
custom_edit_url: null
---

# Evolução da sprint
### Documentação da evolução na sprint 2

## Conceito

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Um Log de Evolução é um registro detalhado das alterações, melhorias e correções realizadas em um projeto ao longo do tempo. Ele documenta as atualizações e traz uma descrição do que foi modificado. Esse log é essencial para manter a rastreabilidade do desenvolvimento, facilitar a comunicação entre a equipe e garantir que todas as partes interessadas tenham acesso ao histórico de evolução do projeto.

---

## Oganização dessa sprint

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nesta sprint, o grupo NDC realizou a divisão de tarefas com base em subgrupos. Considerando as ações desempenhadas na sprint anterior, os membros Ian Simão, Cecília Lima, Pablo Azevedo e Fernando Soares foram designados para o grupo de "programação".

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A partir dessa definição, o grupo estabeleceu a estratégia para sua evolução. Inicialmente, como ainda não estavam familiarizados com o robô, foi realizado um estudo preliminar para compreender seu funcionamento. Durante esse processo, foram explorados e desenvolvidos códigos, aplicando uma abordagem didática para facilitar a assimilação dos conceitos.

### Código de controle pelas teclas do teclado

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Para compreender o funcionamento do robô e suas limitações, foi utilizado um código que permitia seu controle por meio das teclas do teclado. A partir dessa abordagem, os membros do grupo realizaram testes para avaliar as capacidades do robô.

<p style={{textAlign: 'center'}}>Figura 1: Imagem do código de controle pelo teclado</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/codigo/codeteclado.png").default} style={{width: 800}} alt="Imagem para mostrar o código usado" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025). </p>

### Pandas e biblioteca do Pydobot para monitorar a psição do dobot

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Para monitorar a posição do robô e analisar seus deslocamentos, foi utilizado um código que permite a conexão com o dispositivo e o registro de suas coordenadas ao longo do tempo. A partir dessa abordagem, os membros do grupo puderam acompanhar as variações na posição do robô e armazenar os dados para futuras análises.

<p style={{textAlign: 'center'}}>Figura 2: Imagem do código do pandas+pydobot</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/codigo/codeposi.png").default} style={{width: 800}} alt="Imagem para mostrar o código usado" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025). </p>

## Desinvolvimento na sprint 2 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nesta sprint, o grupo avançou no desenvolvimento do sistema de automação, implementando a interface em linha de comando (CLI) para controlar o robô programaticamente. A equipe focou na integração da biblioteca Pydobot ao software, permitindo o envio e a execução de comandos básicos.

## Implementação da Interface CLI 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Foi iniciada a construção da interface de linha de comando (CLI), possibilitando que o usuário interaja com o robô sem a necessidade de uma interface gráfica. A CLI foi estruturada para receber comandos do usuário e enviá-los ao robô, garantindo o controle preciso de suas movimentações.

## Carregamento de Pontos Pré-definidos

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Para permitir a navegação automática do robô, foi desenvolvida a funcionalidade de carregamento de pontos pré-definidos a partir de um arquivo JSON. Essa funcionalidade possibilita que o usuário defina trajetórias antes da execução, facilitando testes e garantindo prever os movimentos.

## Testes e Ajustes na Comunicação com o Robô

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A equipe realizou diversos testes práticos para garantir que os comandos enviados via CLI fossem corretamente interpretados e executados pelo robô. Foram feitos ajustes na comunicação serial e na conversão das coordenadas para assegurar o funcionamento adequado do sistema.

## Próximos Passos

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Para a próxima sprint, já foi adiantada parte dos artefatos relacionados ao hardware vinculado ao processo de scan de QR Codes. Isso inclui a preparação e integração de componentes, bem como a validação inicial do funcionamento. Essas antecipações visam otimizar o tempo de desenvolvimento e reduzir possíveis impedimentos na próxima iteração.

## Conclusão

Durante esta sprint, a equipe avançou significativamente na compreensão e controle do robô, estabelecendo uma base sólida para os próximos desenvolvimentos. A implementação da interface CLI e a integração da biblioteca Pydobot demonstraram progresso na automação do sistema, permitindo um controle mais eficiente e flexível do robô. Além disso, a funcionalidade de carregamento de pontos pré-definidos reforça a capacidade de planejamento e execução de trajetórias.

      Os testes e ajustes realizados garantiram maior confiabilidade na comunicação entre o software e o hardware, contribuindo para a estabilidade do sistema. Com parte dos artefatos de hardware já adiantados para a próxima sprint, a equipe segue bem estruturada para continuar aprimorando a automação e iniciar a implementação da funcionalidade de scan de QR Codes. O progresso alcançado reflete o comprometimento do grupo e prepara o terreno para as próximas fases do desenvolvimento.

## Bibliografia

GitHub. pydobot: Python library for controlling Dobot Magician via serial interface. Disponível em: https://github.com/luismesas/pydobot. Acesso em: 19/02/2025.

PANDAS. Python Data Analysis Library. Disponível em: https://pandas.pydata.org/. Acesso em: 18/02/2025.