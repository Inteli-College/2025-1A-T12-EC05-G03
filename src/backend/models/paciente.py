from sqlalchemy.dialects.postgresql import  UUID, TEXT, ENUM
from sqlalchemy import func
from .database import db  # Importação relativa

# criando a tabela de paciente
class Paciente(db.Model):
    __tablename__ = 'paciente' # Define o nome da tabela

    # Definindo as colunas
    hc = db.Column(db.String(255), primary_key=True, nullable=False) 
    nome = db.Column(db.String(255), nullable=False)
    idade = db.Column(db.Integer, nullable=False)
    cpf = db.Column(db.String(11), nullable=False)
    rg = db.Column(db.String(9), nullable=False)
    sexo = db.Column(ENUM('Masculino', 'Feminino', 'Outro', name='sexo_enum', create_type=True), nullable=False)
    CRM_medico = db.Column(db.String(100), nullable=False)
    leito = db.Column(db.Integer, nullable = False)

    # Função para transformar em json
    def as_dict(self):
        return{
            'HC': self.hc,
            'nome_paciente': self.nome,
            'idade': self.idade,
            'sexo': self.sexo,
            'cpf': self.cpf,
            'rg': self.rg,
            'CRM_medico': self.CRM_medico,
            'leito': self.leito,
        }