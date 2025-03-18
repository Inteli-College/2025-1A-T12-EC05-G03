from flask import Blueprint, jsonify, request
from ..models.lote import Lote
from ..models.database import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

lote_bp = Blueprint('lotes', __name__, url_prefix='/lotes')

@lote_bp.route('/cadastrar', methods=['POST'])
@jwt_required()
def cadastrar_lote():
    data = request.get_json()

    validade = datetime.strptime(data['data_validade'], "%Y-%m-%d")

    newLote = Lote(
        num_lote = data['num_lote'],
        data_validade = validade,
        fabricante = data['fabricante'],
        id_remedio = data['id_remedio'],
        quantidade = data['quantidade'],
        bin_qrcode = data['bin_qrcode'],
    )

    db.session.add(newLote)
    db.session.commit()

    return jsonify({
        'message': 'Lote cadastrado com sucesso',
    }), 201
