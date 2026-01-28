from flask import Blueprint, render_template
from config.db import get_db_connection

products = Blueprint('products', __name__)

@products.route('/products')
def list():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM products')
    products_list = cursor.fetchall()
    return render_template('products.html', products=products_list)

@products.route('/products/<int:product_id>')
def detail(product_id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM products WHERE id = %s', (product_id,))
    product = cursor.fetchone()
    return render_template('product_detail.html', product=product)