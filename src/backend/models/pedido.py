from .database import db  # Importação relativa

#Criando a tabela de Pedido
class Pedido(db.Model):
    __tablename__ = 'pedido' # Define o nome da tabela

    # Definindo as colunas
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    id_prescricao = db.Column(db.Integer, db.ForeignKey('prescricao.id'), nullable=False)
    lista_remedios = db.Column(db.Text, nullable=False)
    status_pedido = db.Column(db.Integer, db.ForeignKey('statusPedido.id'), nullable=False)
    data_finalizacao = db.Column(db.DateTime, nullable=True)

    # Fazendo a conexão com as outras tabelas
    prescricao = db.relationship('Prescricao', backref=db.backref('pedido', lazy=True))
    statusPedido = db.relationship('StatusPedido', backref=db.backref('pedidos', lazy=True))

    # Função para transformar em json
    def as_dict(self):
        return{
            'id': self.id,
            'id_prescricao': self.id_prescricao,
            'lista_remedios': self.lista_remedios,
            'status_pedido':self.status_pedido,
            'data_finalizacao': self.data_finalizacao
        }