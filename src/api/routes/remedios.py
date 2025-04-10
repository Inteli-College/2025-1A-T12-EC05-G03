from flask import Blueprint, jsonify, request
from ..models.remedio import Remedio
from ..models.database import db
from flask_jwt_extended import jwt_required, get_jwt_identity

remedios_bp = Blueprint('remedios', __name__, url_prefix='/remedios')

@remedios_bp.route('/cadastrar', methods=['POST'])
@jwt_required()
def cadastrar_remedio():
    data = request.get_json()

    newRemedio = Remedio(
        principio_ativo = data['principio_ativo'],
        dosagem_em_mg = data['dosagem_em_mg']
    )

    db.session.add(newRemedio)
    db.session.commit()

    return jsonify({
        'message': 'Remedio cadastrado com sucesso',
    }), 201

@remedios_bp.route('/listar', methods = ['GET'])
def listar_remedios():
    remedios = Remedio.query.all()
    return jsonify([remedio.as_dict() for remedio in remedios])
