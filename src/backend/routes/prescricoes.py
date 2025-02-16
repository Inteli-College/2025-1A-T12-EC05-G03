from flask import Blueprint, jsonify, request
from backend.models.prescricao import Prescricao
from backend.models.database import db
from datetime import datetime

# criando a rota base
prescricoes_bp = Blueprint('prescricoes', __name__, url_prefix='/prescricoes')

#Rotas:
#Listar todas as prescrições
@prescricoes_bp.route('/listar', methods=['GET'])
def listar_prescricoes():
    prescrioes = Prescricao.query.all()
    return jsonify([prescricao.as_dict() for prescricao in prescrioes])

# Adicionar uma prescrição nova
@prescricoes_bp.route('/adicionar', methods=['POST'])
def add_prescricao():
    data = request.get_json()

    lista_remedios = data['lista_remedios'] if isinstance(data['lista_remedios'], list) else []

    newPrescricao = Prescricao(
        hc_paciente=data['hc_paciente'],
        lista_remedios=str(lista_remedios),
        datatime= datetime.now(),
    )

    db.session.add(newPrescricao)
    db.session.commit()

    return jsonify({
        'message': 'Prescrição inserida com sucesso',
    }), 201

# Buscar prescrições por Id
@prescricoes_bp.route('/<prescricao_id>', methods=['GET'])
def listar_por_id(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    return jsonify(prescricao.as_dict()), 200

# Aprovar a prescrição
@prescricoes_bp.route('/aprovar/<prescricao_id>', methods=['PATCH'])
def aprovar_prescricao(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    data = request.get_json()
    prescricao.crf_farmaceutico = data['crf_farmaceutico']
    prescricao.aprovacao_farmaceutico = True

    db.session.commit()
    return jsonify({'Message': 'Prescricao aprovada com sucesso'}), 200

# Deletar a prescrição
@prescricoes_bp.route('/deletar/<prescricao_id>', methods=['DELETE'])
def deletar_prescricao(prescricao_id):
    prescricao = Prescricao.query.get_or_404(prescricao_id)
    db.session.delete(prescricao)
    db.session.commit()
    return jsonify({'Message': 'Prescricao deletada com sucesso'}), 200