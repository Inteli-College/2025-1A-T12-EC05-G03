from flask import Blueprint, jsonify, request
from ..models.lote import Lote
from ..models.database import db

qrcode_bp = Blueprint('qrcode', __name__, url_prefix='/qrcode')

@qrcode_bp.route('/validar', methods=['POST'])
def validar_qrcode():
    data = request.get_json()

    if not data or 'remedio_id' not in data or 'qrcode_lido' not in data:
        return jsonify({'erro': 'Dados insuficientes. Necessário informar remedio_id e qrcode_lido'}), 400

    remedio_id = data['remedio_id']
    qrcode_lido = data['qrcode_lido']

    # Busca o remédio pelo ID 
    remedio = Lote.query.get(remedio_id)

    if not remedio:
        return jsonify({'erro': f'Remédio ID {remedio_id} não existe'}), 404

    # Verificação do QR Code
    if remedio.bin_qrcode != qrcode_lido:
        # QR Code inválido -> incrementa estoque +1
        remedio.quantidade += 1
        db.session.commit()
        return jsonify({
            'erro': 'QRCode inválido para o remédio. Estoque incrementado em +1.'
        }), 404

    # QRCode válido
    return jsonify({'message': 'QRCode válido'}), 200
