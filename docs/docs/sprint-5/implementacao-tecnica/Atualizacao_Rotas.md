---
sidebar_position: 3
custom_edit_url: null
---

# Atualização das Rotas

##### Atualização das Rotas
&emsp;Rotas são caminhos definidos no back-end que permitem a comunicação entre diferentes partes de um sistema por meio de requisições HTTP. No contexto do projeto, as rotas funcionam como pontos de conexão entre o robô, o servidor e a interface web, possibilitando a troca de dados e o acionamento de funcionalidades essenciais para a separação automatizada de medicamentos. Assim, as rotas são responsáveis por garantir a comunicação entre os diferentes módulos, viabilizando a leitura de QR codes, a validação dos medicamentos e o controle dos movimentos do robô em tempo real. A organização e padronização dessas rotas asseguram o funcionamento sincronizado e eficiente do sistema, desse modo, vamos analisar as rotas atuais do nosso projeto, considerando as atualizações feitas nessas sprint:

## 📦 **1. Rotas de Autenticação (`auth.py`)**

&emsp;Estas rotas permitem o cadastro e login de usuários no sistema, utilizando autenticação JWT para geração de tokens de acesso.

### `POST /auth/register`
Registra um novo usuário no sistema.  
**Corpo esperado:**
```json
{
  "email": "usuario@email.com",
  "senha": "senha123",
  "nome_completo": "Nome do Usuário",
  "id_cargo": 2
}
```
**Resposta:**  
- `201 Created`: Usuário registrado com sucesso.  
- `400 Bad Request`: Email já cadastrado.

---

### `POST /auth/login`
Autentica um usuário e retorna um token de acesso JWT.  
**Corpo esperado:**
```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```
**Resposta:**  
- `200 OK`: Token de acesso.  
- `401 Unauthorized`: Usuário ou senha inválidos.

---

## 🖥️ **2. Rotas de Interface (`front.py`)**

&emsp;Estas rotas renderizam as páginas HTML da aplicação, que compõem a interface gráfica usada pelos usuários.

### `GET /`  
Renderiza a landingpage do grupo.

### `GET /login`  
Renderiza a página de login.

### `GET /home`  
Renderiza a página principal do sistema.

### `GET /cadastro`  
Renderiza a página de cadastro de usuário.

### `GET /historico-prescricao`  
Renderiza a página com o histórico de prescrições.

### `GET /estoque`  
Renderiza a página de controle de estoque de medicamentos.

### `GET /historico-log`  
Renderiza a página com o histórico de log's do sistema.


---

## 🏠 **3. Rotas da Página Inicial (`home.py`)**

&emsp;Rota que busca todos os pedidos e prescrições do dia, classificados por status, para exibição dinâmica na interface da home.

### `GET /home/atualizar`  
Retorna os dados atualizados do dia atual, organizados em:
- Prescrições:
  - `aguardandoAvaliacao`: status 1
  - `avaliadas`: status diferente de 1
- Pedidos:
  - `aguardandoSeparacao`: status 1
  - `emSeparacao`: status 2
  - `emRevisao`: status 3
  - `concluidos`: status 4 ou 5
- Notificações:
    - Atualmente existem dois tipos de notificações:
        - Lotes próximos da data de validade
        - Lotes com baixa quantidade, menor que 10 unidades

**Resposta:**
```json
{
  "prescricoes": {
    "aguardandoAvaliacao": [...],
    "avaliadas": [...]
  },
  "pedidos": {
    "aguardandoSeparacao": [...],
    "emSeparacao": [...],
    "emRevisao": [...],
    "concluidos": [...]
  },
  "notificacoes": [...]
}
```

---

## 📋 **4. Rotas de Logs do Robô (`logs.py`)**

&emsp;Estas rotas armazenam e consultam os registros (logs) de eventos durante a separação de medicamentos pelo robô.

### `POST /logs/cadastrar`  
Registra um novo log com informações sobre o pedido, medicamento e tipo de evento (via `codigo_log`).  
**Corpo esperado:**
```json
{
  "id_pedido": 1,
  "id_remedio_em_separacao": "1",
  "codigo_log": 1
}
```
**Resposta:**  
- `201 Created`: Log cadastrado com sucesso.

---

### `GET /logs/listar`  
Lista todos os logs registrados no sistema.

**Resposta:**  
Array de objetos `Log`.

---

### `GET /logs/pedido/<id_pedido>`  
Retorna todos os logs vinculados a um pedido específico.

**Resposta:**  
- `200 OK`: Array de logs encontrados.  
- `404 Not Found`: Nenhum log encontrado para o pedido informado.
---

## 📦 **5. Rotas de Lotes (`lotes.py`)**

&emsp;Estas rotas permitem o gerenciamento dos lotes de medicamentos cadastrados no sistema.

### `POST /lotes/cadastrar`  
Cadastra um novo lote vinculado a um remédio.  
🔒 Requer autenticação JWT.  
**Corpo esperado:**
```json
{
  "num_lote": "ABC123",
  "data_validade": "2025-10-01",
  "fabricante": "Farmacêutica XYZ",
  "id_remedio": 1,
  "quantidade": 10,
  "bin_qrcode": "QR123456"
}
```
**Resposta:** `201 Created`

---

### `GET /lotes/listar`  
Lista todos os lotes registrados no sistema.

---

### `GET /lotes/remedio/<id_remedio>`  
Retorna todos os lotes associados a um determinado remédio pelo seu `id`.

---

### `DELETE /lotes/deletar/<lote_id>`  
Deleta um lote pelo seu ID.  
🔒 Requer autenticação JWT.

