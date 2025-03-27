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

