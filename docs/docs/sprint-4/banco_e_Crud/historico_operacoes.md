---
sidebar_position: 3
custom_edit_url: null
---

# Histórico de Prescrições

&emsp;Todo o nosso sistema passa por funcionalidades vitais, mas uma das mais importantes é sem dúvidas o monitoramento do histórico de prescrições. Os arquivos `historico.html`, `historico.css` e `historico.js` compõem uma estrutura que, quando combinados, permitem ao usuário verificar prescrições passadas, seus status, pacientes e diversas outras informações relevantes para o acompanhamento médico eficiente.

## Como Desenvolvemos essa Funcionalidade

&emsp;A elaboração dessa feature foi relativamente direta. Baseamos nossa implementação nos conceitos que explicamos anteriormente na documentação sobre [Integração Backend-Frontend](../../sprint-4/funcionalidades-sistema/Integracao_Backend_Frontend.md). Seguindo essa abordagem, utilizamos JavaScript puro com manipulação de DOMs para construir uma interface dinâmica e responsiva. É importante ressaltar que nós escolhemos elaborar o front com HTML puro, o que deixou essa tarefa mais complexa, mas ainda mais interessante.

&emsp;Para conseguir carregar os dados históricos de forma eficiente, implementamos:

```javascript
async function carregarHistoricoPrescricoes() {
   try {
       const token = localStorage.getItem('access_token');
       const response = await fetch('http://127.0.0.1:5000/prescricoes/listar', // Futuramente implementaremos aqui o link da API que já se encontra hospedada no Render {
           method: 'GET',
           headers: { 
               'Authorization': `Bearer ${token}`,
               'Content-Type': 'application/json'
           }
       });

       if (!response.ok) {
           throw new Error('Falha ao carregar histórico');
       }

       const dados = await response.json();
       preencherTabelaHistorico(dados);
   } catch (error) {
       console.error('Erro:', error);
   }
}
```


&emsp;Esta função realiza uma requisição assíncrona à nossa API, utilizando o token de autenticação armazenado localmente para garantir acesso seguro aos dados. Após receber a resposta, os dados são processados e exibidos na tabela através da função preencherTabelaHistorico(). <br/>

## Estrutura Visual e Experiência do Usuário
No lado visual, construímos uma tabela responsiva que se adapta a diferentes tamanhos de tela, permitindo a visualização confortável tanto em desktops quanto em tablets utilizados por profissionais em movimento. Adicionamos indicadores visuais (através do CSS) para distinguir rapidamente o status de cada prescrição:

- Verde: Prescrições ativas
- Amarelo: Prescrições próximas ao vencimento
- Vermelho: Prescrições vencidas
- Cinza: Prescrições canceladas

## Integração com o Backend
&emsp;Essa tabela conta com o apoio direto da rota /prescricoes/listar, pensada justamente para que essa tela fosse possível. A rota retorna um JSON completo com todos os dados relevantes:
```
json[
  {
    "id": 1,
    "data_emissao": "2025-04-01",
    "paciente": "Fernando de Pablo Oliveira",
    "medico": "Claret Cecilia de Paiva",
    "status": "2",
    "medicamentos": [1, 2]
  },
]
```


Para facilitar a navegação entre grandes volumes de dados, implementamos também recursos de paginação e filtragem:

 ```
javascript
filtrarPorStatus(status) {
    const linhasTabela = document.querySelectorAll('#tabelaHistorico tbody tr');
    linhasTabela.forEach(linha => {
        const statusLinha = linha.querySelector('.status-prescricao').textContent;
        linha.style.display = (status === 'todos' || statusLinha === status) ? '' : 'none';
    });
}
```
## Próximos Passos e Melhorias
&emsp;A ideia é que essa tela se torne ainda mais versátil nas próximas iterações. Durante a próxima sprint, planejamos disponibilizar também:

- Visualização detalhada de logs de acesso e modificação
- Funcionalidade de exportação para PDF e Excel

&emsp;Essa funcionalidade, aparentemente simples, forma uma parte essencial do fluxo de trabalho dos profissionais de saúde, permitindo continuidade no tratamento e garantindo que nenhuma informação importante seja perdida entre consultas. Continuaremos aprimorando essa interface para torná-la ainda mais útil e eficiente para o parceiro.


## Bibliografia 

1. [MOZILLA DEVELOPER NETWORK. *Introdução ao DOM - APIs da Web*](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction). Acesso em: 28 mar. 2025.

2. [JAVASCRIPT PROGRESSIVO. *Objeto document: DOM em JavaScript (Modelo de Objeto de Documentos)*](https://www.javascriptprogressivo.net/2019/01/DOM-Modelo-Objeto-Documentos.html). Acesso em: 29 mar. 2025.

3. [DEVMEDIA. *Trabalhando com DOM em JavaScript*](https://www.devmedia.com.br/trabalhando-com-dom-em-javascript/29039). Acesso em: 31 mar. 2025.