import os

class Config:
    SECRET_KEY = os.urandom(24)
    
    # Email configuration
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'olivernie2626@gmail.com'
    MAIL_PASSWORD = 'hduj kodn ztxb htbm'
    MAIL_DEFAULT_SENDER = 'olivernie2626@gmail.com'
    
    MAIL_DEBUG = True
    MAIL_SUPPRESS_SEND = False