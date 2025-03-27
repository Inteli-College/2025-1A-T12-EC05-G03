from flask import Blueprint, jsonify, request
from ..models.lote import Lote
from ..models.database import db

qrcode_bp = Blueprint('qrcode', __name__, url_prefix='/qrcode')

@qrcode_bp.route('/validar', methods=['POST'])
def validar_qrcode():
    data = request.get_json()

    # Validação dos campos
    if not data or 'qrcode_lido' not in data or 'qrcode_procurado' not in data:
        return jsonify({'erro': 'Dados insuficientes. Necessário informar qrcode_lido e qrcode_procurado'}), 400

    qrcode_lido = data['qrcode_lido']
    qrcode_procurado = data['qrcode_procurado']

    # Se os dois QR Codes forem iguais → válido
    if qrcode_lido == qrcode_procurado:
        return jsonify({'message': 'QRCode válido'}), 200

    # QR Code inválido → busca lote com bin_qrcode igual ao qrcode_procurado
    lote = (
        db.session.query(Lote)
        .filter(Lote.bin_qrcode == qrcode_procurado)
        .first()
    )

    if lote:
        lote.quantidade += 1
        db.session.commit()
        return jsonify({'erro': f'QRCode inválido. Estoque incrementado em +1 no lote ID {lote.id}.'}), 404

    return jsonify({'erro': 'QRCode inválido e nenhum lote encontrado com o QR Code procurado.'}), 404
