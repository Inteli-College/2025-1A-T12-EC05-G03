from .database import db  # Importação relativa

#Criando a tabela de prescrição
class Prescricao(db.Model):
    __tablename__ = 'prescricao' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    hc_paciente = db.Column(db.String(255), db.ForeignKey('paciente.hc'), nullable=False)
    lista_remedios = db.Column(db.Text, nullable=False)  
    status_prescricao = db.Column(db.Integer, db.ForeignKey('statusPrescricao.id'), nullable=True)
    crf_farmaceutico = db.Column(db.Integer, db.ForeignKey('farmaceutico.crf'), nullable=True)
    data_aprovacao = db.Column(db.DateTime, nullable=True)

    # Fazendo a conexão com as outras tabelas
    paciente = db.relationship('Paciente', backref=db.backref('prescricoes', lazy=True))
    statusPrescricao = db.relationship('StatusPrescricao', backref=db.backref('prescricoes', lazy=True))


    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'hc_paciente': self.hc_paciente,
            'lista_remedios': self.lista_remedios,
            'status_prescricao':self.status_prescricao,
            'crf_farmaceutico': self.crf_farmaceutico,
            'datatime': self.datatime
        }