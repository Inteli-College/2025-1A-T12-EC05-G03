from .database import db  # Importação relativa

#Criando a tabela de statusPrescricao
class StatusPrescricao(db.Model):
    __tablename__ = 'statusPrescricao' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    status = db.Column(db.String(255), nullable=False)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'status':self.status
        }