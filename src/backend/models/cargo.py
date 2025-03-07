from .database import db  # Importação relativa

#Criando a tabela de statusPedido
class Cargo(db.Model):
    __tablename__ = 'cargo' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    cargo = db.Column(db.String(100), nullable=False)

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'cargo':self.cargo
        }