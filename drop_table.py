from app import create_app, db  # Assure-toi que `create_app` et `db` sont définis dans `app/__init__.py`
from app.models import Expense  # Importe le modèle Expense

# Crée l'application Flask
app = create_app()

# Supprime la table Expense
with app.app_context():
    Expense.__table__.drop(db.engine)  # Supprime la table Expense
    print("La table Expense a été supprimée avec succès.")
