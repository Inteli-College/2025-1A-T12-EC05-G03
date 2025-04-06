from flask import Blueprint, jsonify, request
from ..models.prescricao import Prescricao
from ..models.pedido import Pedido
from ..models.remedio import Remedio
from ..models.lote import Lote
from ..models.user import User
from ..models.database import db
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
import json


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
    ids_remedios = json.loads(prescricao.lista_remedios) if isinstance(prescricao.lista_remedios, str) else []

    # Filtra apenas os remédios com IDs na lista
    remedios = Remedio.query.filter(Remedio.id.in_(ids_remedios)).all()

    return jsonify({
        "prescricao": prescricao.as_front(),
        "remedios": [remedio.as_dict() for remedio in remedios]  # Corrigido para singular
    }), 200


@prescricoes_bp.route('/aprovar/<prescricao_id>', methods=['PUT'])
@jwt_required()
def aprovar_prescricao(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    
    # Obtém os dados enviados na requisição
    data = request.get_json()
    
    # Verifica se foi enviada uma nova lista de remédios na requisição
    lista_remedios = data.get('lista_remedios', [])

    # Atualiza o status da prescrição
    prescricao.status_prescricao = data['status_prescricao']

    if prescricao.status_prescricao == 4:
        prescricao.data_avaliacao = datetime.now()
        prescricao.id_aprovador = get_jwt_identity()
        db.session.commit()
        return jsonify({'message': 'Prescrição atualizada para status 4'}), 200
        
    lotes_utilizados = []
    for id_remedio in lista_remedios:
        lote_usado = Lote.query.filter_by(id_remedio=id_remedio) \
                       .filter(Lote.quantidade > 0) \
                       .order_by(Lote.data_validade) \
                       .first()
        if not lote_usado:
            return jsonify({'error': f'O Remédio com id {id_remedio} não possue mais lote'}), 404
        
        lote_usado.quantidade -= 1
        lotes_utilizados.append(lote_usado)

    # Criar o pedido com os remédios aprovados
    newPedido = Pedido(
        id_prescricao=prescricao_id,
        lista_remedios=json.dumps([l.bin_qrcode for l in lotes_utilizados]),
        status_pedido=1,
        data_entrada=datetime.now()
    )
    
    db.session.add(newPedido)

    # Atualiza a data de avaliação e o aprovador
    prescricao.data_avaliacao = datetime.now()
    prescricao.id_aprovador = get_jwt_identity()

    # Salva todas as alterações no banco
    db.session.commit()

    return jsonify({
        'message': 'Prescrição aprovada com sucesso',
    }), 200


# Deletar a prescrição
@prescricoes_bp.route('/deletar/<prescricao_id>', methods=['DELETE'])
@jwt_required()
def deletar_prescricao(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    db.session.delete(prescricao)
    db.session.commit()
    return jsonify({'Message': 'Prescricao deletada com sucesso'}), 200