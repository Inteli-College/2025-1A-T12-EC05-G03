from flask import Flask,send_from_directory
from .routes.prescricoes import prescricoes_bp
from .routes.pedidos import pedidos_bp
from .routes.auth import auth_bp
from .routes.logs import log_bp
from .routes.remedios import remedios_bp
from .routes.lotes import lote_bp
from .routes.rotas_qrcode import qrcode_bp
from .routes.home import home_bp
from .routes.front import front_bp
import os
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS



from flask_sqlalchemy import SQLAlchemy
from .models.database import db  # Importa o SQLAlchemy
from .models.statusPedido import StatusPedido
from .models.statusPrescricao import StatusPrescricao
from .models.cargo import Cargo
from .models.lote import Lote
from .models.remedio import Remedio
from .models.paciente import Paciente
from .models.user import User
from .models.pedido import Pedido
from .models.prescricao import Prescricao
from .models.codigo_log import CodigoLog
from .models.log import Log


app = Flask(__name__, 
            template_folder='../front-end',  # Diretório onde estão os templates HTML
            static_folder='../front-end')
CORS(app)

# Rota para servir arquivos da pasta media (fora da pasta static)
@app.route('/media/<path:filename>')
def media(filename):
    media_folder = os.path.join(app.root_path, '../../media')  # Caminho para a pasta media
    return send_from_directory(media_folder, filename)

# Configura o banco de dados para salvar na pasta `data/`
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://ndcdb_w9zl_user:IYinpUeKcoIJpg1pgjTyz0FIBNoJu2nb@dpg-cv9m763qf0us73c9gpb0-a.oregon-postgres.render.com/ndcdb_w9zl"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_SECRET_KEY'] = 'NDCSuprema' 
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
app.register_blueprint(log_bp)
app.register_blueprint(remedios_bp)
app.register_blueprint(qrcode_bp)
app.register_blueprint(lote_bp)
app.register_blueprint(home_bp)
app.register_blueprint(front_bp)





# Configurando para iniciar o projeto
if __name__ == '__main__':
    app.run(
        debug=True,
        )