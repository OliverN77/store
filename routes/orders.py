from flask import Blueprint, render_template, redirect, url_for, session
from config.db import get_db_connection

orders = Blueprint('orders', __name__)

@orders.route('/checkout')
def checkout():
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
    
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    cursor.execute('''
        SELECT p.id, p.name, p.image, p.price, c.quantity
        FROM products p
        INNER JOIN cart c ON p.id = c.product_id
        WHERE c.user_id = %s
    ''', (session['user_id'],))
    
    cart_items = cursor.fetchall()
    total = sum(float(item['price']) * item['quantity'] for item in cart_items)
    
    cursor.execute('INSERT INTO orders (user_id, total) VALUES (%s, %s)',
                  (session['user_id'], total))
    order_id = cursor.lastrowid
    
    for item in cart_items:
        cursor.execute('''
            INSERT INTO order_details 
            (order_id, product_id, quantity, unit_price)
            VALUES (%s, %s, %s, %s)
        ''', (order_id, item['id'], item['quantity'], item['price']))
    
    cursor.execute('DELETE FROM cart WHERE user_id = %s', (session['user_id'],))
    
    session['cart_count'] = 0
    session.modified = True
    
    db.commit()
    return render_template('confirmation.html', orden_id=order_id, total=total)

@orders.route('/my_purchases')
def my_purchases():
    if 'user_id' not in session:
        return redirect(url_for('auth.login'))
        
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute('''
        SELECT o.*, GROUP_CONCAT(p.name) as products
        FROM orders o
        LEFT JOIN order_details do ON o.id = do.order_id
        LEFT JOIN products p ON do.product_id = p.id
        WHERE o.user_id = %s
        GROUP BY o.id
        ORDER BY o.purchase_date DESC
    ''', (session['user_id'],))
    
    orders_list = cursor.fetchall()
    return render_template('my_purchases.html', orders=orders_list)