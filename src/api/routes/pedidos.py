from flask import Blueprint, jsonify, request
from ..models.prescricao import Prescricao
from ..models.pedido import Pedido
from ..models.database import db
from datetime import datetime, date
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.sql import func



# criando a rota base
pedidos_bp = Blueprint('pedidos', __name__, url_prefix='/pedidos')

#Rotas:
#Listar todas as pedidos
@pedidos_bp.route('/listar', methods=['GET'])
def listar_pedidos():
    pedidos = Pedido.query.all()
    return jsonify([pedido.as_dict() for pedido in pedidos])

# Adicionar uma Pedidos nova
@pedidos_bp.route('/adicionar', methods=['POST'])
@jwt_required()

def add_pedido():
    data = request.get_json()

    lista_remedios = data['lista_remedios'] if isinstance(data['lista_remedios'], list) else []

    newPedido = Pedido(
        id_prescricao = data['id_prescricao'],
        lista_remedios = str(lista_remedios),
        status_pedido = 1,
        data_entrada = datetime.now()
    )

    db.session.add(newPedido)
    db.session.commit()

    return jsonify({
        'message': 'Pedidos inserida com sucesso',
    }), 201

# Buscar pedidos por Id
@pedidos_bp.route('/<pedido_id>', methods=['GET'])
@jwt_required()

def listar_por_id(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    return jsonify(pedido.as_dict()), 200


# Alterar Status Pedido
@pedidos_bp.route('/status/<pedido_id>', methods=['PATCH'])
@jwt_required()

def alterar_status(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    data = request.get_json()

    if data['status'] not in [1, 2, 3, 4, 5, 6]:
        return {
        "Message": f"O status de número {data['status']} não existe"
        }, 400


    pedido.status_pedido = data['status']
    
    if (data['status'] == 4 or data['status'] == 5 or data['status'] == 6) :
        pedido.data_finalizacao = datetime.now()
        # Fazer lógica para puxar o id do usuario que aprovou! ou para o usuário que reprovou

    db.session.commit()
    return jsonify({'Message': f"Status prescrição atualizado para {data['status']}, com sucesso"}), 200

# Deletar a pedido
@pedidos_bp.route('/deletar/<pedido_id>', methods=['DELETE'])
@jwt_required()

def deletar_pedido(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    db.session.delete(pedido)
    db.session.commit()
    return jsonify({'Message': 'Pedido deletada com sucesso'}), 200

# Puxar primeiro pedido da fila:
@pedidos_bp.route('/fila', methods=['GET'])
def puxar_prox_fila():
    pedido = (
        db.session.query(Pedido)
        .filter(Pedido.status_pedido == 1)
        .order_by(Pedido.data_entrada.asc()) 
        .first()
    )

    pedido.status_pedido = 2
    db.session.commit()

    return jsonify({
        "id": pedido.id,
        "lista_remedios": pedido.lista_remedios
    })

@pedidos_bp.route('/atualizar-home', methods=['GET'])
def atualizar_pedidos_home():
    pedidos_aguardando_separacao = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 1) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )
    pedidos_em_separacao = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 2) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )
    pedidos_em_revisao = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 3) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )
    pedidos_concluidos = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 4) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )

    return jsonify({
        "Aguardando Separacao": [aguardando.as_dict() for aguardando in pedidos_aguardando_separacao],
        "Em Separação": [separacao.as_dict() for separacao in pedidos_em_separacao],
        "Em Revisão": [revisao.as_dict() for revisao in pedidos_em_revisao],
        "Concluído": [concluido.as_dict() for concluido in pedidos_concluidos],
    }), 200


