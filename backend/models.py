from extension import db
from sqlalchemy.dialects.postgresql import JSONB

class Users(db.Model):
  __tablename__='user_login'
  userid=db.Column(db.String(36), primary_key=True)
  email=db.Column(db.String(60))
  password=db.Column(db.String(200))
  def __repr__(self):
        return f'<User {self.email}>'


class Profile(db.Model):
   __tablename__='user_profile'
   email=db.Column(db.String(60), primary_key=True)
   f_name=db.Column(db.String(30))
   l_name=db.Column(db.String(30))
   code=db.Column(db.String(6))
   mobile=db.Column(db.String(10))
   country=db.Column(db.String(30))
   city=db.Column(db.String(30))
   pin=db.Column(db.String(8))
   company=db.Column(db.String(20))
   role=db.Column(db.String(60))
   image=db.Column(db.String(15))
   def __repr__(self):
        return f'<Profile {self.email}>'


class Emails(db.Model):
   __tablename__='email'
   sn=db.Column(db.Integer, primary_key=True)
   template_id=db.Column(db.String(6))
   from_addr=db.Column(db.String(60))
   to_addr=db.Column(db.String(60))
   cc=db.Column(JSONB)
   sent=db.Column(db.Boolean, default=False)
   time=db.Column(db.TIMESTAMP)
   def __repr__(self):
        return f'<Emails {self.sn}>'
