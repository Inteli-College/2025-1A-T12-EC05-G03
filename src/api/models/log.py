from .database import db

class Log(db.Model):
    __tablename__ = 'log'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    codigo_log = db.Column(db.Integer, db.ForeignKey('codigo_log.codigo'), nullable=False)
    hora_log = db.Column(db.DateTime, nullable=False)
    id_pedido = db.Column(db.Integer, db.ForeignKey('pedido.id'), nullable=False)
    id_remedio_em_separacao = db.Column(db.Integer, nullable=False)

    log = db.relationship('CodigoLog', backref=db.backref('logs', lazy=True))
    pedido = db.relationship('Pedido', backref=db.backref('logs', lazy=True))

    def as_dict(self):
        return {
            'id': self.id,
            'codigo_log': self.codigo_log,
            'hora_log': self.hora_log,
            'id_pedido': self.id_pedido,
            'id_remedio_em_separacao': self.id_remedio_em_separacao
        }
    
    def as_front(self):
        return{
            'id': self.id,
            'id_pedido': self.id_pedido,
            'id_remedio': self.id_remedio_em_separacao,
            'descricao': self.log.descricao,
            'hora': self.hora_log
        }