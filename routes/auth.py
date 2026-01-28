from flask import Blueprint, render_template, request, redirect, url_for, session
from config.db import get_db_connection

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        lastname = request.form['lastname']
        email = request.form['email']
        password = request.form['password']

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        account = cursor.fetchone()

        if account:
            return render_template('form.html', error='Ya has sido registrad@ con este correo electrónico.')
        else:
            # Por defecto, los nuevos usuarios tienen rol 'user'
            cursor.execute('INSERT INTO users (name, lastname, email, password, rol) VALUES (%s, %s, %s, %s, %s)', 
                         (name, lastname, email, password, 'user'))
            db.commit()
            
            session['user_id'] = cursor.lastrowid
            session['email'] = email
            session['cart_count'] = 0
            session.modified = True
            
            return redirect(url_for('products.list'))
    return render_template('form.html')

@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        if 'email' in request.form and 'password' in request.form:
            email = request.form['email']
            password = request.form['password']

            db = get_db_connection()
            cursor = db.cursor(dictionary=True)
            cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
            account = cursor.fetchone()

            if account and password == account['password']:
                session['user_id'] = account['id']
                session['email'] = account['email']
                
                cursor.execute('SELECT COALESCE(SUM(quantity), 0) as total FROM cart WHERE user_id = %s', 
                             (account['id'],))
                cart_total = cursor.fetchone()
                session['cart_count'] = int(cart_total['total']) if cart_total['total'] else 0
                session.modified = True
                
                # Redirigir según el rol del usuario
                if account.get('rol') == 'admin':
                    return redirect(url_for('admin.dashboard'))
                else:
                    return redirect(url_for('products.list'))
            else:
                return render_template('form.html', error='Correo electrónico o contraseña incorrectos.')
    return render_template('form.html')

@auth.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main.index'))