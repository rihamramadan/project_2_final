from .app import db

class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.BigInteger, primary_key=True)
    price = db.Column(db.BigInteger)
    host_neighbourhood = db.Column(db.Float)
    review_scores_rating = db.Column(db.BigInteger)

    def __repr__(self):
        return '<Listing %r>' % (self.name)
