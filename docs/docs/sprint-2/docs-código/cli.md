---
sidebar_position: 3
custom_edit_url: null
---

# CLI - Interface de Linha de Comando

### O que é uma CLI?

&emsp;CLI (Command Line Interface) é uma interface de linha de comando que permite interação com um sistema operacional ou software por meio de comandos digitados no terminal. Diferente de interfaces gráficas (GUI), onde o usuário interage com botões ou menus gráficos, a CLI é restrita aos comandos digitados no terminal.<br />
&emsp;É amplamente usado para administração de sistemas, automação de tarefas e execução de programas. Alguns exemplos populares incluem o Bash (Linux/macOS), o Prompt de Comando (Windows) e ferramentas como Git e Docker.<br />
&emsp;Para o projeto, desenvolvemos uma CLI para facilitar o primeiro contato do usuário com o braço mecânico Dobot. Assim, mesmo sem uma interface gráfica avançada, é possível realizar os primeiros testes com o robô de forma simples e sem complicações.




### Bibliotecas utilizadas no CLI  
- **`typer`** – Facilita a criação de CLIs com Python, fornecendo uma estrutura baseada em `click`, com suporte para argumentos, opções e ajuda automática.  

- **`pyfiglet`** – Permite a exibição de textos estilizados em ASCII art no terminal, tornando a interface mais visualmente agradável. Utilizamos a biblioteca para exibir a logo da equipe durante a execução do CLI. 

- **`rich.console.Console`** – Fornece recursos avançados para exibição formatada no terminal, como cores e estilos.  

- **`rich.panel.Panel`** – Permite organizar e destacar informações dentro de painéis estilizados.  

- **`rich.align.Align`** – Controla o alinhamento do conteúdo dentro de elementos formatados.  

- **`rich.table.Table`** – Cria tabelas estilizadas para exibir dados de forma organizada no terminal.  

- **`prompt_toolkit.shortcuts.prompt`** – Gera prompts interativos para entrada do usuário, permitindo uma experiência mais dinâmica.  

- **`pydobot.enums`** – Contém definições de enumerações usadas para controlar o braço robótico Dobot.  

- **`serial.tools.list_ports`** – Lista as portas seriais disponíveis, facilitando a conexão com o Dobot.  

- **`pydobot`** – Biblioteca principal para comunicação e controle do braço robótico Dobot.  

- **`time`** – Gerencia pausas e intervalos no código, útil para temporizações ao operar o robô. Utilizamos para tornar o manuseio do braço mecânico um pouco mais preciso.  

- **`pandas`** – Manipula e estrutura dados em tabelas, auxiliando na análise e no registro de informações. Utilizamos para acessar as informações já armazenadas sobre ilhas e posições de remédios. 


### Imagens do CLI atual
&emsp;O CLI deve oferecer uma experiência intuitiva e agradável para o usuário, mesmo não sendo a principal forma de controle do braço mecânico. Para isso, importamos as bibliotecas mencionadas anteriormente, garantindo uma interface mais organizada, interativa e visualmente atraente. 

- **Banner impresso com a biblioteca Pyfiglet**

<p style={{textAlign: 'center'}}>Figura X - Banner NDC - Impresso com Pyfiglet</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/banner_cli.png").default} style={{width: 800}} alt="Banner NDC" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Tabela com as opções de entrada**

<p style={{textAlign: 'center'}}>Figura X - Tabela do CLI com suas opções</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/tabela_cli.png").default} style={{width: 800}} alt="Tabela de opções" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Aparência geral do CLI**

<p style={{textAlign: 'center'}}>Figura X - Banner NDC - Aparência geral do CLI</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/aparencia_geral_cli.png").default} style={{width: 800}} alt="Aparência geral do CLI do grupo" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>

- **Informações**

<p style={{textAlign: 'center'}}>Figura X - Informações gerais sobre o uso do CLI</p>

<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/info_cli.png").default} style={{width: 800}} alt="Informações gerais sobre o uso do CLI" />
        <br />
    </div>
</div>

<p style={{textAlign: 'center'}}>Fonte: Os autores (2025)</p>   


### Comandos 
&emsp;Projetamos a CLI para se alinhar ao resultado final esperado do projeto, consolidando as funções do sistema de forma objetiva. Definimos um escopo fechado, onde o usuário apenas informa o medicamento ou a função desejada no CLI, e, com base nas posições e dados armazenados em outros arquivos, o robô executa a ação automaticamente. Isso torna o processo mais prático e viabiliza a CLI como uma alternativa conveniente para o cliente, caso prefira esse modo de interação.

