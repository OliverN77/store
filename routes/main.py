from flask import Blueprint, render_template, jsonify, request, flash, redirect, url_for
from flask_mail import Message
from flask import current_app
from datetime import datetime

main = Blueprint('main', __name__)

@main.route("/")
def home():
    return render_template('index.html')

@main.route('/form')
def form():
    return render_template('form.html')

@main.route('/index')
def index():
    return render_template('index.html')

@main.route('/newsletter', methods=['POST'])
def newsletter():
    try:
        # Obtener email del formulario
        email = request.form.get('email', '').strip()
        
        # Validación básica
        if not email or '@' not in email:
            flash('Por favor ingresa un email válido', 'error')
            return redirect(url_for('main.home') + '#footer')
        
        # Email al usuario
        user_msg = Message(
            subject='¡Bienvenido a Maison Aurora! 🌟',
            sender=current_app.config.get('MAIL_DEFAULT_SENDER'),
            recipients=[email]
        )
        
        user_msg.html = f'''
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #d4af37, #f4d03f); padding: 30px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 28px;">MAISON AURORA</h1>
                <p style="margin: 10px 0 0 0;">Perfumería Selecta</p>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
                <h2 style="color: #333; text-align: center;">¡Gracias por suscribirte! 🎉</h2>
                
                <p style="color: #666; line-height: 1.6; text-align: center;">
                    Te has suscrito exitosamente a nuestro newsletter de <strong>Maison Aurora</strong>. 
                    Recibirás las últimas novedades sobre nuestras fragancias exclusivas.
                </p>
                
                <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #d4af37;">
                    <h3 style="color: #d4af37; margin: 0 0 15px 0;">¿Qué recibirás?</h3>
                    <ul style="color: #666; line-height: 1.8;">
                        <li>🌸 Nuevas colecciones y lanzamientos exclusivos</li>
                        <li>💎 Ofertas especiales para suscriptores</li>
                        <li>📚 Tips y consejos de perfumería</li>
                        <li>🎁 Acceso anticipado a promociones</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <a href="http://localhost:5000" style="display: inline-block; background: linear-gradient(135deg, #d4af37, #f4d03f); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                        ✨ Explorar Colecciones
                    </a>
                </div>
            </div>
            
            <div style="background: #333; color: white; padding: 20px; text-align: center;">
                <p style="margin: 0; opacity: 0.8;">Maison Aurora - Donde cada fragancia cuenta una historia</p>
            </div>
        </div>
        '''
        
        # Email al admin
        admin_msg = Message(
            subject='🎉 Nueva Suscripción Newsletter - Maison Aurora',
            sender=current_app.config.get('MAIL_DEFAULT_SENDER'),
            recipients=['olivernie2626@gmail.com']
        )
        
        admin_msg.html = f'''
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <div style="background: #d4af37; padding: 20px; text-align: center; color: white;">
                <h2 style="margin: 0;">Nueva Suscripción</h2>
            </div>
            
            <div style="padding: 20px; background: #f9f9f9;">
                <h3 style="color: #333;">Detalles:</h3>
                <p style="color: #666;"><strong>Email:</strong> {email}</p>
                <p style="color: #666;"><strong>Fecha:</strong> {datetime.now().strftime('%d/%m/%Y %H:%M')}</p>
                <p style="color: #666;"><strong>Estado:</strong> ✅ Confirmado</p>
            </div>
        </div>
        '''
        
        # Enviar emails
        mail = current_app.extensions['mail']
        mail.send(user_msg)
        mail.send(admin_msg)
        
        flash('¡Gracias! Te hemos enviado un email de confirmación.', 'success')
        return redirect(url_for('main.home') + '#footer')
        
    except Exception as e:
        print(f"Error en newsletter: {str(e)}")
        flash('Error al suscribirse. Intenta más tarde.', 'error')
        return redirect(url_for('main.home') + '#footer')

@main.route('/contacto', methods=['POST'])
def contact():
    try:
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']
        
        msg = Message('New contact message',
                     sender=current_app.config.get('MAIL_DEFAULT_SENDER'),
                     recipients=['olivernie2626@gmail.com'])
        
        msg.body = f'''
        Nuevo mensaje de contacto:
        
        Name: {name}
        Email: {email}
        Message: {message}
        '''
        
        mail = current_app.extensions['mail']
        mail.send(msg)
        return jsonify({'success': True, 'message': 'Mensaje enviado satisfactoriamente'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

# Ruta de prueba
@main.route('/test-email')
def test_email():
    try:
        print(f"🧪 TEST: Iniciando prueba de email...")
        print(f"🧪 TEST: MAIL_SERVER: {current_app.config.get('MAIL_SERVER')}")
        print(f"🧪 TEST: MAIL_PORT: {current_app.config.get('MAIL_PORT')}")
        print(f"🧪 TEST: MAIL_USE_TLS: {current_app.config.get('MAIL_USE_TLS')}")
        print(f"🧪 TEST: MAIL_USERNAME: {current_app.config.get('MAIL_USERNAME')}")
        print(f"🧪 TEST: MAIL_DEFAULT_SENDER: {current_app.config.get('MAIL_DEFAULT_SENDER')}")
        
        msg = Message(
            subject='🧪 Test Email - Maison Aurora',
            sender=current_app.config.get('MAIL_DEFAULT_SENDER'),
            recipients=['olivernie2626@gmail.com']
        )
        msg.body = 'Este es un email de prueba. Si lo recibes, ¡todo funciona correctamente! 🎉'
        
        mail = current_app.extensions['mail']
        print(f"🧪 TEST: Instancia de mail: {mail}")
        
        mail.send(msg)
        print(f"✅ TEST: Email enviado correctamente")
        
        return jsonify({
            'success': True, 
            'message': 'Email de prueba enviado correctamente',
            'config_check': {
                'server': current_app.config.get('MAIL_SERVER'),
                'port': current_app.config.get('MAIL_PORT'),
                'username': current_app.config.get('MAIL_USERNAME'),
                'sender': current_app.config.get('MAIL_DEFAULT_SENDER')
            }
        })
    except Exception as e:
        print(f"❌ TEST: Error en prueba: {str(e)}")
        print(f"❌ TEST: Tipo de error: {type(e).__name__}")
        import traceback
        print(f"❌ TEST: Traceback:")
        print(traceback.format_exc())
        
        return jsonify({
            'success': False, 
            'error': str(e),
            'error_type': type(e).__name__
        }), 500