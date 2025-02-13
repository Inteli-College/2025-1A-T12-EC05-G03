from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  # Importação relativa

# criando a tabela de paciente
class Remedio(db.Model):
    __tablename__ = 'remedio'

    id = db.Column(db.Integer, nullable = False, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    principio = db.Column(db.String(255), nullable=False)
    lote = db.Column(db.String(255), nullable=False)
    bin = db.Column(db.Int, nullable=False)
    fabricante = db.Column(db.String(255), nullable=False)

    lote = db.relationship('Lote', backref=db.backref('remedios', lazy=True))


    def as_dict(self):
        return{
            'id': self.id,
            'nome': self.nome,
            'principio': self.principio,
            'lote': self.lote,
            'bin': self.bin,
            'fabricante': self.fabricante
        }