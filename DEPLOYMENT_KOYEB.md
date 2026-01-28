# 🚀 Deployment en Koyeb

## 📋 Requisitos Previos

- ✅ Cuenta de GitHub con el repositorio
- ✅ Cuenta de Koyeb (https://app.koyeb.com/auth/signup)
- ✅ Base de datos MySQL en Clever Cloud (ya configurada ✅)

---

## 🎯 Pasos de Deployment

### 1. Crear Aplicación en Koyeb

1. Ve a **https://app.koyeb.com/**
2. Click en **"Create App"**
3. Selecciona **"GitHub"** como fuente

### 2. Conectar Repositorio

1. Autoriza Koyeb para acceder a GitHub
2. Selecciona el repositorio: **OliverN77/store**
3. Rama: **main**

### 3. Configuración de Build

**Builder:** Docker

Koyeb detectará automáticamente el `Dockerfile` que ya tienes.

### 4. Configurar Variables de Entorno

En la sección **"Environment variables"**, agrega todas estas:

```
SECRET_KEY=tu-clave-secreta-super-segura-cambiala

DB_HOST=beamkiiw0deqsoihaanu-mysql.services.clever-cloud.com
DB_USER=u81c1hzs6ckuunja
DB_PASSWORD=vCPsLR7l4orpR6mTjxWt
DB_NAME=beamkiiw0deqsoihaanu
DB_PORT=3306

MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=olivernie2626@gmail.com
MAIL_PASSWORD=rtlwhkeyzachylvi
MAIL_DEFAULT_SENDER=olivernie2626@gmail.com

MAIL_DEBUG=False
MAIL_SUPPRESS_SEND=False
```

### 5. Configuración de Puerto

- **Port:** 8080 (Koyeb lo detecta del Dockerfile)
- **Health check path:** `/` (opcional)

### 6. Configuración de Instancia

**Plan Gratuito:**
- **Instance type:** Nano (gratuito)
- **Regions:** Selecciona la más cercana (Frankfurt, Washington, etc.)
- **Scaling:** 1 instancia mínima

### 7. Deploy

1. **App name:** `maison-aurora` (o el que prefieras)
2. Click en **"Deploy"**
3. Espera 3-5 minutos

---

## 🔄 Deployment Automático

Koyeb está conectado a GitHub, cada vez que hagas `git push`:
1. Koyeb detecta el cambio
2. Construye nueva imagen Docker
3. Despliega automáticamente

---

## 🌐 Acceder a tu Aplicación

Después del deploy, Koyeb te dará una URL:
```
https://maison-aurora-<tu-id>.koyeb.app
```

---

## 🛠️ Comandos Post-Deploy

### Verificar logs:
1. Ve a tu app en Koyeb dashboard
2. Click en **"Logs"**
3. Verás logs en tiempo real

### Redeployar manualmente:
1. Dashboard → Tu app
2. Click en **"Redeploy"**

### Cambiar variables de entorno:
1. Dashboard → Tu app → **Settings**
2. **Environment variables**
3. Edita y guarda
4. Koyeb redesplegará automáticamente

---

## 📊 Monitoreo

**Dashboard de Koyeb:**
- CPU y memoria en tiempo real
- Requests/segundo
- Logs en streaming
- Health checks

---

## 💰 Plan Gratuito Koyeb

- ✅ 1 servicio web gratuito
- ✅ Nano instance: 512 MB RAM, 0.1 vCPU
- ✅ 100 GB bandwidth/mes
- ✅ No se duerme (always on)
- ✅ Deployment automático desde GitHub
- ✅ HTTPS incluido

---

## 🐛 Troubleshooting

### App no inicia

**Verificar logs:**
```
Dashboard → App → Logs
```

**Errores comunes:**
- Variables de entorno incorrectas
- Puerto incorrecto (debe ser 8080)
- Error de conexión a BD (verifica variables DB_*)

### Error de conexión a MySQL

**Verificar variables:**
1. Dashboard → Settings → Environment variables
2. Confirma que DB_HOST, DB_USER, DB_PASSWORD, DB_NAME estén correctos

**Probar conexión desde logs:**
Los logs mostrarán errores de MySQL si las credenciales son incorrectas.

### App se recarga constantemente

Significa que el health check falla:
- Verifica que la app responda en el puerto 8080
- Revisa logs para errores de inicio

---

## 🔒 Seguridad

### Después del primer deploy:

1. **Cambiar contraseña admin:**
   - Login: `admin@store.com` / `admin123`
   - Ir a panel admin y cambiar contraseña

2. **Generar SECRET_KEY único:**
   - Ve a Settings → Environment variables
   - Cambia `SECRET_KEY` por un valor aleatorio seguro
   - Ejemplo: `d8f4a7b6c9e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7`

3. **MAIL_DEBUG en False:**
   - Ya configurado para producción ✅

---

## ✅ Checklist de Deployment

- [ ] Cuenta de Koyeb creada
- [ ] Repositorio conectado a Koyeb
- [ ] Variables de entorno configuradas
- [ ] Build exitoso (revisa logs)
- [ ] App accesible en URL de Koyeb
- [ ] Login funciona (admin@store.com)
- [ ] Productos se cargan
- [ ] Carrito funciona
- [ ] Admin panel accesible
- [ ] Cambiar contraseña de admin

---

## 📝 Diferencias vs Fly.io

| Característica | Koyeb | Fly.io |
|----------------|-------|--------|
| **Tarjeta requerida** | ❌ No | ✅ Sí |
| **RAM gratuita** | 512 MB | 256 MB × 3 |
| **Siempre activo** | ✅ Sí | ⚠️ Se duerme |
| **Deployment** | GitHub auto | CLI manual |
| **Dashboard** | ✅ Muy visual | Terminal-first |

---

## 🎉 ¡Listo para producción!

Tu aplicación **Maison Aurora** estará corriendo en Koyeb con:
- ✅ SSL/HTTPS automático
- ✅ Base de datos Clever Cloud conectada
- ✅ Deployment automático desde GitHub
- ✅ Monitoreo en tiempo real
- ✅ 100% gratuito

URL de ejemplo: `https://maison-aurora-olivern77.koyeb.app`

---

## 🔗 Links Útiles

- **Dashboard:** https://app.koyeb.com/
- **Documentación:** https://www.koyeb.com/docs
- **Status:** https://status.koyeb.com/
