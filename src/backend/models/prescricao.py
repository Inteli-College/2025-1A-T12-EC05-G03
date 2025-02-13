from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM, ARRAY
from sqlalchemy import func, null
from .database import db  # Importação relativa

#Criando a tabela de prescrição
class Prescricao(db.Model):
    __tablename__ = 'prescricao'

    id = db.Column(db.Integer, nullable = False, primary_key=True)
    hc_paciente = db.Column(db.String(255), db.ForeignKey('paciente.hc'), nullable=False)
    lista_remedios = db.Column(db.Text, nullable=False)  
    aprovacao_farmaceutico = db.Column(db.Boolean, default=False)
    crf_farmaceutico = db.Column(db.Integer, db.ForeignKey('farmaceutico.crf'), nullable=False)
    datatime = db.Column(db.DateTime, nullable=True)

    # Fazendo a conexão com as outras tabelas
    paciente = db.relationship('Paciente', backref=db.backref('prescricoes', lazy=True))
    farmaceutico = db.relationship('Farmaceutico', backref=db.backref('prescricoes', lazy=True))



    def as_dict(self):
        return{
            'id': self.id,
            'hc_paciente': self.hc_paciente,
            'lista_remedios': self.lista_remedios,
            'aprovacao_farmaceutico':self.aprovacao_farmaceutico,
            'crf_farmaceutico': self.crf_farmaceutico,
            'datatime': self.datatime
        }