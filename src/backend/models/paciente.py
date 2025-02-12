from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  # Importação relativa

# criando a tabela de paciente
class Paciente(db.Model):
    __tablename__ = 'paciente'

    hc = db.Column(db.String(255), primary_key=True, nullable=False) 
    nome_paciente = db.Column(db.String(255), nullable=False)
    idade = db.Column(db.Integer, nullable=False)
    sexo = db.Column(ENUM('Masculino', 'Feminino', 'Outro', name='sexo_enum', create_type=True), nullable=False)
    endereco = db.Column(TEXT(), nullable=False)
    CRM_medico = db.Column(db.String(100), nullable=False)
    leito = db.Column(db.Integer, nullable = False)


    def as_dict(self):
        return{
            'HC': self.hc,
            'nome_paciente': self.nome_paciente,
            'idade': self.idade,
            'sexo': self.sexo,
            'endereco': self.endereco,
            'CRM_medico': self.CRM_medico,
            'leito': self.leito,
        }