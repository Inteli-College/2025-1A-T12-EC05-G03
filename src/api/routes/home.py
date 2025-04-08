from flask import Blueprint, jsonify, request
from ..models.prescricao import Prescricao
from ..models.pedido import Pedido
from ..models.remedio import Remedio
from ..models.database import db
from ..models.lote import Lote
from datetime import date, timedelta
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
        Pedido.status_pedido.in_([4, 5]),  # Alternativa correta
        func.date(Pedido.data_entrada) == date.today()
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

    prox_validade = listar_remedio_proximos_a_validade()
    lotes_acabando = listar_remedio_proximos_a_validade()

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
        },
        "notificacoes":{
            "validade": [lote.as_listar_pedido() for lote in prox_validade] if prox_validade else [],
            "lotes_acabando": [lote.as_listar_pedido() for lote in lotes_acabando] if lotes_acabando else []
        }
    }), 200

def listar_remedio_proximos_a_validade():

    data_limite = date.today() + timedelta(days=7)

    prox_validade = db.session.query(Lote).filter(
        Lote.data_validade.between(date.today(), data_limite)
    ).all()
       
    return prox_validade

def listar_lotes_com_baixa_quantidade():

    lotes_acabando = db.session.query(Lote).filter(
        Lote.quantidade <= 10
    ).all()

    return lotes_acabando

