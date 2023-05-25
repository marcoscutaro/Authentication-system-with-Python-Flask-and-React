from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=True)
    avatar = db.Column(db.String(50), unique=False, nullable=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=True)
    surname = db.Column(db.String(50), unique=False, nullable=True)
    bio = db.Column(db.Text, unique=True, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "avatar": self.avatar,
            "email": self.email,
            "name": self.name,
            "surname": self.surname,
      
        }



