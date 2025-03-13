from flask import Blueprint, jsonify, request
from models.remedio import Remedio

qrcode_bp = Blueprint('qrcode', __name__, url_prefix='/qrcode')

@qrcode_bp.route('validar', methods=['GET'])
def validar_qrcode():
    data = request.get_json()

    remedio = Remedio.query.get_or_404(data['remedio_id'])

    if (remedio.bin_qrcode != data['qrcode_lido']):
        return jsonify({
            'message':'QRCode inválido'
        }), 404
    
    return jsonify({
            'message':'QRCode válido'
        }), 200

