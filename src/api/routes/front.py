from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from ..models.user import User
from ..models.database import db
from flask import render_template


front_bp = Blueprint('front', __name__, url_prefix='/')


@front_bp.route('/', methods=['GET'])
def padrao():
    return render_template('login.html')
@front_bp.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')

@front_bp.route('/home', methods=['GET'])
def home_page():
    return render_template('home-page.html')

@front_bp.route('/cadastro', methods=['GET'])
def cadastro_page():
    return render_template('cadastro.html')

@front_bp.route('/historico', methods=['GET'])
def historico_page():
    return render_template('historico.html')

@front_bp.route('/estoque', methods=['GET'])
def estoque_page():
    return render_template('estoque.html')