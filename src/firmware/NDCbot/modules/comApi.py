"""
Funções para comunicação com API.
"""

import requests

def enviar_log(id_pedido, id_remedio_em_separacao, codigo_log):
    """    
    body:
        id_pedido: ID do pedido
        id_remedio_em_separacao: ID do medicamento
        codigo_log: Código do log
    """
    try:
        url = "https://two025-1a-t12-ec05-g03.onrender.com/logs/cadastrar"
        dados = {
            "id_pedido": id_pedido,
            "id_remedio_em_separacao": id_remedio_em_separacao,
            "codigo_log": codigo_log
        }
        response = requests.post(url, json=dados)
        if response.status_code == 200 or response.status_code == 201:
            print(f"✅ Enviei o log com sucesso: {dados}")
        else:
            print(f"❌ Não consegui enviar o log: {response.status_code}")
    except Exception as e:
        print(f"❌ Tive um problema na requisição para a API: {e}")


def obter_pedidos():
    try:
        url = "https://two025-1a-t12-ec05-g03.onrender.com/pedidos/fila"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Não consegui obter os pedidos: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Tive um problema na requisição para obter pedidos: {e}")
        return