---
sidebar_position: 1
custom_edit_url: null
---

# Modelagem do Banco de Dados

## Conceito

&emsp;A modelagem de banco de dados pode ser definida como o processo de criar uma representação visual e lógica dos dados que serão armazenados e manipulados dentro do nosso sistema. Assim, a organização das informações e a definição das relações entre as tabelas são facilitadas, auxiliando no desenvolvimento das rotas.

## Nossa Modelagem

&emsp;O banco de dados foi projetado com base no ciclo completo de gestão de medicamentos hospitalares, abrangendo desde a criação da prescrição até a finalização do pedido e a entrega ao paciente. A modelagem considera entidades essenciais, relacionamentos bem definidos e tabelas de apoio para manter a rastreabilidade e a integridade das informações. Nosso banco de dados está hospedado na plataforma Render, que permite uma alta disponibilidade e escalabilidade contínua com a API. A imagem a seguir demonstra a estrutura e conexões das tabelas que utilizamos:


<p style={{textAlign: 'center'}}>Figura 1: Modelagem do Banco de Dados</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/modelagemBD.png").default} style={{width: 800}} alt="Imagem da organização das tabelas no banco de dados." />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025).</p>

&emsp;Conforme demonstrado na imagem, nosso projeto contempla as tabelas de paciente, prescrição, pedido, log, remedio, user, cargo, statusPedido, statusPrescricao e codigo_log. Cada tabela complementa o projeto com um objetivo diferente, que são:

- **Tabela paciente**: Armazena os dados dos pacientes, como nome, idade, documentos e informações do leito hospitalar. Essa tabela é a base para vincular as prescrições solicitadas pelos medicos.

- **Tabela prescricao**: Registra as prescrições que são enviadas pelos médicos, incluindo a lista de medicamentos, status da prescrição e informações do usuário que fez a avaliação. Com o status da prescrição como aprovada, a prescrição automáticamente se torna um pedido para que o processo de separação dos remédios realmente aconteça.

- **Tabela pedido**: É responsável por rastrear os pedidos gerados a partir das prescrições que são aprovadas. Com o pedido criado, o processo de separação dos remédios pode ser iniciada pelo robô. A tabela controla o status do pedido, datas de entrada/finalização e o usuário que revisou a separação.

- **Tabela log**: Mantém um histórico detalhado de todas as ações que são realizadas no sistema, como mudanças de status ou falhas durante o processo. Cada log é vinculado a um pedido e a um código de evento específico.

- **Tabela lote**: Gerencia os lotes de medicamentos, incluindo número de lote, validade, fabricante e quantidade disponível. Essa tabela auxilia no controle dos medicamentos em estoque.

- **Tabela remedio**: Armazena os dados dos medicamentos, como princípio ativo e QR code associado. A API usa essa tabela para identificar e validar os remédios durante a separação.

- **Tabela user**: Registra os usuários do sistema, incluindo e-mail, nome completo, senha e o cargo associado. A gestão de permissões é feita com base nesta tabela pelo código de autenticação gerado com a permissão de usuário.

- **Tabela cargo**: Define os tipos de cargos disponíveis, como farmacêutico(a) e técnico(a) em farmácia. Isso permite restringir ou liberar funcionalidades específicas conforme o papel do usuário dentro do sistema.

- **Tabela statusPedido**: Supervisiona os diferentes estados de um pedido, como "Aguardando separação", "Em revisão" e "Concluído". Auxilia diretamente na gestão dos pedidos para que possa chegar ao paciente da maneira correta.

- **Tabela statusPrescricao**: Define os status possíveis de uma prescrição, como "Aprovada total", "Parcial" ou "Reprovada". Isso garante que só prescrições válidas se tornem pedidos criados que estão prontos para a separação.

- **Tabela codigo_log**: Armazena códigos de eventos para rastreamento, como sucessos ou falhas durante a separação automatizada (ex: QR code inválido ou erro mecânico).

&emsp;Portanto, com essa estrutura e lógica aplicada na modelagem do banco de dados, conseguimos ter controlar a segurança e rastreabilidade do processo de separação de medicamentos hospitalares dentro do projeto. Com cada entidade e realçao definida, conseguimos desenvolver rotas eficientes para conexão com o robô e refletimos o fluxo de trabalho real dentro do ambiente do parceiro.


