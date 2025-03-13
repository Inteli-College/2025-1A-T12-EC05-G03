from flask import Blueprint, jsonify, request
from models.remedio import Remedio
from models.database import db
from flask_jwt_extended import jwt_required, get_jwt_identity

remedios_bp = Blueprint('remedios', __name__, url_prefix='/remedios')

@remedios_bp.route('/cadastrar', methods=['POST'])
@jwt_required()
def cadastrar_remedio():
    data = request.get_json()

    newRemedio = Remedio(
        principio_ativo = data['principio_ativo'],
        bin_qrcode = data['bin_qrcode']
    )

    db.session.add(newRemedio)
    db.session.commit()

    return jsonify({
        'message': 'Remedio cadastrado com sucesso',
    }), 201