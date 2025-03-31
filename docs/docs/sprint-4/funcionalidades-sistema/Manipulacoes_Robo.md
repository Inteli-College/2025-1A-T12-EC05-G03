---
sidebar_position: 3
custom_edit_url: null
---

# Manipulações do Robô através da Interface

## Definição

&emsp;A interface de manipulação do robô foi projetada como ponto central de interação entre os profissionais da farmácia hospitalar e o sistema de automação da separação de medicamentos. Considerando as necessidades específicas tanto do farmacêutico chefe Ismael Gonçalves quanto da técnica em farmácia Clara Boia, desenvolvemos uma interface intuitiva que permite o controle completo do processo de montagem da "Fita de Medicamentos".

## Modalidades de Operação

### Plataforma Web Integrada

&emsp;A plataforma web integrada ao sistema do robô permite que os usuários validem prescrições e acompanhem em tempo real o processo de separação de medicamentos. Este fluxo foi desenhado considerando as User Stories de ambas as personas, garantindo que as principais necessidades sejam atendidas:

- **Para Ismael (Farmacêutico Chefe)**: Permite aprovar, reprovar ou aprovar parcialmente prescrições, iniciando automaticamente o processo de separação para as prescrições aprovadas.
- **Para Clara (Técnica em Farmácia)**: Possibilita o acompanhamento do status dos pedidos em tempo real e a visualização de alertas sobre o andamento do processo.

&emsp;Durante a operação, o sistema envia notificações detalhadas sobre cada etapa do processo, incluindo a leitura do QR Code, verificação pelo sensor de distância TCRT5000 e confirmação da coleta do medicamento. Cada ação é registrada em logs que podem ser consultados posteriormente para fins de auditoria ou diagnóstico.

<p style={{textAlign: 'center'}}>Figura X: Interface da plataforma web para controle do robô</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/PlataformaWeb.png").default} style={{width: 800}} alt="Interface da plataforma web mostrando o painel de controle do robô" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

### Modo Manual de Operação

&emsp;Além da operação automatizada via prescrições, o sistema também conta com um modo manual que atende especialmente às necessidades identificadas nas User Stories 09 e 10 de Clara Boia (correção manual de pedidos com erro) e User Story 10 de Ismael Gonçalves (revisão e correção de separações).

&emsp;Neste modo, o usuário pode:

1. Selecionar diretamente os medicamentos pelo nome ou código
2. Confirmar a seleção via leitura de QR Code para garantir a segurança
3. Montar a fita de medicamentos sem depender do fluxo completo de prescrições

&emsp;O modo manual foi desenvolvido como uma alternativa para cenários específicos, como correções pontuais ou falhas na plataforma online, mantendo sempre os mesmos padrões de segurança do modo automático com a verificação dos QR Codes e leitura do sensor de distância.

<p style={{textAlign: 'center'}}>Figura X: Interface do modo manual para montagem da fita de medicamentos</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/tabela_cli.png").default} style={{width: 800}} alt="Interface do modo manual de operação do robô" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

## Tratamento de Erros e Segurança

&emsp;O sistema foi projetado com múltiplas camadas de segurança e tratamento de erros, conforme detalhado na documentação do "Funcionamento do Robô com Novos Periféricos". Os principais mecanismos incluem:

### Detecção e Notificação de Erros

&emsp;Quando um erro é detectado durante o processo de separação, o sistema:

1. Interrompe o processo imediatamente para evitar erros em cascata
2. Exibe uma notificação clara e concisa na interface, indicando o problema específico
3. Registra o erro nos logs do sistema para análise posterior

&emsp;Essa abordagem atende às necessidades expressas nas User Stories relacionadas a notificações (US 11 e 12 de Ismael e US 10 e 11 de Clara).

## Integração com o Fluxo de Trabalho

&emsp;A interface de manipulação do robô foi projetada para se integrar perfeitamente ao fluxo de trabalho da farmácia hospitalar, permitindo:

1. **Acesso aos logs detalhados**: Conforme a estrutura de dados apresentada nesta documentação, os usuários podem acessar logs completos de cada operação.
2. **Visualização do estoque**: Integração com a funcionalidade de gestão de estoque, permitindo verificar a disponibilidade de medicamentos.
3. **Controle de acesso**: Diferentes níveis de permissão baseados no cargo do usuário, como definido na modelagem do banco de dados.

&emsp;Esta integração garante que todas as User Stories relacionadas à revisão, acompanhamento e controle do processo sejam atendidas, tornando a interface uma ferramenta completa para a gestão da separação de medicamentos.

## Conclusão

&emsp;A interface de manipulação do robô representa um ponto crucial de interação entre os profissionais da farmácia e o sistema automatizado de separação de medicamentos. Ao atender às necessidades específicas tanto do farmacêutico chefe quanto da técnica em farmácia, o sistema garante maior eficiência, segurança e rastreabilidade no processo de montagem da Fita de Medicamentos, contribuindo diretamente para a melhoria do atendimento aos pacientes.