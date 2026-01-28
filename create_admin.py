"""
Script para crear un usuario administrador
Ejecutar: python create_admin.py
"""

import mysql.connector
from mysql.connector import Error

def create_admin():
    """Crear usuario administrador en la base de datos"""
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='store'
        )
        
        if connection.is_connected():
            cursor = connection.cursor(dictionary=True)
            
            # Verificar si el admin ya existe
            cursor.execute('SELECT * FROM users WHERE email = %s', ('admin@store.com',))
            admin = cursor.fetchone()
            
            if admin:
                print("⚠️  El usuario administrador ya existe:")
                print(f"   Email: admin@store.com")
                print(f"   Password: admin123")
                print(f"   Rol: {admin.get('rol', 'N/A')}")
                
                # Si existe pero no tiene rol admin, actualizarlo
                if admin.get('rol') != 'admin':
                    cursor.execute("UPDATE users SET rol = 'admin' WHERE email = 'admin@store.com'")
                    connection.commit()
                    print("\n✓ Rol actualizado a 'admin'")
            else:
                # Crear usuario admin
                cursor.execute('''
                    INSERT INTO users (name, lastname, email, password, rol)
                    VALUES (%s, %s, %s, %s, %s)
                ''', ('Admin', 'Store', 'admin@store.com', 'admin123', 'admin'))
                
                connection.commit()
                
                print("=" * 60)
                print("✓ Usuario administrador creado exitosamente!")
                print("=" * 60)
                print("\n📋 CREDENCIALES DE ACCESO:")
                print(f"   Email:    admin@store.com")
                print(f"   Password: admin123")
                print("\n🔗 URL del panel: http://localhost:5000/admin")
                print("\n⚠️  IMPORTANTE: Cambia la contraseña después del primer acceso")
                print("=" * 60)
            
            cursor.close()
            connection.close()
            
    except Error as e:
        print(f"✗ Error al conectar a la base de datos: {e}")

if __name__ == "__main__":
    create_admin()
