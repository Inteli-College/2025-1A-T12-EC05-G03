from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  # Importação relativa

# criando a tabela de paciente
class Remedio(db.Model):
    __tablename__ = 'remedio'

    # Definindo as colunas
    id = db.Column(db.Integer, nullable = False, primary_key=True)
    principio_ativo = db.Column(db.String(255), nullable=False)
    dosagem_em_mg = db.Column(db.Integer, nullable= False)
    

    # Função para transformar em json
    def as_dict(self):
        return {
            'id': self.id,
            'principio_ativo': self.principio_ativo,
            'dosagem_em_mg': self.dosagem_em_mg
        }