- **`1`** – Exibe informações sobre o uso do CLI. 
- **`2`** – Coleta e armazena a Dipirona.
- **`3`** – Coleta e armazena o Mebendazol.
- **`4`** – Coleta e armazena o Fumarato. 
- **`5`** – Coleta e armazena o Rivotril.
- **`q`** – Encerra o CLI.

### Explicação das Funções  

#### **1. `InteliDobot` (Classe)**
Classe que estende `pydobot.Dobot`, adicionando métodos personalizados para movimentação e retorno à posição inicial do robô.  

- **`movej_to(x, y, z, r, wait=True)`**  
  Realiza um movimento articulado (joint move) para a posição especificada.  
- **`movel_to(x, y, z, r, wait=True)`**  
  Realiza um movimento linear para a posição especificada.  
- **`GoHomeInteli()`**  
  Retorna o robô à posição inicial (home).  

#### **2. `print_banner()`**
Exibe um banner estilizado no terminal com o nome do projeto, utilizando a biblioteca `pyfiglet` para arte ASCII e `rich` para formatação.  

#### **3. `create_menu()`**
Gera e exibe um menu formatado com opções disponíveis para o usuário, utilizando `rich.table.Table` para estruturação visual.  

#### **4. `locais(ilha_num, etapa)`**
Busca no arquivo JSON as coordenadas da ilha correspondente ao medicamento e etapa desejada.  

#### **5. `locais_fita(etapa)`**
Busca no arquivo JSON as posições onde o medicamento será depositado na fita.  

#### **6. `safe_move(posicoes)`**
Movimenta o robô até a posição indicada, garantindo um deslocamento seguro.  

#### **7. `processa_fita()`**
Gerencia a movimentação do robô para depositar um medicamento na posição correta da fita médica. Inclui comandos de sucção e retorno à posição inicial.  

#### **8. `processa_ilha(ilha_num)`**
Executa a movimentação do robô até a ilha correspondente ao medicamento, ativando a sucção e retornando à posição inicial.  

#### **9. `menu_loop()`**
Exibe o menu interativo, recebe a escolha do usuário e executa as ações associadas.  

#### **10. `start()`**
Inicia a CLI, exibindo o banner e chamando o loop do menu.  

#### **Execução**
O script é executado pelo comando `app()`, inicializando o Typer CLI e aguardando interações do usuário.  



### Modo de Uso da CLI do NDCBot  

#### 1. **Pré-requisitos**  
Antes de iniciar, certifique-se de ter os seguintes itens configurados no seu sistema:  

- **Python 3.8+** instalado  [Saiba mais sobre o Python e como fazer o seu download aqui](https://www.python.org/downloads/)
- **Pip** atualizado (`pip install --upgrade pip`)  
- **Dependências do projeto** (instaladas via `pip install -r requirements.txt`)  
- **Braço robótico Dobot conectado ao computador**  

---

## **Instalação**  

### Windows  
1. Abra o **Prompt de Comando** (cmd) ou o **PowerShell**.  
2. Navegue até a pasta do projeto:  
   ```sh
   cd caminho/para/o/projeto

3. Instale as dependências:
   ```sh
   pip install -r requirements.txt

4. Execute o arquivo
   ```sh
   python ndc_cli.py 


### Linux / MacOS

1. Abra o **Terminal**. 

2. Navegue até a pasta do projeto:
   ```sh 
   cd caminho/para/o/projeto

3. Dê permissão de execução ao script:
   ```sh
   chmod +x ndc_cli.py

4. Instale as dependências:
   ```sh
   pip install -r requirements.txt

5. Execute a CLI: 
   ```sh
   python ndc_cli.py start


###

&emsp; Após a execução, será exibido um banner de boas-vindas com um menu interativo. Consulte a parte de funções, listada mais acima, para mais informações sobre as funções e um detalhamento sobre sua execução. 

### Bibliografia
1. TERMINAL ROOT. *Rich: uma biblioteca Python para saídas mais estilosas*. 2021. Disponível em: [https://terminalroot.com.br/2021/05/rich-uma-biblioteca-python-para-saidas-mais-estilosas.html](https://terminalroot.com.br/2021/05/rich-uma-biblioteca-python-para-saidas-mais-estilosas.html). Acesso em: 28 fev. 2025.

2. TIANGOLO, Sebastián. *Typer - Documentation*. Disponível em: [https://typer.tiangolo.com/](https://typer.tiangolo.com/). Acesso em: 28 fev. 2025.

3. RICH. *Rich - Python Library for Rich Text and Beautiful Formatting in the Terminal*. Disponível em: [https://rich.readthedocs.io/en/stable/introduction.html](https://rich.readthedocs.io/en/stable/introduction.html). Acesso em: 28 fev. 2025.









