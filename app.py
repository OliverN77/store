from flask import Flask
from flask_mail import Mail
from config.settings import Config
from routes.main import main
from routes.auth import auth
from routes.cart import cart
from routes.products import products
from routes.orders import orders
from routes.terms import terms
from routes.admin import admin
from config.db import close_db
import os

app = Flask(__name__)
app.config.from_object(Config)

mail = Mail(app)

app.register_blueprint(main)
app.register_blueprint(auth)
app.register_blueprint(cart)
app.register_blueprint(products)
app.register_blueprint(orders)
app.register_blueprint(terms)
app.register_blueprint(admin)

app.teardown_appcontext(close_db)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)