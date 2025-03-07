from .database import db  # Importação relativa

#Criando a tabela de User
class User(db.Model):
    __tablename__ = 'user' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    nome_completo = db.Column(db.String(200), nullable=False)
    senha = db.Column(db.Boolean, nullable=False)
    id_cargo = db.Column(db.Integer,db.ForeignKey('cargo.id'), nullable = False)

# Fazendo a conexão com as outras tabelas
    cargo = db.relationship('Cargo', backref=db.backref('users', lazy=True))


    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'email': self.email,
            'nome_completo': self.nome_completo,
            'senha': self.senha,
            'id_cargo': self.id_cargo
        }