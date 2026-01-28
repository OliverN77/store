from flask import Blueprint, render_template

# Crear el blueprint para términos y condiciones
terms = Blueprint('terms', __name__)

@terms.route('/terms')
def terms_page():
    return render_template('terms.html')