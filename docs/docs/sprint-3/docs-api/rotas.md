---
sidebar_position: 2
custom_edit_url: null
---

# Rotas

## Conceito

&emsp; Uma rota de uma API é um caminho específico dentro de um servidor que responde a requisições HTTP. Ela define como as solicitações dos clientes (como um site ou um app) serão processadas e quais respostas serão enviadas.

## Rotas da nossa API

### Rotas de Autenticação de usuário

#### Rota para cadastro do usuário

```
/register
```

 - **Método**: POST
 - **Corpo da Requisição**:
```

{
    "email":
    "senha":
    "nome_completo":
    "id_cargo":
}

```

#### Rota para login


```
/register
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "email":
    "senha":
}
```
 - **Resposta Esperado**:
    - status code : 200
    - body:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTkyNDAwMiwianRpIjoiM2RiNTgxYTctNTk5MC00ZDkzLTgzNDItNzlkM2ZkOTliYjIwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Im1pZ3VlbEB0ZXN0ZS5jb20iLCJuYmYiOjE3NDE5MjQwMDIsImNzcmYiOiI0MGYxYWE5Ni0zOGY5LTQ3ZjUtYWE2Yi1jZTg3MTUyODE3ZjgiLCJleHAiOjE3NDE5MjQ5MDJ9.4xfMiTsploam_r4CKhgsywpv_7eqo-Z86112Mu4uN3c"
}
```




