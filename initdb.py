from airbnb_listings.app import db

@app.before_first_request
def setup():
# db.drop_all()
db.create_all()
