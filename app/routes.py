from flask import Blueprint, request, jsonify
from . import db
from .models import User, Expense, Income
from datetime import datetime
from uuid import UUID

bp = Blueprint('api', __name__)

# --- UTILISATEURS ---

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = User(
        nom=data['nom'],
        prenom=data['prenom'],
        email=data['email'],
        password=data['password'],
        genre=data['genre']
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur créé avec succès', 'id': str(user.id)}), 201


@bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': str(user.id),
        'nom': user.nom,
        'prenom': user.prenom,
        'email': user.email,
        'genre': user.genre
    } for user in users]), 200


@bp.route('/users/<string:id>', methods=['GET'])  # Utilisation de string pour compatibilité SQLite
def get_user_by_id(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'Utilisateur introuvable'}), 404
    return jsonify({
        'id': str(user.id),
        'nom': user.nom,
        'prenom': user.prenom,
        'email': user.email,
        'genre': user.genre
    }), 200


@bp.route('/users/<string:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'Utilisateur introuvable'}), 404
    user.nom = data.get('nom', user.nom)
    user.prenom = data.get('prenom', user.prenom)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    user.genre = data.get('genre', user.genre)
    db.session.commit()
    return jsonify({'message': 'Utilisateur mis à jour avec succès'}), 200


@bp.route('/users/<string:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'error': 'Utilisateur introuvable'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur supprimé avec succès'}), 200


# --- DÉPENSES ---

@bp.route('/expenses', methods=['POST'])
def create_expense():
    data = request.get_json()
    try:
        expense = Expense(
            user_id=str(data['user_id']),  # Convertir UUID en chaîne
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            description=data['description'],
            categorie=data['categorie'],
            montant=data['montant']
        )
        db.session.add(expense)
        db.session.commit()
        return jsonify({'message': 'Dépense ajoutée avec succès', 'id': str(expense.id)}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@bp.route('/expenses', methods=['GET'])
def get_all_expenses():
    expenses = Expense.query.all()
    return jsonify([{
        'id': str(expense.id),
        'user_id': str(expense.user_id),
        'date': expense.date.strftime('%Y-%m-%d'),
        'description': expense.description,
        'categorie': expense.categorie,
        'montant': expense.montant
    } for expense in expenses]), 200


@bp.route('/expenses/<string:user_id>', methods=['GET'])
def get_expenses(user_id):
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': str(expense.id),
        'date': expense.date.strftime('%Y-%m-%d'),
        'description': expense.description,
        'categorie': expense.categorie,
        'montant': expense.montant
    } for expense in expenses]), 200


@bp.route('/expenses/<string:id>', methods=['PUT'])
def update_expense(id):
    data = request.get_json()
    expense = Expense.query.get(id)
    if not expense:
        return jsonify({'error': 'Dépense introuvable'}), 404
    expense.date = datetime.strptime(data.get('date', expense.date.strftime('%Y-%m-%d')), '%Y-%m-%d')
    expense.description = data.get('description', expense.description)
    expense.categorie = data.get('categorie', expense.categorie)
    expense.montant = data.get('montant', expense.montant)
    db.session.commit()
    return jsonify({'message': 'Dépense mise à jour avec succès'}), 200


@bp.route('/expenses/<string:id>', methods=['DELETE'])
def delete_expense(id):
    expense = Expense.query.get(id)
    if not expense:
        return jsonify({'error': 'Dépense introuvable'}), 404
    db.session.delete(expense)
    db.session.commit()
    return jsonify({'message': 'Dépense supprimée avec succès'}), 200


# --- REVENUS ---

@bp.route('/incomes', methods=['POST'])
def create_income():
    data = request.get_json()
    try:
        income = Income(
            user_id=str(data['user_id']),
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            description=data['description'],
            status=data['status'],
            categorie=data['categorie'],
            montant=data['montant']
        )
        db.session.add(income)
        db.session.commit()
        return jsonify({'message': 'Revenu ajouté avec succès', 'id': str(income.id)}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


@bp.route('/incomes', methods=['GET'])
def get_all_incomes():
    incomes = Income.query.all()
    return jsonify([{
        'id': str(income.id),
        'user_id': str(income.user_id),
        'date': income.date.strftime('%Y-%m-%d'),
        'description': income.description,
        'status': income.status,
        'categorie': income.categorie,
        'montant': income.montant
    } for income in incomes]), 200


@bp.route('/incomes/<string:user_id>', methods=['GET'])
def get_incomes(user_id):
    incomes = Income.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': str(income.id),
        'date': income.date.strftime('%Y-%m-%d'),
        'description': income.description,
        'status': income.status,
        'categorie': income.categorie,
        'montant': income.montant
    } for income in incomes]), 200


@bp.route('/incomes/<string:id>', methods=['PUT'])
def update_income(id):
    data = request.get_json()
    income = Income.query.get(id)
    if not income:
        return jsonify({'error': 'Revenu introuvable'}), 404
    income.date = datetime.strptime(data.get('date', income.date.strftime('%Y-%m-%d')), '%Y-%m-%d')
    income.description = data.get('description', income.description)
    income.status = data.get('status', income.status)
    income.categorie = data.get('categorie', income.categorie)
    income.montant = data.get('montant', income.montant)
    db.session.commit()
    return jsonify({'message': 'Revenu mis à jour avec succès'}), 200


@bp.route('/incomes/<string:id>', methods=['DELETE'])
def delete_income(id):
    income = Income.query.get(id)
    if not income:
        return jsonify({'error': 'Revenu introuvable'}), 404
    db.session.delete(income)
    db.session.commit()
    return jsonify({'message': 'Revenu supprimé avec succès'}), 200
