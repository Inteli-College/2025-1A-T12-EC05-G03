from flask import Blueprint, jsonify, request
from backend.models.prescricao import Prescricao
from backend.models.pedido import Pedido
from backend.models.database import db
from datetime import datetime

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
def add_pedido():
    data = request.get_json()

    lista_remedios = data['lista_remedios'] if isinstance(data['lista_remedios'], list) else []

    newPedido = Pedido(
        id_prescricao = data['id_prescricao'],
        lista_remedios = str(lista_remedios),
        status_pedido = data['status_pedido']
    )

    db.session.add(newPedido)
    db.session.commit()

    return jsonify({
        'message': 'Pedidos inserida com sucesso',
    }), 201

# Buscar pedidos por Id
@pedidos_bp.route('/<pedido_id>', methods=['GET'])
def listar_por_id(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    return jsonify(pedido.as_dict()), 200


# Alterar Status Pedido
@pedidos_bp.route('/status/<pedido_id>', methods=['PATCH'])
def alterar_status(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    data = request.get_json()

    # Fazer verificao de somente ter os id que vão ter no status !! dar bad request

    pedido.status_pedido = data['status']
    
    if(data['status'] == 4 or data['status'] == 5 or data['status'] == 6):
        pedido.data_finalizacao = datetime.now()

    db.session.commit()
    return jsonify({'Message': f'Status prescrição atualizado para {data['status']}, com sucesso'}), 200

# # buscar por id prescricao
# @pedidos_bp.route('/prescricaoId/<pedido_id_prescricao>', methods=['GET'])
# def listar_por_idPrescricao(pedido_id_prescricao):
#     pedido = Pedido.query.get_or_404(pedido_id_prescricao)
#     return jsonify(pedido.as_dict()), 200

# Deletar a pedido
@pedidos_bp.route('/deletar/<pedido_id>', methods=['DELETE'])
def deletar_pedido(pedido_id):
    pedido = Pedido.query.get_or_404(pedido_id)
    db.session.delete(pedido)
    db.session.commit()
    return jsonify({'Message': 'Pedido deletada com sucesso'}), 200