from flask import Blueprint, jsonify, request
from models.log import Log
from models.database import db
from datetime import datetime

log_bp = Blueprint('logs', __name__, url_prefix = '/logs')

@log_bp.route('/cadastrar', methods = ['POST'])
def cadastrar_log():
    data = request.get_json()

    newLog = Log(
        id_pedido = data['id_pedido'],
        id_remedio_em_separacao = data['id_remedio_em_separacao'],
        codigo_log = data['codigo_log'],
        hora_log = datetime.now()
    )
    
    db.session.add(newLog)
    db.session.commit()

    return jsonify({
        'message':'log cadastrado com sucesso'
    }), 201