from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  

# criando a tabela de paciente
class Lote(db.Model):
    __tablename__ = 'lote' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    num_lote = db.Column(db.String(100), nullable=False)
    data_validade = db.Column(db.DateTime, nullable=True)
    fabricante = db.Column(db.String(255), nullable=False)
    id_remedio = db.Column(db.Integer, db.ForeignKey('remedio.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

    remedio_lote = db.relationship('Remedio', backref=db.backref('lotes', lazy=True))


    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'num_lote': self.num_lote,
            'data_validade': self.data_validade,
            'fabricante': self.fabricante,
            'id_remedio': self.id_remedio,
            'quantidade': self.quantidade
        }