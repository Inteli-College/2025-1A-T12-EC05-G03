---
sidebar_position: 4
custom_edit_url: null
---

# Códigos de apoio 

### O que são códigos de apoio?

&emsp;No início, o problema parecia mais complexo do que o esperado. A equipe enfrentou dificuldades para compreender o comportamento do braço mecânico em relação a alguns eixos, o que tornou o processo mais desafiador. <br />
&emsp;Para lidar com isso, organizamos o desenvolvimento e criamos códigos auxiliares que facilitaram a execução das tarefas. Dois arquivos foram desenvolvidos: coordenadas.py, responsável por capturar e armazenar as coordenadas em um arquivo JSON, e keyboardDobot.py, que permite ao usuário manipular o braço robótico por meio de comandos do teclado.


## KeyboardDobot - Controle Manual do Robô  

### Visão Geral  
O `KeyboardDobot` permite o controle do braço robótico **Dobot** usando o teclado. Ele facilita testes rápidos ao mapear teclas para movimentação nos eixos X, Y e Z, além de ativar ou desativar a sucção.  

---

### Funcionalidades  
- **Conexão com o Dobot** → Lista as portas seriais disponíveis e permite a seleção pelo usuário.  
- **Movimentação**  
  - `W` → Avança no eixo **Y** (+Y).  
  - `S` → Recuar no eixo **Y** (-Y).  
  - `A` → Move para a esquerda no eixo **X** (-X).  
  - `D` → Move para a direita no eixo **X** (+X).  
  - `Q` → Eleva o braço no eixo **Z** (+Z).  
  - `Z` → Abaixa o braço no eixo **Z** (-Z).  
- **Controle de sucção**  
  - `M` → Ativa a sucção (pegar objeto).  
  - `N` → Desativa a sucção (soltar objeto).  
- **Encerramento**  
  - `Ç` → Encerra o programa.  

---

  
O `KeyboardDobot` é uma ferramenta útil para testes rápidos, permitindo que o usuário controle manualmente o robô sem escrever comandos diretos. Ele foi essencial para a elaboração de códigos mais complexos, como o do CLI. 


# Coordenadas.py - Registro de Posições do Dobot  

## Visão Geral  
O script `coordenadas.py` tem como principal função capturar e armazenar as coordenadas do **Dobot**, permitindo registrar sua posição inicial e monitorar suas variações ao longo do tempo. Os dados são salvos em um arquivo **CSV**, possibilitando análises futuras.  

---

## Funcionalidades  

### Conexão com o Dobot  
- Lista as portas seriais disponíveis e solicita ao usuário que escolha a correta.  
- Estabelece comunicação com o robô para captura das posições.  

### Gerenciamento da Posição Inicial  
- Verifica se há uma posição inicial salva no arquivo `posicao_inicial.json`.  
- Permite que o usuário mantenha ou redefina essa posição.  
- Move o robô automaticamente para a posição inicial antes de iniciar a coleta de dados.  

### Monitoramento e Registro de Movimentos  
- Captura periodicamente a posição atual do robô (X, Y, Z, R).  
- Calcula variações de posição (`ΔX`, `ΔY`, `ΔZ`, `ΔR`) e a **distância percorrida** desde a posição inicial.  
- Exibe as informações no terminal para acompanhamento em tempo real.  
- Armazena os dados em um arquivo **CSV** (`movimentos_dobot.csv`).  

### Encerramento Seguro  
- O usuário pode interromper o monitoramento com **Ctrl + C**.  
- Antes de finalizar, os dados coletados são automaticamente salvos.  

---

&emsp;O `coordenadas.py` é a ferramenta ideal para capturar e registrar os movimentos do **Dobot**, garantindo precisão e controle sobre seu deslocamento. <br />
&emsp;Esses códigos podem ser encontrados na pasta raíz do nosso projeto. 





