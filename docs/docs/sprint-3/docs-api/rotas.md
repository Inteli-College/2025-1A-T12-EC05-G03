---
sidebar_position: 2
custom_edit_url: null
---

# Rotas

## Conceito

&emsp; Uma rota de uma API é um caminho específico dentro de um servidor que responde a requisições HTTP. Ela define como as solicitações dos clientes (como um site ou um app) serão processadas e quais respostas serão enviadas.

## Rotas de Autenticação de usuário

### Rota para cadastro do usuário

```
/register
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "email": "",
    "senha": "",
    "nome_completo": "",
    "id_cargo": 0,
}
```

 - **Resposta Esperada**:
    - status code : 201
    - *response*:
```
{
  "message": "Usuário registrado com sucesso!"
}
```

### Rota para login


```
/login
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "email": "",
    "senha": "",
}
```
 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTc0MTkyNDAwMiwianRpIjoiM2RiNTgxYTctNTk5MC00ZDkzLTgzNDItNzlkM2ZkOTliYjIwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6Im1pZ3VlbEB0ZXN0ZS5jb20iLCJuYmYiOjE3NDE5MjQwMDIsImNzcmYiOiI0MGYxYWE5Ni0zOGY5LTQ3ZjUtYWE2Yi1jZTg3MTUyODE3ZjgiLCJleHAiOjE3NDE5MjQ5MDJ9.4xfMiTsploam_r4CKhgsywpv_7eqo-Z86112Mu4uN3c"
}
```

## Rotas de Log's do Sistema

### Cadastro de log
```
/logs/cadastrar
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "id_pedido": 0,
    "id_remedio_em_separacao": 0,
    "codigo_log": 0
}
```

 - **Resposta Esperada**:
    - status code : 201
    - *response*:
```
{
  "message": "Log cadastrado com sucesso!"
}
```

## Rotas de Controle de Prescrições do Sistema


### Cadastro de prescrições
```
/prescricoes/adicionar
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "lista_remedios": []
    "hc_paciente": 0
}
```

 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  "message": "Prescrição inserida com sucesso"
}
```
### Listar todas as prescrições
```
/prescricoes/listar
```

 - **Método**: GET
 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  [
  {
    "data_avaliacao":"",
    "data_entrada": ""
    "hc_paciente": "",
    "id": 0,
    "id_user_aprovacao": 0,
    "lista_remedios": "[]"
    "status_prescricao": 0, 
  }
]
}
```

### Listar prescrição por Id
```
/prescricoes/listar/<prescricao_id>
```

 - **Método**: GET
 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
    "data_avaliacao":"",
    "data_entrada": ""
    "hc_paciente": "",
    "id": 0,
    "id_user_aprovacao": 0,
    "lista_remedios": "[]"
    "status_prescricao": 0, 
}
```

### Aprovação de Prescrição
```
/prescricoes/aprovar/<prescricao_id>
```

 - **Método**: PUT
 - **Corpo da Requisição**:
```
{
    "lista_remedios": []
    "status_prescricao": 0
}
```

 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  "Message": "Prescricao aprovada com sucesso"
}
```

### Deletar prescricao por Id
```
/prescricoes/deletar/<prescricao_id>
```

 - **Método**: DELETE
 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
    "Message": "Prescricao deletada com sucesso"
}
```

## Rotas de Controle de Pedido no Sistema

### Cadastro de Pedido
```
/prescricoes/adicionar
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "lista_remedios": []
    "id_prescricao": 0,
}
```

 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  "message": "Pedido inserido com sucesso"
}
```
### Listar todas os pedidos
```
/pedidos/listar
```

 - **Método**: GET
 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  [
  {
    "data_entrada": "",
    "data_finalizacao": ,
    "id": 0,
    "id_prescricao": 0,
    "id_user_revisao": "",
    "lista_remedios": "[]",
    "status_pedido": 0
  }
]
}
```

### Listar pedido por Id
```
/pedidos/listar/<pedido_id>
```

 - **Método**: GET
 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
    "data_entrada": "",
    "data_finalizacao": ,
    "id": 0,
    "id_prescricao": 0,
    "id_user_revisao": "",
    "lista_remedios": "[]",
    "status_pedido": 0 
}
```

### Alterar status do Pedido
```
/pedidos/status/<pedido_id>
```

 - **Método**: PATCH
 - **Corpo da Requisição**:
```
{
    "status": 0
}
```

 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  "Message": "Status do pedido atualizado para 0, com sucessoo"
}
```

### Deletar pedido por Id
```
/pedido/deletar/<pedido_id>
```

 - **Método**: DELETE
 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
    "Message": "Pedido deletado com sucesso"
}
```



## Rotas de Qr Code

### Validação do Qr Code
```
/qrcode/validar
```

 - **Método**: GET
 - **Corpo da Requisição**:
```
{
    "remedio_id": 0,
    "qrcode_lido": ""
}
```

 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  "message": "Qr Code válido"
}
```


## Rotas de Remédio

### Cadastro de Remédios
```
/remedios/cadastrar
```

 - **Método**: POST
 - **Corpo da Requisição**:
```
{
    "principio_ativo": "",
    "bin_qrcode": ""
}
```

 - **Resposta Esperada**:
    - status code : 200
    - *response*:
```
{
  "message": "Qr Code válido"
}
```
