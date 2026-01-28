# 🚀 Deployment en Fly.io

## Requisitos Previos

1. **Instalar Fly CLI**
   ```powershell
   # Windows (PowerShell como administrador)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Crear cuenta en Fly.io** (si no tienes)
   - Visita: https://fly.io/app/sign-up
   - No necesitas tarjeta de crédito para el tier gratuito

---

## 📝 Pasos de Deployment

### 1. Login en Fly.io
```powershell
fly auth login
```

### 2. Lanzar la aplicación
```powershell
fly launch
```

Responde las preguntas:
- **App name**: Presiona Enter (usa el sugerido) o escribe uno personalizado
- **Region**: Elige la más cercana (ejemplo: `mia` para Miami)
- **PostgreSQL**: NO (ya tienes MySQL en Clever Cloud)
- **Redis**: NO
- **Deploy now**: NO (primero configuramos variables)

### 3. Configurar Variables de Entorno
```powershell
# Flask Secret Key
fly secrets set SECRET_KEY="tu-clave-secreta-super-segura"

# Database (Clever Cloud)
fly secrets set DB_HOST="beamkiiw0deqsoihaanu-mysql.services.clever-cloud.com"
fly secrets set DB_USER="u81c1hzs6ckuunja"
fly secrets set DB_PASSWORD="vCPsLR7l4orpR6mTjxWt"
fly secrets set DB_NAME="beamkiiw0deqsoihaanu"
fly secrets set DB_PORT="3306"

# Email (Gmail)
fly secrets set MAIL_SERVER="smtp.gmail.com"
fly secrets set MAIL_PORT="587"
fly secrets set MAIL_USE_TLS="True"
fly secrets set MAIL_USERNAME="olivernie2626@gmail.com"
fly secrets set MAIL_PASSWORD="rtlwhkeyzachylvi"
fly secrets set MAIL_DEFAULT_SENDER="olivernie2626@gmail.com"

# App Settings
fly secrets set MAIL_DEBUG="False"
fly secrets set MAIL_SUPPRESS_SEND="False"
```

### 4. Desplegar
```powershell
fly deploy
```

### 5. Abrir tu aplicación
```powershell
fly open
```

---

## 🔧 Comandos Útiles

```powershell
# Ver logs en tiempo real
fly logs

# Ver estado de la app
fly status

# Abrir dashboard web
fly dashboard

# Ver secrets configurados
fly secrets list

# Escalar (si necesitas más recursos)
fly scale vm shared-cpu-1x --memory 512

# SSH a la máquina (debug)
fly ssh console

# Reiniciar app
fly apps restart

# Destruir app (eliminar completamente)
fly apps destroy maison-aurora-store
```

---

## 📊 Monitoreo

- **Dashboard**: https://fly.io/dashboard
- **Logs**: `fly logs`
- **Métricas**: Panel de Fly.io muestra CPU, memoria, requests

---

## 💰 Plan Gratuito Fly.io

- ✅ $5 USD créditos mensuales gratis
- ✅ 3 VMs compartidas (256MB cada una)
- ✅ 160GB bandwidth/mes
- ✅ Sin tarjeta de crédito requerida

Tu app consumirá aproximadamente:
- **1 VM pequeña**: ~$2-3/mes
- **Sobran créditos** para múltiples apps

---

## 🐛 Troubleshooting

### Error de conexión a BD
```powershell
# Verifica que los secrets estén configurados
fly secrets list

# Revisa logs
fly logs
```

### App no inicia
```powershell
# Ver logs detallados
fly logs --app maison-aurora-store

# SSH y revisar
fly ssh console
```

### Actualizar código
```powershell
git add .
git commit -m "Update"
fly deploy
```

---

## 🔒 Seguridad en Producción

⚠️ **IMPORTANTE**: Después del primer deploy:

1. **Cambiar contraseña del admin**
   - Login: admin@store.com / admin123
   - Cambiar inmediatamente

2. **Configurar SECRET_KEY único**
   ```powershell
   fly secrets set SECRET_KEY="$(python -c 'import secrets; print(secrets.token_hex(32))')"
   ```

3. **Deshabilitar DEBUG**
   - Ya está configurado en producción (debug=False)

---

## 🌐 URL de tu aplicación

Después del deploy, tu app estará en:
```
https://maison-aurora-store.fly.dev
```

(O el nombre que hayas elegido)

---

## 📝 Notas Importantes

1. **Primera carga lenta**: La app se "duerme" después de inactividad (auto_stop_machines). Primera request tarda ~2-5s en despertar.

2. **Persistencia**: Fly.io reinicia las VMs periódicamente. Usa Clever Cloud para BD (ya configurado ✅).

3. **Archivos estáticos**: Se sirven desde Flask. Para alta demanda, considera CDN (Cloudflare gratis).

4. **HTTPS**: Automático, Fly.io provee certificados SSL gratis.

---

## ✅ Checklist Post-Deploy

- [ ] App accesible en URL de Fly.io
- [ ] Login funciona (admin@store.com)
- [ ] Productos se cargan correctamente
- [ ] Carrito funciona
- [ ] Admin panel accesible
- [ ] Cambiar contraseña de admin
- [ ] Probar registro de usuarios
- [ ] Probar compra completa

---

¡Tu app estará en producción en ~5 minutos! 🎉
