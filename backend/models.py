from extension import db

class Users(db.Model):
  __tablename__='user_table'
  userid=db.Column(db.Integer, primary_key=True)
  email=db.Column(db.String(60))
  password=db.Column(db.String(200))
  def __repr__(self):
        return f'<User {self.email}>'
