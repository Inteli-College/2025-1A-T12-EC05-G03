from flask import Blueprint, jsonify, request
from ..models.lote import Lote
from ..models.database import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date, datetime, timedelta
from sqlalchemy.exc import SQLAlchemyError


lote_bp = Blueprint('lotes', __name__, url_prefix='/lotes')

@lote_bp.route('/cadastrar', methods=['POST'])
@jwt_required()
def cadastrar_lote():
    data = request.get_json()

    validade = datetime.strptime(data['data_validade'], "%Y-%m-%d").date()
    data_atual = datetime.now().date()

    if validade <= data_atual:
        return jsonify({'error': 'Data de validade inválida'}), 404

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

@lote_bp.route('/listar', methods = ['GET'])
def listar_lotes():
    lotes = Lote.query.all()
    return jsonify([lote.as_dict() for lote in lotes])


@lote_bp.route('/remedio/<id_remedio>', methods = ['GET'])
def listar_por_id_remedio(id_remedio):

    lotes_id = db.session.query(Lote).filter(Lote.id_remedio == id_remedio).all()

    if not lotes_id:
        return jsonify({
            'Message': 'Não foi encontrado nenhum lote para esse remédio'
        }), 404

    return jsonify([log.as_dict() for log in lotes_id]),200





@lote_bp.route('/deletar/<int:lote_id>', methods=['DELETE'])
@jwt_required()
def deletar_lote(lote_id):
    try:
        lote = Lote.query.get_or_404(lote_id)
        db.session.delete(lote)
        db.session.commit()
        return jsonify({'message': 'Lote deletado com sucesso'}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': 'Erro ao deletar lote', 'details': str(e)}), 500

