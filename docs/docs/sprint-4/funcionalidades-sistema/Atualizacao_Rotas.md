---
sidebar_position: 2
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
Renderiza a página de login (padrão).

### `GET /login`  
Renderiza a página de login.

### `GET /home`  
Renderiza a página principal do sistema.

### `GET /cadastro`  
Renderiza a página de cadastro de usuário.

### `GET /historico`  
Renderiza a página com o histórico de atendimentos e logs.

### `GET /estoque`  
Renderiza a página de controle de estoque de medicamentos.

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
  }
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
  "id_remedio_em_separacao": 3,
  "codigo_log": "MEDICAMENTO_VALIDADO"
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

### `GET /lotes/proximos-validade`  
Lista lotes que estão com validade próxima (até 7 dias a partir da data atual).

---

### `DELETE /lotes/deletar/<lote_id>`  
Deleta um lote pelo seu ID.  
🔒 Requer autenticação JWT.

---

