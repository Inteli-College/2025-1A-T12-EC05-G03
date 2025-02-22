from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  # Importação relativa

# criando a tabela de paciente
class Remedio(db.Model):
    __tablename__ = 'remedio' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, nullable = False, primary_key=True)
    nome = db.Column(db.String(255), nullable=False)
    principio = db.Column(db.String(255), nullable=False)
    lote_id = db.Column(db.String(255), db.ForeignKey('lote.id'), nullable=False)
    bin = db.Column(db.Integer, nullable=False)
    fabricante = db.Column(db.String(255), nullable=False)

    # Fazendo a conexão com as outras tabelas
    lote_obj = db.relationship('Lote', backref=db.backref('remedios', lazy=True))

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'nome': self.nome,
            'principio': self.principio,
            'lote_id': self.lote_id,
            'bin': self.bin,
            'fabricante': self.fabricante
        }