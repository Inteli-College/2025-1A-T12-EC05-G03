from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM, ARRAY
from sqlalchemy import func
from .database import db  # Importação relativa

#criando a tabela farmaceuto
class Farmaceutico(db.Model):
    __tablename__ = 'farmaceutico'

    id = db.Column(db.Integer, nullable = False, primary_key=True)
    nome_farmaceutico = db.Column(db.String(255), nullable = False)

    def as_dict(self):
        return{
            'id': self.id,
            'nome_farmaceutico': self.nome_farmaceutico,
        }