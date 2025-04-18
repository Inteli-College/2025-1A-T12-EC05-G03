from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  

class Lote(db.Model):
    __tablename__ = 'lote'  # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    num_lote = db.Column(db.String(100), nullable=False)
    data_validade = db.Column(db.Date, nullable=True)
    fabricante = db.Column(db.String(255), nullable=False)
    id_remedio = db.Column(db.Integer, db.ForeignKey('remedio.id'), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)
    bin_qrcode = db.Column(db.Text, nullable=False)


    remedio_lote = db.relationship('Remedio', backref=db.backref('lotes', lazy=True))


    def as_dict(self):
        return {
            'id': self.id,
            'num_lote': self.num_lote,
            'data_validade': self.data_validade,
            'fabricante': self.fabricante,
            'id_remedio': self.id_remedio,
            'quantidade': self.quantidade,
            'bin_qrcode': self.bin_qrcode
        }
    
    def as_listar_pedido(self):
        return {
            'id': self.id,
            'id_remedio': self.id_remedio,
            'quantidade': self.quantidade,
            'principio_ativo': self.remedio_lote.principio_ativo,
            'dosagem_em_mg': self.remedio_lote.dosagem_em_mg,
            'quantidade': self.quantidade,
            'data_validade': self.data_validade,
            'num_lote': self.num_lote,

        }