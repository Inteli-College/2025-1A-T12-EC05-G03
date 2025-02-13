from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  

# criando a tabela de paciente
class Lote(db.Model):
    __tablename__ = 'lote'

    lote = db.Column(db.String(100), nullable=False, primary_key=True)
    data_validade = db.Column(db.DateTime, nullable=True)
    fabricante = db.Column(db.String(255), nullable=False)

    def as_dict(self):
        return{
            'id': self.id,
            'lote': self.lote,
            'data_validade': self.data_validade,
            'fabricante': self.fabricante
        }