---
sidebar_position: 2
custom_edit_url: null
---

# Personas

## Conceito

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nesta seção, vamos expor as principais personas criadas para representar o dia-dia na farmácia do **hospital da UNICAMP**. Acredita-se que o termo persona se refira à um personagem representativo de um determinado tipo social, profissional e neste caso público alvo.
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Têm-se como principais personas Clara Boia e Isamel Gonçalves, a principal procupação foi selecionar pessoas que estão no contexto de farmácia e principalmente que participam da cadeia de separação de medicamentos e seleção de receitas, posteriormente serão descritas as atividades destes usuários para a produção de seu ofício e então os aspectos pensados para o sistema de automação.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Abaixo está descrita a persona que representa os enfermeiros no nosso contexto de projeto:

<p style={{textAlign: 'center'}}>Figura X: Persona Ismael Gonçalves - Enfermeiro</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/personas/ismaelgoncalves_persona.png").default} style={{width: 800}} alt="Imagem informativa de Ismael e suas informações dispostas nas colunas." />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025). </p>

| **Comportamentos**                                                     | **Necessidades**                                            | **Dores**                                                                                                                                                             |
|------------------------------------------------------------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Faz trabalhos repetitivos para organizar a farmácia.                   | Centralização das informações de medicamentos e pedidos.    | Sofre com a dificuldade na separação manual dos medicamentos, correndo o risco constante de separá-los de forma equivocada.                                             |
| Valida receitas feitas por médicos e enviadas a ele.                   | Facilidade na separação das medicações.                     | A contagem diária manual dos medicamentos psicotrópicos dificulta a validação e compromete a segurança do processo.                                                      |
| Cuida do armazenamento e segurança de psicotrópicos.                   | Segurança no armazenamento de psicotrópicos.                | Possui dificuldade em verificar a validade dos insumos no estoque, já que estas informações não estão cadastradas no sistema, gerando preocupação constante.         |

Esta tabela resume os principais pontos relacionados às atividades, necessidades e desafios enfrentados.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Abaixo está descrita a persona que representa a técnica de enfermagem. 

<p style={{textAlign: 'center'}}>Figura X: Persona Clara Boia - Ténica</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/personas/claraboia_persona.png").default} style={{width: 800}} alt="Imagem informativa de Clara e suas informações dispostas nas colunas." />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025). </p>

| **Comportamentos**                                                                                           | **Necessidades**                                                                                         | **Dores**                                                                                                                           |
|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Segue rigorosamente os protocolos médicos na administração de medicamentos.                                  | Um sistema eficiente para registrar e monitorar a administração de medicamentos.                         | Enfrenta dificuldades ao conferir manualmente a prescrição e os horários de medicação dos pacientes.                               |
| Atende pacientes com empatia e rapidez, garantindo seu bem-estar.                                            | Facilidade no acesso às informações sobre dosagens e horários de medicação.                              | Trabalha sob alta pressão, lidando com múltiplos pacientes e diferentes necessidades ao mesmo tempo.                              |
| Preza pela organização dos insumos médicos para facilitar o atendimento.                                     | Alertas automáticos para evitar atrasos ou erros na administração dos medicamentos.                      | Precisa de um sistema ágil e confiável para evitar erros na administração dos medicamentos.                                       |

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Com base nessas personas nosso projeto será estruturado tendo em vista as necessidades e dores de cada persona.