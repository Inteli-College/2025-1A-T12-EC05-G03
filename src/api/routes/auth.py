from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from models.user import User
from models.database import db


auth_bp = Blueprint('auth', __name__, url_prefix='/')


@auth_bp.route('/register', methods=['POST'])
def register():
    from main import bcrypt

    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email já Cadastrado!"}), 400

    hashed_senha = bcrypt.generate_password_hash(senha).decode('utf-8')
    new_user = User(
        email=email, 
        senha=hashed_senha,
        nome_completo = data['nome_completo'],
        id_cargo = data['id_cargo']
        )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuário registrado com sucesso!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    from main import bcrypt

    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.senha, senha):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200

    return jsonify({"error": "Usuário ou senha inválidos"}), 401
