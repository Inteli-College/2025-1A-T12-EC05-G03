from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM, ARRAY
from sqlalchemy import func
from .database import db  # Importação relativa

#criando a tabela farmaceuto
class Farmaceutico(db.Model):
    __tablename__ = 'farmaceutico' # Define o nome da tabela

    # Definindo as colunas
    crf = db.Column(db.Integer, nullable = False, primary_key=True)
    nome_farmaceutico = db.Column(db.String(255), nullable = False)

    # Função para transformar em json
    def as_dict(self):
        return{
            'crf': self.crf,
            'nome_farmaceutico': self.nome_farmaceutico,
        }