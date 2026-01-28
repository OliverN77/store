from flask import Blueprint, render_template, redirect, url_for, session
from config.db import get_db_connection

cart = Blueprint('cart', __name__)

@cart.route('/cart')
def view():
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
    
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute('''
        SELECT p.id, p.name, p.image, p.price, c.quantity,
               (p.price * c.quantity) as subtotal
        FROM products p
        INNER JOIN cart c ON p.id = c.product_id
        WHERE c.user_id = %s
    ''', (session['user_id'],))

    cart_items = cursor.fetchall()
    total = sum(float(item['subtotal']) for item in cart_items)
    
    return render_template('cart.html', cart=cart_items, total=total)

@cart.route('/cart/add/<int:product_id>')
def add(product_id):
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
    
    if 'cart_count' not in session:
        session['cart_count'] = 0
    
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM cart WHERE user_id = %s AND product_id = %s',
                  (session['user_id'], product_id))
    item = cursor.fetchone()
    
    if item:
        cursor.execute('''
        UPDATE cart 
            SET quantity = quantity + 1 
            WHERE user_id = %s AND product_id = %s
        ''', (session['user_id'], product_id))
    else:
        cursor.execute('''
            INSERT INTO cart (user_id, product_id, quantity) 
            VALUES (%s, %s, 1)
        ''', (session['user_id'], product_id))
    
    session['cart_count'] = session.get('cart_count', 0) + 1
    session.modified = True
    
    db.commit()
    return redirect(url_for('products.list'))


@cart.route('/cart/remove/<int:product_id>')
def remove(product_id):
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
    
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    cursor.execute('SELECT quantity FROM cart WHERE user_id = %s AND product_id = %s',
                  (session['user_id'], product_id))
    item = cursor.fetchone()
    
    if item:
        session['cart_count'] = session.get('cart_count', 0) - item['quantity']
        session.modified = True
        
        cursor.execute('DELETE FROM cart WHERE user_id = %s AND product_id = %s',
                      (session['user_id'], product_id))
        db.commit()
    
    return redirect(url_for('cart.view'))

@cart.route('/cart/empty')
def empty():
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
    
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute('DELETE FROM cart WHERE user_id = %s', (session['user_id'],))
    db.commit()
    
    session['cart_count'] = 0
    session.modified = True
    
    return redirect(url_for('cart.view'))