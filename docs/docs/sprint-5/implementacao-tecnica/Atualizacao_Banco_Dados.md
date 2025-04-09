---
sidebar_position: 6
custom_edit_url: null
---

# Atualizações do banco de dados

#### Atualizações do banco de dados

&emsp; Durante a Sprint 5, realizamos uma alteração na modelagem do banco de dados. Durante os testes de usabilidade apresentados na Sprint Review 4, identificamos que seria interessante incluir a dosagem do remédio, em miligramas (mg). Nesse contexto, adicionamos uma nova coluna à tabela `remedio`, chamada `dosagem_em_mg`, do tipo inteiro (int), possibilitando a exibição dessa informação no front-end.

&emsp; Dessa forma, segue a imagem da nossa nova modelagem do banco de dados:

<p style={{textAlign: 'center'}}>Figura 1: Modelagem do Banco de Dados - Sprint 5</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/modelagem_db_sprint5.png").default} style={{width: 800}} alt="Imagem da organização das tabelas no banco de dados na sprint 5." />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025).</p>

&emsp; Essa modificação reflete a evolução contínua do nosso sistema, baseada no feedback obtido durante os testes de usabilidade. A inclusão da dosagem em miligramas contribui para uma representação mais precisa dos medicamentos no sistema. Acreditamos que, com essa alteração, nosso MVP do banco de dados está completo.