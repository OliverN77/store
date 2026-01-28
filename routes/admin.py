from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from config.db import get_db_connection
from functools import wraps

admin = Blueprint('admin', __name__)

# Decorador para verificar si es admin
def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('auth.login'))
        
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute('SELECT * FROM users WHERE id = %s', (session['user_id'],))
        user = cursor.fetchone()
        
        # Verificar si el usuario tiene rol de admin
        if not user or user.get('rol') != 'admin':
            flash('No tienes permisos para acceder al panel de administración', 'error')
            return redirect(url_for('products.list'))
        
        return f(*args, **kwargs)
    return decorated_function

# Dashboard principal
@admin.route('/admin')
@admin_required
def dashboard():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    # Obtener estadísticas
    cursor.execute('SELECT COUNT(*) as total FROM users')
    total_users = cursor.fetchone()['total']
    
    cursor.execute('SELECT COUNT(*) as total FROM products')
    total_products = cursor.fetchone()['total']
    
    cursor.execute('SELECT COUNT(*) as total FROM orders')
    total_orders = cursor.fetchone()['total']
    
    cursor.execute('SELECT COALESCE(SUM(total), 0) as total FROM orders')
    total_revenue = cursor.fetchone()['total']
    
    return render_template('admin_dashboard.html', 
                         total_users=total_users,
                         total_products=total_products,
                         total_orders=total_orders,
                         total_revenue=total_revenue)

# ========== GESTIÓN DE USUARIOS ==========
@admin.route('/admin/users')
@admin_required
def users():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM users ORDER BY id DESC')
    users_list = cursor.fetchall()
    return render_template('admin_users.html', users=users_list)

@admin.route('/admin/users/delete/<int:user_id>', methods=['POST'])
@admin_required
def delete_user(user_id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute('DELETE FROM users WHERE id = %s', (user_id,))
    db.commit()
    flash('Usuario eliminado exitosamente', 'success')
    return redirect(url_for('admin.users'))

# ========== GESTIÓN DE PRODUCTOS ==========
@admin.route('/admin/products')
@admin_required
def products():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute('SELECT * FROM products ORDER BY id DESC')
    products_list = cursor.fetchall()
    return render_template('admin_products.html', products=products_list)

@admin.route('/admin/products/add', methods=['GET', 'POST'])
@admin_required
def add_product():
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        image = request.form['image']
        stock = request.form['stock']
        
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute('''
            INSERT INTO products (name, description, price, image, stock)
            VALUES (%s, %s, %s, %s, %s)
        ''', (name, description, price, image, stock))
        db.commit()
        
        flash('Producto agregado exitosamente', 'success')
        return redirect(url_for('admin.products'))
    
    return render_template('admin_product_form.html', product=None)

@admin.route('/admin/products/edit/<int:product_id>', methods=['GET', 'POST'])
@admin_required
def edit_product(product_id):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    
    if request.method == 'POST':
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        image = request.form['image']
        stock = request.form['stock']
        
        cursor.execute('''
            UPDATE products 
            SET name = %s, description = %s, price = %s, image = %s, stock = %s
            WHERE id = %s
        ''', (name, description, price, image, stock, product_id))
        db.commit()
        
        flash('Producto actualizado exitosamente', 'success')
        return redirect(url_for('admin.products'))
    
    cursor.execute('SELECT * FROM products WHERE id = %s', (product_id,))
    product = cursor.fetchone()
    return render_template('admin_product_form.html', product=product)

@admin.route('/admin/products/delete/<int:product_id>', methods=['POST'])
@admin_required
def delete_product(product_id):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute('DELETE FROM products WHERE id = %s', (product_id,))
    db.commit()
    flash('Producto eliminado exitosamente', 'success')
    return redirect(url_for('admin.products'))
