---
sidebar_position: 3
custom_edit_url: null
---

# Percalços do Projeto

&nbsp;&nbsp;&nbsp;&nbsp;Este tópico apresenta os principais desafios encontrados ao longo do desenvolvimento do projeto, bem como as estratégias adotadas para superá-los. O objetivo é fornecer uma visão transparente sobre o processo, destacando pontos de atenção que podem contribuir para otimizar futuras iniciativas em parceria.

## Integração com Equipamentos Físicos

&nbsp;&nbsp;&nbsp;&nbsp;Durante a implementação da solução, um dos principais desafios foi a integração entre o sistema digital desenvolvido e o manipulador robótico Magician Lite, junto com seus periféricos. Foram identificadas dificuldades relacionadas ao scanner de QR code, que se mostrou um componente temperamental; ao funcionamento de um dos componentes adicionados ao projeto como item extra (o sensor de distância), que parou de funcionar na última sprint; à calibração dos movimentos robóticos; e à comunicação do próprio Dobot com o backend. Para superar esses obstáculos, foi necessário realizar testes contínuos, reavaliar prioridades e desenvolver um protocolo de comunicação consistente entre o sistema e o robô, assegurando uma execução confiável das tarefas.

## Conformidade com os Procedimentos do Hospital

&nbsp;&nbsp;&nbsp;&nbsp;A aderência do sistema às necessidades da farmácia do Hospital de Clínicas da Unicamp representou um ponto de atenção ao longo do projeto. A separação e montagem da “fita de medicamentos” seguem protocolos específicos, com exigências relacionadas à rastreabilidade, padronização e controle de qualidade. O entendimento desses processos demandou uma análise detalhada das operações do hospital. Contudo, isso só ocorreu de maneira realmente confiável ao final da terceira semana, quando realizamos as entrevistas com os usuários. Com base nelas, ajustes foram feitos na arquitetura e nas funcionalidades do sistema, desta vez já com um entendimento concreto do projeto e de suas especificidades.

## Limitações de Tempo e Infraestrutura

&nbsp;&nbsp;&nbsp;&nbsp;O desenvolvimento da solução ocorreu em um período determinado e com pouco conhecimento sobre a infraestrutura hospitalar. O entendimento mais profundo do ambiente só foi possível após o acesso a um vídeo das operações. Uma interação presencial com o ambiente talvez tivesse trazido benefícios desde o início do projeto. A solução encontrada foi efetiva, mas talvez devesse ter ocorrido antes, possibilitando assim o desenvolvimento de uma solução feita sob medida para as necessidades do parceiro.

## Considerações Finais

&nbsp;&nbsp;&nbsp;&nbsp;Apesar dos desafios encontrados, a equipe conseguiu entregar uma solução funcional, segura e alinhada com os objetivos do projeto. Os aprendizados adquiridos ao longo do desenvolvimento contribuíram para o amadurecimento técnico da solução e servirão como base para melhorias futuras, como a ligação com a API já utilizada no hospital, além de reforçar boas práticas para novas colaborações.
