from flask import Blueprint, jsonify, request
from models.prescricao import Prescricao
from models.pedido import Pedido
from models.database import db
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity


# criando a rota base
prescricoes_bp = Blueprint('prescricoes', __name__, url_prefix='/prescricoes')

#Rotas:
#Listar todas as prescrições
@prescricoes_bp.route('/listar', methods=['GET'])
@jwt_required()
def listar_prescricoes():
    prescrioes = Prescricao.query.all()
    return jsonify([prescricao.as_dict() for prescricao in prescrioes])

# Adicionar uma prescrição nova
@prescricoes_bp.route('/adicionar', methods=['POST'])
@jwt_required()
def add_prescricao():
    data = request.get_json()

    lista_remedios = data['lista_remedios'] if isinstance(data['lista_remedios'], list) else []

    newPrescricao = Prescricao(
        hc_paciente=data['hc_paciente'],
        lista_remedios=str(lista_remedios),
        data_entrada = datetime.now()
    )

    newPrescricao.status_prescricao = 1

    db.session.add(newPrescricao)
    db.session.commit()

    return jsonify({
        'message': 'Prescrição inserida com sucesso',
    }), 201

# Buscar prescrições por Id
@prescricoes_bp.route('/<prescricao_id>', methods=['GET'])
@jwt_required()
def listar_por_id(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    return jsonify(prescricao.as_dict()), 200

# Aprovar a prescrição
@prescricoes_bp.route('/aprovar/<prescricao_id>', methods=['PUT'])
@jwt_required()
def aprovar_prescricao(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    data = request.get_json()

    lista_remedios = data['lista_remedios'] if isinstance(data['lista_remedios'], list) else []

    prescricao.status_prescricao = data['status_prescricao']

    if(data['status_prescricao'] != 4):
        newPedido = Pedido(
            id_prescricao = prescricao_id,
            lista_remedios = str(lista_remedios),
            status_pedido = 1
        )
        
        db.session.add(newPedido)

    prescricao.data_avaliacao = datetime.now()
 
    # Fazer lógica para puxar o id do usuário que aprovou!

    db.session.commit()
    return jsonify({'Message': 'Prescricao aprovada com sucesso'}), 200

# Deletar a prescrição
@prescricoes_bp.route('/deletar/<prescricao_id>', methods=['DELETE'])
@jwt_required()
def deletar_prescricao(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    db.session.delete(prescricao)
    db.session.commit()
    return jsonify({'Message': 'Prescricao deletada com sucesso'}), 200