from flask import Blueprint, jsonify, request
from ..models.lote import Lote
from ..models.database import db

qrcode_bp = Blueprint('qrcode', __name__, url_prefix='/qrcode')

@qrcode_bp.route('/validar', methods=['POST'])
def validar_qrcode():
    data = request.get_json()

    if not data or 'id_remedio' not in data or 'bin_qrcode' not in data:
        return jsonify({'erro': 'Dados insuficientes. Necessário informar id_remedio e bin_qrcode'}), 400

    id_remedio = data['id_remedio']
    bin_qrcode = data['bin_qrcode']

    # Busca lote com QRCode correspondente (válido)
    lote_valido = (
        db.session.query(Lote)
        .filter((Lote.id_remedio == id_remedio) & (Lote.bin_qrcode == bin_qrcode))
        .first()
    )

    if lote_valido:
        return jsonify({'message': 'QRCode válido'}), 200

    # QR Code inválido → incrementar quantidade de algum lote daquele remédio
    lote_para_incrementar = (
        db.session.query(Lote)
        .filter(Lote.id_remedio == id_remedio)
        .first()
    )

    if lote_para_incrementar:
        lote_para_incrementar.quantidade += 1
        db.session.commit()
        return jsonify({'erro': 'QRCode inválido. Estoque incrementado em +1 no lote ID {}.'.format(lote_para_incrementar.id)}), 404

    return jsonify({'erro': f'Remédio ID {id_remedio} não encontrado em nenhum lote'}), 404

