from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  # Importação relativa

# criando a tabela de paciente
class Remedio(db.Model):
    __tablename__ = 'remedio' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, nullable = False, primary_key=True)
    id_lote = db.Column(db.Integer, db.ForeignKey('lote.id'), nullable=False)
    principio_ativo = db.Column(db.String(255), nullable=False)
    bin_qrcode = db.Column(db.Integer, nullable=False)

    # Fazendo a conexão com as outras tabelas
    lote_obj = db.relationship('Lote', backref=db.backref('remedios', lazy=True))

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'id_lote': self.id_lote,
            'principio_ativo': self.principio_ativo,
            'bin_qrcode': self.bin_qrcode
        }