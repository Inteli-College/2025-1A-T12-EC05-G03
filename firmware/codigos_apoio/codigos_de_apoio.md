# Explicação dos Códigos para Controle do Dobot

Este documento explica dois scripts em Python desenvolvidos para interagir com o braço robótico Dobot. O primeiro script realiza o monitoramento, registro e salvamento da posição inicial e dos movimentos do robô, enquanto o segundo permite o controle manual do Dobot via teclado.

---

## Coordenadas.py

### Objetivo Geral
- **Registrar a posição inicial:** Salva (ou carrega) a posição inicial do Dobot em um arquivo JSON.
- **Monitorar movimentos:** Coleta continuamente a posição atual do robô, calcula variações em relação à posição inicial e determina a distância percorrida.
- **Armazenar dados:** Os dados são registrados em uma lista e, ao interromper o script (Ctrl+C), são salvos em um arquivo CSV para análise.

### Principais Funcionalidades
- **Listagem de Portas Seriais:**  
  Utiliza `serial.tools.list_ports` para identificar as portas disponíveis e permite que o usuário escolha a porta correta para conexão.
- **Conexão com o Dobot:**  
  Após a seleção da porta, o script se conecta ao Dobot usando a biblioteca `pydobot`.
- **Gerenciamento da Posição Inicial:**  
  - Verifica se existe um arquivo JSON com a posição inicial salva.
  - Caso exista, pergunta se o usuário deseja utilizar essa posição ou definir uma nova.
  - Se não houver arquivo, o usuário deve mover o robô para a posição desejada e confirmar pressionando ENTER, salvando a posição.
- **Loop de Monitoramento:**  
  A cada 10 segundos, o script:
  - Obtém a posição atual do robô.
  - Calcula as variações (ΔX, ΔY, ΔZ, ΔR) e a distância percorrida.
  - Exibe as informações no terminal e armazena os dados em uma lista.
- **Salvamento dos Dados:**  
  Ao interromper a execução (KeyboardInterrupt), os dados são convertidos em um DataFrame usando `pandas` e salvos em um arquivo CSV.

### Bibliotecas Utilizadas
- **pandas:** Para manipulação e salvamento dos dados em CSV.
- **time:** Para controle dos intervalos e marcação do tempo.
- **json:** Para salvar e carregar a posição inicial.
- **serial.tools.list_ports:** Para listar as portas seriais disponíveis.
- **pydobot:** Para comunicação e controle do Dobot.

---

## keyboardDobot.py

### Objetivo Geral
- **Controlar o Dobot em tempo real:** Permite movimentar o robô usando comandos do teclado.

### Principais Funcionalidades
- **Listagem e Seleção de Portas:**  
  - Lista as portas seriais disponíveis.
  - Solicita ao usuário a escolha da porta para conexão.
- **Conexão com o Dobot:**  
  Conecta ao dispositivo utilizando a biblioteca `pydobot` e obtém a posição inicial.
- **Controle com o Teclado:**  
  - Utiliza a biblioteca `keyboard` para detectar pressionamentos de teclas.
  - Permite movimentar o robô alterando as coordenadas:
    - **W:** Aumenta a coordenada Y (movimento para frente).
    - **S:** Diminui a coordenada Y (movimento para trás).
    - **A:** Diminui a coordenada X (movimento para a esquerda).
    - **D:** Aumenta a coordenada X (movimento para a direita).
    - **Q:** Incrementa a coordenada Z (movimento para cima).
    - **Z:** Decrementa a coordenada Z (movimento para baixo).
  - **Controle da ventosa:**  
    - **M:** Ativa a função `suck` (possivelmente para acionar uma ventosa).
    - **N:** Desativa a função `suck`.
- **Interrupção do Loop:**  
  O loop é interrompido quando a tecla `ç` é pressionada, encerrando o programa.

### Bibliotecas Utilizadas
- **keyboard:** Para detectar os pressionamentos das teclas.
- **serial.tools.list_ports:** Para listar as portas seriais.
- **pydobot:** Para controle do Dobot.
- **time:** Para gerenciar pausas entre os comandos e evitar sobrecarga.

---

