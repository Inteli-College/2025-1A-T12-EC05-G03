from .database import db  # Importação relativa

class CodigoLog(db.Model):
    __tablename__ = 'codigo_log'

    codigo = db.Column(db.Integer, primary_key=True, nullable=False)
    descricao = db.Column(db.Text, nullable=False)

    def as_dict(self):
        return {
            'codigo': self.codigo,
            'descricao': self.descricao
        }