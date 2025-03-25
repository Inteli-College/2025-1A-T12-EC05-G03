from flask import Blueprint, jsonify, request
from ..models.prescricao import Prescricao
from ..models.pedido import Pedido
from ..models.remedio import Remedio
from ..models.database import db
from datetime import date
from sqlalchemy.sql import func
import json

home_bp = Blueprint('home', __name__, url_prefix='/home')


@home_bp.route('/atualizar', methods=['GET'])
def atualizar_pedidos_home():
    pedidos_aguardando_separacao = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 1) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )
    pedidos_em_separacao = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 2) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )
    pedidos_em_revisao = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 3) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )
    pedidos_concluidos = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 4) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )

    pedidos_concluidos = (
    db.session.query(Pedido)
    .filter(
        (Pedido.status_pedido == 4) &
        (func.date(Pedido.data_entrada) == date.today())
    )
    .all()
    )

    prescricoes_aguardando = (
        db.session.query(Prescricao)
        .filter(
            (Prescricao.status_prescricao == 1) &
            (func.date(Prescricao.data_entrada) == date.today())
        )
    )

    prescricoes_avaliadas = (
        db.session.query(Prescricao)
        .filter(
            (Prescricao.status_prescricao != 1) &
            (func.date(Prescricao.data_entrada) == date.today())
        )
    )

    return jsonify({
        "prescricoes":{
            "aguardandoAvaliacao":[aguardando.as_front() for aguardando in prescricoes_aguardando],
            "avaliadas": [avaliadas.as_front() for avaliadas in prescricoes_avaliadas],
        },
        "pedidos":{
            "aguardandoSeparacao":  [aguardando.as_dict() for aguardando in pedidos_aguardando_separacao],
            "emSeparacao": [separacao.as_dict() for separacao in pedidos_em_separacao],
            "emRevisao": [revisao.as_dict() for revisao in pedidos_em_revisao],
            "concluidos": [concluido.as_dict() for concluido in pedidos_concluidos],
        }
    }), 200

    # return jsonify({
    #     "Prescricoes aguardando avaliacao": [aguardando.as_dict() for aguardando in prescricoes_aguardando],
    #     "Prescricoes avaliadas": [avaliadas.as_dict() for avaliadas in prescricoes_avaliadas],
    #     "Aguardando Separacao": [aguardando.as_dict() for aguardando in pedidos_aguardando_separacao],
    #     "Em Separação": [separacao.as_dict() for separacao in pedidos_em_separacao],
    #     "Em Revisão": [revisao.as_dict() for revisao in pedidos_em_revisao],
    #     "Concluído": [concluido.as_dict() for concluido in pedidos_concluidos],
    # }), 200


