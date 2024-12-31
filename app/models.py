from . import db
from datetime import datetime
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.types import Text

# Détecter le dialecte pour adapter le type UUID
def get_uuid_type():
    if db.engine.name == 'sqlite':
        return db.String(36)  # Stocke les UUID en tant que texte dans SQLite
    else:
        return UUID(as_uuid=True)  # Utilise le type natif UUID pour PostgreSQL


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(get_uuid_type(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    nom = db.Column(db.String(50), nullable=False)
    prenom = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(1), nullable=False)

    incomes = db.relationship('Income', backref='user', cascade="all, delete", lazy=True)
    expenses = db.relationship('Expense', backref='user', cascade="all, delete", lazy=True)


class Expense(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(get_uuid_type(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(get_uuid_type(), db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    categorie = db.Column(db.String(50), nullable=False)
    montant = db.Column(db.Float, nullable=False)


class Income(db.Model):
    __tablename__ = 'incomes'
    id = db.Column(get_uuid_type(), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True, nullable=False)
    user_id = db.Column(get_uuid_type(), db.ForeignKey('users.id'), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(10), nullable=False)
    categorie = db.Column(db.String(50), nullable=False)
    montant = db.Column(db.Float, nullable=False)