---

## 📝 **6. Rotas de Prescrições (`prescricoes.py`)**

&emsp;Gerencia prescrições médicas inseridas no sistema, incluindo sua aprovação e vinculação com pedidos.

### `GET /prescricoes/listar`  
Lista todas as prescrições.  
🔒 Requer autenticação JWT.

---

### `POST /prescricoes/adicionar`  
Adiciona uma nova prescrição com lista de remédios (IDs).  
🔒 Requer autenticação JWT.  
**Corpo esperado:**
```json
{
  "hc_paciente": "123456",
  "lista_remedios": [1, 2, 3]
}
```

---

### `GET /prescricoes/<prescricao_id>`  
Retorna os dados detalhados de uma prescrição específica, com os remédios relacionados.  
🔒 Requer autenticação JWT.

---

### `PUT /prescricoes/aprovar/<prescricao_id>`  
Aprova a prescrição e cria um pedido associado, utilizando os lotes com validade mais próxima.  
🔒 Requer autenticação JWT.  
**Corpo esperado:**
```json
{
  "status_prescricao": 4,
  "lista_remedios": [1, 2]
}
```

---

### `DELETE /prescricoes/deletar/<prescricao_id>`  
Deleta uma prescrição pelo ID.  
🔒 Requer autenticação JWT.

---

## 💊 **7. Rotas de Remédios (`remedio.py`)**

&emsp;Gerencia o cadastro e listagem de princípios ativos (remédios) no sistema.

### `POST /remedios/cadastrar`  
Cadastra um novo remédio.  
🔒 Requer autenticação JWT.  
**Corpo esperado:**
```json
{
  "principio_ativo": "Paracetamol",
  "dosagem_em_mg": 500
}
```

---

### `GET /remedios/listar`  
Lista todos os remédios cadastrados.

---

## 📷 **8. Rotas de Validação de QR Code (`rotas_qrcode.py`)**

&emsp;Responsáveis pela validação dos QR Codes escaneados pelo robô.

### `POST /qrcode/validar`  
Valida se o `qrcode_lido` corresponde ao `qrcode_procurado`.  
Se forem diferentes, incrementa o estoque do lote vinculado ao `qrcode_procurado`.  
**Corpo esperado:**
```json
{
  "qrcode_lido": "QR123",
  "qrcode_procurado": "QR123"
}
```

**Resposta:**
- `200 OK`: QR Code válido  
- `404 Not Found`: QR Code inválido e lote não encontrado (acrescenta +1 no estoque do lote procurado) 

---

## 📦 **9. Rotas de Pedidos (`pedidos.py`)**

As rotas de pedidos são responsáveis por registrar, consultar, revisar e atualizar o status dos pedidos gerados a partir das prescrições aprovadas, além de manter o controle da fila de separação de medicamentos.

---

### `GET /pedidos/listar`  
Lista todos os pedidos registrados no sistema.  
**Resposta:** Lista de objetos `Pedido`.

---

### `POST /pedidos/adicionar`  
Cria um novo pedido com base em uma prescrição aprovada.  
🔒 Requer autenticação JWT.  
**Corpo esperado:**
```json
{
  "id_prescricao": 1,
  "lista_remedios": ["QR123", "QR456"]
}
```
**Resposta:**  
- `201 Created`: Pedido inserido com sucesso.

---

### `GET /pedidos/<pedido_id>`  
Retorna os dados de um pedido específico e os remédios relacionados a ele.  
🔒 Requer autenticação JWT.  
**Resposta:**  
```json
{
  "pedido": { ... },
  "remedios": [ ... ]
}
```

---

### `PATCH /pedidos/status/<pedido_id>`  
Atualiza o status do pedido. Esta rota é usada pelo robô para atualizar automaticamente o andamento do processo.  
**Corpo esperado:**
```json
{
  "status": 2
}
```
**Regras:**  
- Se o status for 4, 5 ou 6, a `data_finalizacao` é registrada.  
- Não requer autenticação.  
**Resposta:**  
- `200 OK`: Status atualizado com sucesso.

---

### `PATCH /pedidos/revisar/<pedido_id>`  
Atualiza o status do pedido, registrando o usuário responsável pela revisão.  
🔒 Requer autenticação JWT.  
**Corpo esperado:**
```json
{
  "status": 5
}
```
**Regras:**  
- Se o status for 4, 5 ou 6, registra `data_finalizacao` e `id_user_revisao` com base no JWT.  
**Resposta:**  
- `200 OK`: Status e revisor atualizados com sucesso.

---

### `DELETE /pedidos/deletar/<pedido_id>`  
Deleta um pedido específico pelo seu ID.  
🔒 Requer autenticação JWT.  
**Resposta:**  
- `200 OK`: Pedido deletado com sucesso.

---

### `GET /pedidos/fila`  
Busca o próximo pedido na fila com status 1 (aguardando separação), e atualiza seu status para 2 (em separação).  
**Resposta:**  
- `200 OK`: Retorna o pedido e a lista de QR Codes.  
- `404 Not Found`: Nenhum pedido na fila.


## Conclusão
&emsp;A integração entre as rotas da API, a interface web e o robô é essencial para o funcionamento automatizado e seguro do sistema de separação de medicamentos. Cada rota desempenha um papel específico na gestão de usuários, prescrições, pedidos, lotes, logs e validação de QR Codes, garantindo rastreabilidade e eficiência em todo o fluxo. Nesta sprint, a atualização e organização das rotas foi um passo crucial para consolidar a comunicação entre todo o sistema, assim deixando o nosso MVP o mais completo possível.