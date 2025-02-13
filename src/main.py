from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from backend.models.paciente import Paciente
from backend.models.farmaceutico import Farmaceutico
from backend.models.prescricao import Prescricao
from backend.models.lote import Lote
from backend.models.remedio import Remedio
from backend.routes.prescricoes import prescricoes_bp  
import os
from backend.models.database import db  # Importa o SQLAlchemy

app = Flask(__name__)

# Define o caminho para a pasta `data`
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "data", "database.db")

# Configura o banco de dados para salvar na pasta `data/`
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicializa o banco no app
db.init_app(app)

# Criando o banco de dados e tabelas
with app.app_context():
    db.create_all()

# Chamadnas as rotas que foram criadas no outro arquivo
app.register_blueprint(prescricoes_bp)

# Configurando para iniciar o projeto
if __name__ == '__main__':
    app.run(
        debug=True,
        port=8080,
        host='0.0.0.0'
        )