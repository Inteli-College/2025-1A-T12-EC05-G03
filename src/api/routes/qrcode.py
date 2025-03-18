from flask import Blueprint, jsonify, request
from ..models.lote import Lote
from ..models.database import db

qrcode_bp = Blueprint('qrcode', __name__, url_prefix='/qrcode')

@qrcode_bp.route('validar', methods=['GET'])
def validar_qrcode():
    data = request.get_json()

    remedio = (
    db.session.query(Lote)
    .filter((Lote.id_remedio == data['remedio_id']) & (Lote.bin_qrcode == data['qrcode_lido']))
    .first()
    )

    # remedio = Remedio.query.get_or_404(data['remedio_id'])

    if remedio is None:
        return jsonify({
            'message':'QRCode inválido'
        }), 404
    
    return jsonify({
            'message':'QRCode válido'
        }), 200

