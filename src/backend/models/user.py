from .database import db  # Importação relativa

#Criando a tabela de User
class User(db.Model):
    __tablename__ = 'user' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    farmaceutico = db.Column(db.Boolean, nullable=False)
    crf = db.Column(db.String(80), nullable = False)


    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'username': self.username,
            'senha': self.senha,
            'farmaceutico': self.farmaceutico,
            'crf': self.crf
        }