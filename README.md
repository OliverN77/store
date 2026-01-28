# 🌟 Maison Aurora - Tienda de Perfumes Elegante

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.0+-000000?style=for-the-badge&logo=flask&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**Una tienda de perfumes de lujo con diseño elegante y sistema de administración completo**

[Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [Estructura](#-estructura-del-proyecto) • [Licencia](#-licencia)

</div>

---

## 📋 Descripción

**Maison Aurora** es una aplicación web de e-commerce especializada en perfumes de alta gama. Diseñada con un enfoque en la elegancia y la experiencia del usuario, ofrece una interfaz sofisticada tanto para clientes como para administradores.

### ✨ Características Principales

#### 🛍️ Para Clientes
- **Catálogo de Productos**: Explora una selección exclusiva de perfumes con descripciones detalladas
- **Carrito de Compras**: Sistema de carrito intuitivo con actualización en tiempo real
- **Gestión de Órdenes**: Historial completo de compras con detalles expandibles
- **Autenticación Segura**: Sistema de registro e inicio de sesión
- **Tema Oscuro/Claro**: Cambia entre modos visuales según tu preferencia
- **Diseño Responsivo**: Perfectamente adaptado para móviles, tablets y escritorio

#### 👨‍💼 Para Administradores
- **Dashboard Completo**: Estadísticas en tiempo real (usuarios, productos, órdenes, ingresos)
- **Gestión de Usuarios**: Visualiza, busca y administra usuarios registrados
- **Gestión de Productos**: CRUD completo para el catálogo de productos
- **Sistema de Roles**: Control de acceso basado en roles (admin/user)
- **Búsqueda en Tiempo Real**: Filtra usuarios y productos instantáneamente
- **Interfaz Elegante**: Panel de administración moderno con navegación intuitiva

---

## 🎨 Capturas de Pantalla

<div align="center">

### 🏠 Página Principal
*Diseño elegante con animaciones suaves y gradientes dorados*

### 🛒 Catálogo de Productos
*Tarjetas de productos con efectos hover y detalles completos*

### 📊 Panel de Administración
*Dashboard con estadísticas en vivo y acciones rápidas*

### 📦 Gestión de Productos
*Tabla interactiva con búsqueda y operaciones CRUD*

</div>

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Flask 2.0+**: Framework web minimalista y poderoso
- **MySQL 8.0+**: Base de datos relacional robusta
- **Flask-Mail**: Gestión de correos electrónicos
- **mysql-connector-python**: Conexión con MySQL

### Frontend
- **HTML5 & CSS3**: Estructura y estilos modernos
- **JavaScript (ES6+)**: Interactividad y animaciones
- **Font Awesome 6**: Iconografía elegante
- **Google Fonts**: Tipografías Playfair Display e Inter

### Características de Diseño
- **CSS Variables**: Tematización dinámica
- **Flexbox & Grid**: Layouts responsivos
- **Backdrop Blur**: Efectos de cristal esmerilado
- **Gradientes Personalizados**: Paleta dorada elegante
- **Animaciones CSS**: Transiciones suaves y efectos hover

---

## 📦 Instalación

### Prerrequisitos

```bash
# Python 3.8 o superior
python --version

# MySQL 8.0 o superior
mysql --version

# Git
git --version
```

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/maison-aurora.git
cd maison-aurora
```

### Paso 2: Crear Entorno Virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Paso 3: Instalar Dependencias

```bash
pip install flask flask-mail mysql-connector-python python-dotenv
```

### Paso 4: Configurar Base de Datos

```bash
# Crear base de datos y tablas
mysql -u root -p < recreate_database.sql

# Insertar productos de ejemplo
python insert_products_data.py

# Crear usuario administrador
python create_admin.py
```

### Paso 5: Configurar Variables de Entorno

**Importante**: Copia el archivo `.env.example` a `.env` y configura tus credenciales:

```bash
cp .env.example .env
```

Luego edita `.env` con tus datos reales:

```env
# Flask Configuration
SECRET_KEY=genera-una-clave-secreta-unica

# Email Configuration (Gmail)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=tu-email@gmail.com
MAIL_PASSWORD=tu-app-password-de-gmail
MAIL_DEFAULT_SENDER=tu-email@gmail.com

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu-password-mysql
DB_NAME=store
```

**Nota**: El archivo `.env` está en `.gitignore` y nunca se subirá a GitHub. Solo `.env.example` se incluye como plantilla.

### Paso 6: Ejecutar la Aplicación

```bash
python app.py
```

La aplicación estará disponible en: `http://localhost:5000`

---

## 🎯 Uso

### Acceso de Cliente

1. **Registrarse**: Crea una cuenta nueva desde `/register`
2. **Iniciar Sesión**: Accede con tu email y contraseña
3. **Explorar Productos**: Navega por el catálogo en `/products`
4. **Agregar al Carrito**: Añade productos con un solo clic
5. **Finalizar Compra**: Procede al checkout desde `/cart`
6. **Ver Historial**: Revisa tus compras en `/my_purchases`

### Acceso de Administrador

**Credenciales por defecto:**
- Email: `admin@store.com`
- Password: `admin123`

**Rutas del Admin:**
- Dashboard: `/admin`
- Usuarios: `/admin/users`
- Productos: `/admin/products`
- Agregar Producto: `/admin/products/add`
- Editar Producto: `/admin/products/edit/<id>`

---

## 📂 Estructura del Proyecto

```
tienda/
├── 📁 config/
│   ├── db.py                 # Configuración de base de datos
│   ├── settings.py           # Configuración de la app
│   └── __pycache__/
├── 📁 routes/
│   ├── __init__.py
│   ├── auth.py              # Autenticación (login/register/logout)
│   ├── cart.py              # Carrito de compras
│   ├── main.py              # Rutas principales
│   ├── orders.py            # Gestión de órdenes
│   ├── products.py          # Catálogo de productos
│   ├── terms.py             # Términos y condiciones
│   ├── admin.py             # Panel de administración
│   └── __pycache__/
├── 📁 static/
│   ├── 📁 assets/
│   │   └── 📁 img/           # Imágenes de productos
│   ├── 📁 css/
│   │   ├── cart.css
│   │   ├── confirmation.css
│   │   ├── form.css
│   │   ├── my_purchases.css
│   │   ├── products.css
│   │   ├── styles.css
│   │   ├── terms.css
│   │   └── admin.css        # Estilos del panel admin
│   └── 📁 js/
│       ├── animations.js
│       ├── cart.js
│       ├── confirmation.js
│       ├── form.js
│       ├── my_purchases.js
│       ├── products.js
│       ├── script.js
│       ├── terms.js
│       └── admin.js         # JavaScript del panel admin
├── 📁 templates/
│   ├── cart.html
│   ├── confirmation.html
│   ├── form.html
│   ├── index.html
│   ├── my_purchases.html
│   ├── products.html
│   ├── terms.html
│   ├── admin_dashboard.html  # Dashboard de admin
│   ├── admin_users.html      # Gestión de usuarios
│   ├── admin_products.html   # Gestión de productos
│   └── admin_product_form.html
├── 📄 app.py                 # Punto de entrada de la aplicación
├── 📄 recreate_database.sql  # Script de creación de BD
├── 📄 insert_products.sql    # Productos de ejemplo (SQL)
├── 📄 insert_products_data.py # Productos de ejemplo (Python)
├── 📄 create_admin.py        # Script para crear admin
├── 📄 update_add_rol.sql     # Actualizar tabla con rol
└── 📄 README.md
```

---

## 🗄️ Esquema de Base de Datos

### Tablas

#### `users`
- `id`: INT PRIMARY KEY
- `name`: VARCHAR(100)
- `lastname`: VARCHAR(100)
- `email`: VARCHAR(150) UNIQUE
- `password`: VARCHAR(255)
- `rol`: VARCHAR(20) DEFAULT 'user'
- `created_at`: TIMESTAMP

#### `products`
- `id`: INT PRIMARY KEY
- `name`: VARCHAR(200)
- `description`: TEXT
- `price`: DECIMAL(10, 2)
- `image`: VARCHAR(255)
- `stock`: INT
- `created_at`: TIMESTAMP

#### `cart`
- `id`: INT PRIMARY KEY
- `user_id`: INT FOREIGN KEY
- `product_id`: INT FOREIGN KEY
- `quantity`: INT
- `added_at`: TIMESTAMP

#### `orders`
- `id`: INT PRIMARY KEY
- `user_id`: INT FOREIGN KEY
- `total`: DECIMAL(10, 2)
- `status`: VARCHAR(50)
- `purchase_date`: TIMESTAMP

#### `order_details`
- `id`: INT PRIMARY KEY
- `order_id`: INT FOREIGN KEY
- `product_id`: INT FOREIGN KEY
- `quantity`: INT
- `unit_price`: DECIMAL(10, 2)

### Relaciones
- `users` 1:N `cart`
- `users` 1:N `orders`
- `products` 1:N `cart`
- `products` 1:N `order_details`
- `orders` 1:N `order_details`

---

## 🎨 Paleta de Colores

### Tema Oscuro (Default)
- **Background**: `#0a0a0a`
- **Surface**: `#1a1a1a`
- **Accent**: `#d4af37` (Dorado)
- **Text**: `#f8f9fa`
- **Success**: `#27ae60`
- **Danger**: `#e74c3c`

### Tema Claro
- **Background**: `#f5f3f0`
- **Surface**: `#ffffff`
- **Accent**: `#d4af37`
- **Text**: `#1a1a1a`

---

## 🔐 Seguridad

- ✅ Validación de sesiones en todas las rutas protegidas
- ✅ Sistema de roles (admin/user)
- ✅ Decoradores de autenticación
- ✅ Sanitización de inputs en formularios
- ✅ Protección contra SQL injection (prepared statements)
- ✅ `.gitignore` configurado para proteger credenciales
- ✅ Archivos de configuración sensibles excluidos del repositorio
- ⚠️ **Nota**: En producción, implementar:
  - Hashing de contraseñas (bcrypt)
  - HTTPS
  - Tokens CSRF
  - Variables de entorno (.env) para secretos
  - Rate limiting
  - Input sanitization adicional

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Características Futuras

- [ ] Sistema de valoraciones y reseñas
- [ ] Filtros avanzados de búsqueda
- [ ] Pasarela de pago integrada
- [ ] Sistema de cupones y descuentos
- [ ] Notificaciones por email
- [ ] Wishlist de productos
- [ ] Comparador de productos
- [ ] Chat en vivo con soporte
- [ ] API RESTful
- [ ] App móvil nativa

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Oliver**

- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: olivernie2626@gmail.com

---

## 🙏 Agradecimientos

- Iconos por [Font Awesome](https://fontawesome.com/)
- Fuentes por [Google Fonts](https://fonts.google.com/)
- Inspiración de diseño de tiendas de lujo

---

<div align="center">

### ⭐ Si te gusta este proyecto, dale una estrella!

**Hecho con ❤️ y mucho ☕**

[⬆ Volver arriba](#-maison-aurora---tienda-de-perfumes-elegante)

</div>
