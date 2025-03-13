from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  # Importação relativa

# criando a tabela de paciente
class Remedio(db.Model):
    __tablename__ = 'remedio'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_lote = db.Column(db.Integer, db.ForeignKey('lote.id'), nullable=False)  # Agora faz referência corretamente
    principio_ativo = db.Column(db.String(255), nullable=False)
    bin_qrcode = db.Column(db.Integer, nullable=False)

    lote_obj = db.relationship('Lote', backref=db.backref('remedios', lazy=True))

    def as_dict(self):
        return {
            'id': self.id,
            'id_lote': self.id_lote,
            'principio_ativo': self.principio_ativo,
            'bin_qrcode': self.bin_qrcode
        }