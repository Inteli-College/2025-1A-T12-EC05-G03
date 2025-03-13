---
sidebar_position: 1
custom_edit_url: null
---

# Diagrama de blocos

## Introdução  
&emsp;O diagrama de blocos apresentado nesta documentação tem como objetivo detalhar a interconexão dos diferentes componentes do sistema, com ênfase nos periféricos utilizados para otimizar sua funcionalidade. Periféricos são dispositivos ou módulos que expandem as capacidades de um sistema computacional, permitindo a comunicação, o controle e a coleta de dados em diversos contextos. Eles podem ser classificados em periféricos de entrada, como sensores e teclados; periféricos de saída, como telas e atuadores; e periféricos de armazenamento ou comunicação, como cartões SD e módulos de rede.

&emsp;Esta versão do diagrama fornece uma representação mais específica da integração desses periféricos com o sistema central. Dessa forma, buscamos assegurar uma compreensão clara da funcionalidade de cada componente e de sua interação no contexto do projeto.

## Grupos e Elementos do Sistema  
&emsp;O sistema é dividido em diferentes grupos, cada um contendo elementos específicos que desempenham funções essenciais na solução. Abaixo, detalhamos cada grupo e seus principais componentes:  

<p style={{textAlign: 'center'}}>Figura X: Imagem dos grupos do diagrama de blocos</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/diagramablocos1.png").default} style={{width: 800}} alt="Imagem dos grupos do diagrama de blocos" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025). </p>

### 👥 Usuários  
- **🧑‍⚕️ Farmacêutico e Técnico em Farmácia**: São os principais usuários do sistema, responsáveis por interagir com a interface do front-end para registrar e acessar informações relevantes.  

### 🔗 Sistema NDC  
- **🖥️ Front-end**: Interface gráfica com a qual os usuários interagem para acessar e manipular os dados.  
- **⚙️ Back-end**: Responsável pelo processamento dos dados, comunicação com os periféricos e controle geral do sistema.  
- **💾 Banco de Dados**: Armazena as informações processadas pelo back-end, garantindo a persistência dos dados.  
- **🔌 API**: Interface para comunicação entre diferentes partes do sistema e integração com sistemas externos.  

### 🔄 Sistema HC  
- **📡 Sistema HC**: Sistema do Hospital das Clínicas da Unicamp, mapeado para atuar na comunicação com o Sistema do grupo NDC, enviando e recebendo informações da API.  

### 🤖 Robô  
&emsp;O robô desempenha um papel fundamental no sistema, realizando a leitura de informações e interagindo fisicamente com o ambiente. Seus principais componentes são:  
- **🍓 Raspberry Pi**: Responsável pelo processamento local das informações e comunicação com o back-end.  
- **🛠️ Arduino Uno**: Atua no controle de periféricos do robô.  
- **🌀 Sugador do Robô**: Elemento responsável pela manipulação física de objetos.  
- **📸 Sensor Leitor de QR Code**: Captura informações e as envia para o back-end.  
- **📏 Sensor de Distância**: Mede a proximidade de objetos e também transmite dados para o back-end.  

## Conexões entre os Elementos  

&emsp;Para ilustrar as conexões e interações entre os diferentes componentes do sistema, apresentamos dois diagramas de blocos. O Diagrama Geral oferece uma visão ampla de como os principais elementos do sistema se comunicam entre si, destacando os fluxos de dados essenciais. Já o Diagrama dos Periféricos foca nas interações específicas dos dispositivos e sensores conectados ao sistema, oferecendo um detalhamento maior das conexões entre os componentes periféricos e o núcleo do sistema. Ambos os diagramas são essenciais para compreender a estrutura e o funcionamento do sistema como um todo.

&emsp;O diagrama de blocos abaixo ilustra todas essas interações de forma clara. 

<p style={{textAlign: 'center'}}>Figura X: Imagem do diagrama geral</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/diagramablocos2.png").default} style={{width: 800}} alt="Imagem do diagrama de blocos geral da solução" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025). </p>

&emsp;O diagrama específico dos periféricos também está disponível para detalhamento das interações periféricas. 

<p style={{textAlign: 'center'}}>Figura X: Imagem do diagrama diagrama dos periféricos</p>
<div style={{margin: 25}}>
    <div style={{textAlign: 'center'}}>
        <img src={require("../../../../media/diagramablocos3.png").default} style={{width: 800}} alt="Imagem do diagrama dos periféricos da solução" />
        <br />
    </div>
</div>
<p style={{textAlign: 'center'}}>Fonte: Produzida pelos Autores (2025). </p>

&emsp;Para facilitar a visualização das interações, os elementos estão agrupados em blocos, e as conexões entre eles são representadas por setas que indicam a direção do fluxo de dados. As **chaves []** simbolizam grupos, enquanto os **parênteses ()** representam componentes individuais dentro de um grupo. Além disso, o **símbolo "→"** representa uma conexão unilateral, ou seja, o fluxo de dados vai em uma direção, enquanto o **símbolo "⇄"** indica uma relação bilateral, onde há troca de dados em ambas as direções. A seguir, descrevemos as conexões:  

1. **👥 [Usuários (Farmacêutico e Técnico em Farmácia)] → 🖥️ [Sistema NDC (Front-end)]**  
2. **📡 [Sistema HC] → 🔌 [Sistema NDC (API)]**  
3. **⚙️ [Sistema NDC (Back-end)] → 🤖 [Robô]**  
4. **🖥️ [Sistema NDC (Front-end)] → ⚙️ [Sistema NDC (Back-end)]**  
5. **⚙️ [Sistema NDC (Back-end)] → 💾 [Banco de Dados]**  
6. **🔌 [Sistema NDC (API)] → ⚙️ [Sistema NDC (Back-end)]**  
7. **🍓 [Raspberry Pi] ⇄ ⚙️ [Back-end]**  
8. **📸 [Sensor Leitor de QR Code] → ⚙️ [Back-end]**  
9. **📏 [Sensor de Distância] → ⚙️ [Back-end]**  
10. **🛠️ [Arduino Uno] → 🌀 [Sugador do Robô]**  

## Conclusão  
&emsp;Esta sessão fornece uma visão abrangente do diagrama de blocos do sistema, detalhando seus componentes, interações e periféricos. A representação detalhada dos periféricos permite um melhor entendimento da arquitetura da solução e facilita futuras melhorias e integrações. 

