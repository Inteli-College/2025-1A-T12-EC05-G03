from flask import Blueprint, jsonify, request
from backend.models.farmaceutico import Farmaceutico
from backend.models.database import db

# criando a rota base
farmaceutico_bp = Blueprint('farmaceutico', __name__, url_prefix='/farmaceutico')

#Rotas:
#Listar todos os farmaceuticos
@farmaceutico_bp.route('/listar', methods=['GET'])
def listar_farmaceuticos():
    farmaceuticos = Farmaceutico.query.all()
    return jsonify([farmaceutico.as_dict() for farmaceutico in farmaceuticos])

# Cadastrar um novo farmaceutico
@farmaceutico_bp.route('/cadastrar', methods=['POST'])
def cadastrar_farmaceutico():
    data = request.get_json()

    newFarmaceutico = Farmaceutico(
        crf=data['crf'],
        nome_farmaceutico=data['nome_farmaceutico'],
    )
    db.session.add(newFarmaceutico)
    db.session.commit()

    return jsonify({
        'message': 'Farmaceutico cadastrado com sucesso',
    }), 201

# Buscar farmaceutico por crf
@farmaceutico_bp.route('/<farmaceutico_crf>', methods=['GET'])
def listar_por_crf(farmaceutico_crf):
    farmaceutico = Farmaceutico.query.get_or_404(farmaceutico_crf)
    return jsonify(farmaceutico.as_dict()), 200

# Apagar farmaceutico
@farmaceutico_bp.route('/deletar/<farmaceutico_crf>', methods=['DELETE'])
def deletar_farmaceutico(farmaceutico_crf):
    farmaceutico = Farmaceutico.query.get_or_404(farmaceutico_crf)
    db.session.delete(farmaceutico)
    db.session.commit()
    return jsonify({'Message': 'Farmacêutico deletado com sucesso'}), 200