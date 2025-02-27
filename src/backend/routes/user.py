from flask import Blueprint, jsonify, request
from backend.models.user import User
from backend.models.database import db
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from main import bcrypt, jwt, app

# criando a rota base
# user_bp = Blueprint('user', __name__, url_prefix='/user')

#Rotas:
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"Mensagem": "Usuário criado com sucesso"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    return jsonify({"Mensagem": "Credenciais inválidas"}), 401