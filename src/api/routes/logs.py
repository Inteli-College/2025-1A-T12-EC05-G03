from flask import Blueprint, jsonify, request
from ..models.log import Log
from ..models.lote import Lote
from ..models.database import db
from datetime import datetime

log_bp = Blueprint('logs', __name__, url_prefix = '/logs')

@log_bp.route('/cadastrar', methods = ['POST'])
def cadastrar_log():
    data = request.get_json()

    lote = db.session.query(Lote).filter(Lote.bin_qrcode == data['id_remedio_em_separacao']).first()

    newLog = Log(
        id_pedido = data['id_pedido'],
        id_remedio_em_separacao = lote.id_remedio,
        codigo_log = data['codigo_log'],
        hora_log = datetime.now()
    )
    
    db.session.add(newLog)
    db.session.commit()

    return jsonify({
        'message':'log cadastrado com sucesso'
    }), 201


@log_bp.route('/listar', methods = ['GET'])
def listar_all_logs():
    logs = Log.query.all()
    return jsonify([log.as_front() for log in logs])


@log_bp.route('/pedido/<id_pedido>', methods = ['GET'])
def listar_por_id_pedido(id_pedido):

    logs_id = db.session.query(Log).filter(Log.id_pedido == id_pedido).all()

    if not logs_id:
        return jsonify({
            'Message': 'Não foi encontrado nenhum log para esse pedido'
        }), 404

    return jsonify([log.as_dict() for log in logs_id]),200


