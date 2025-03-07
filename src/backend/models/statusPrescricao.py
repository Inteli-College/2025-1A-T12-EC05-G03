from .database import db  # Importação relativa

#Criando a tabela de statusPrescricao
class StatusPrescricao(db.Model):
    __tablename__ = 'status_prescricao'  # Certifique-se de que está assim

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    status_prescricao = db.Column(db.String(255), nullable=False)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'status_prescricao':self.status_prescricao
        }