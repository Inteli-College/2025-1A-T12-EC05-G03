from flask import Flask
from backend.routes.prescricoes import prescricoes_bp
from backend.routes.pedidos import pedidos_bp
from backend.routes.auth import auth_bp
import os
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt





from flask_sqlalchemy import SQLAlchemy
from backend.models.database import db  # Importa o SQLAlchemy
from backend.models.statusPedido import StatusPedido
from backend.models.statusPrescricao import StatusPrescricao
from backend.models.cargo import Cargo
from backend.models.lote import Lote
from backend.models.remedio import Remedio
from backend.models.paciente import Paciente
from backend.models.user import User
from backend.models.pedido import Pedido
from backend.models.prescricao import Prescricao


app = Flask(__name__)

# Define o caminho para a pasta `data`
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "data", "database.db")

# Configura o banco de dados para salvar na pasta `data/`
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_SECRET_KEY'] = 'NDCSuprema'  # Troque por uma chave segura
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


# Inicializa o banco no app
db.init_app(app)

# Criando o banco de dados e tabelas

with app.app_context():
    db.create_all()
    
# Chamadnas as rotas que foram criadas no outro arquivo
app.register_blueprint(prescricoes_bp)
app.register_blueprint(pedidos_bp)
app.register_blueprint(auth_bp)



# Configurando para iniciar o projeto
if __name__ == '__main__':
    app.run(
        debug=True,
        )