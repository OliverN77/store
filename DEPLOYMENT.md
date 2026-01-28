# Guía de Deployment en Clever Cloud

## 📋 Pasos para desplegar tu aplicación

### 1. Preparar la aplicación (Ya completado ✅)
- ✅ requirements.txt con gunicorn
- ✅ Base de datos MySQL configurada
- ✅ Variables de entorno configuradas
- ✅ Archivos de configuración creados

### 2. Crear aplicación en Clever Cloud

#### A. Desde el Dashboard:
1. Ve a https://console.clever-cloud.com/
2. Selecciona tu organización
3. Click en **"Create an application"**
4. Selecciona **"Python"** como tipo de aplicación
5. En opciones:
   - **Deployment**: Selecciona **"Git"** (conecta tu repo de GitHub)
   - **Name**: `maison-aurora-store` (o el que prefieras)
   - **Region**: Elige la más cercana (ej: `par` para París)
   - **Plan**: **FREE** (Nano instance)

#### B. Conectar repositorio:
- Opción 1: **Conectar GitHub** (recomendado)
  - Autoriza Clever Cloud para acceder a tu repo
  - Selecciona el repositorio `OliverN77/store`
  - Branch: `main`
  
- Opción 2: **Git Clever Cloud** (alternativa)
  - Clever Cloud te dará un remote Git
  - Ejecuta: `git remote add clever <URL-QUE-TE-DEN>`
  - Push: `git push clever main`

### 3. Configurar Variables de Entorno

En el panel de Clever Cloud → **Environment variables**, agrega:

```
SECRET_KEY=genera-una-clave-secreta-segura-aqui
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=olivernie2626@gmail.com
MAIL_PASSWORD=rtlwhkeyzachylvi
MAIL_DEFAULT_SENDER=olivernie2626@gmail.com
DB_HOST=beamkiiw0deqsoihaanu-mysql.services.clever-cloud.com
DB_USER=u81c1hzs6ckuunja
DB_PASSWORD=vCPsLR7l4orpR6mTjxWt
DB_NAME=beamkiiw0deqsoihaanu
DB_PORT=3306
MAIL_DEBUG=False
MAIL_SUPPRESS_SEND=False
```

⚠️ **IMPORTANTE**: Cambia `MAIL_DEBUG=False` en producción

### 4. Vincular MySQL Add-on

En tu aplicación Python:
1. Click en **"Add-ons"** en el menú lateral
2. Click en **"Link an existing add-on"**
3. Selecciona tu MySQL addon: `beamkiiw0deqsoihaanu`
4. Confirm

Clever Cloud automáticamente agregará las variables `MYSQL_ADDON_*`

### 5. Configurar Command Start (Opcional)

Si no detecta automáticamente el Procfile:
1. Ve a **"Information"** → **"Configuration"**
2. En **"Start command"**, asegúrate que dice:
   ```
   gunicorn app:app --bind 0.0.0.0:$PORT --workers 2
   ```

### 6. Deploy

- Si usas GitHub: El deploy es **automático** al hacer push
- Si usas Git Clever: `git push clever main`

### 7. Verificar Deployment

1. Ve a **"Logs"** en tiempo real
2. Busca mensajes como:
   ```
   [INFO] Starting gunicorn
   [INFO] Listening at: http://0.0.0.0:8080
   [INFO] Worker 1 started
   ```
3. Tu app estará en: `https://app-XXXXXX.cleverapps.io`

### 8. (Opcional) Configurar Dominio Personalizado

1. Ve a **"Domain names"**
2. Agrega tu dominio: `maisonaurorastore.com`
3. Configura DNS según instrucciones

---

## 🔍 Troubleshooting

### Error: "No module named 'X'"
- Verifica que el módulo esté en `requirements.txt`
- Redeploy la aplicación

### Error: "Connection refused" (MySQL)
- Verifica que el MySQL addon esté vinculado
- Revisa las variables de entorno

### Error: "Application timeout"
- Aumenta workers en Procfile: `--workers 4`
- Aumenta timeout: `--timeout 180`

### Ver logs:
```bash
# Instalar Clever Tools CLI (opcional)
npm install -g clever-tools

# Login
clever login

# Ver logs en vivo
clever logs
```

---

## ✅ Checklist Final

- [ ] Repositorio en GitHub actualizado
- [ ] Aplicación Python creada en Clever Cloud
- [ ] Variables de entorno configuradas
- [ ] MySQL addon vinculado
- [ ] Deployment exitoso
- [ ] URL accesible
- [ ] Probar login admin
- [ ] Verificar productos
- [ ] Probar funcionalidad completa

---

## 📞 Soporte

- Docs: https://www.clever-cloud.com/doc/python/
- Status: https://www.clever-cloud-status.com/
- Community: https://github.com/CleverCloud/Community/discussions

---

## 🎉 ¡Tu aplicación estará en producción!

URL final: `https://app-XXXXXX.cleverapps.io`
