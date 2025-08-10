# 📧 Configuración de Email con Microsoft 365 SMTP

Esta guía te ayudará a configurar el envío de emails usando Microsoft 365 SMTP para los formularios de contacto y suscripción de Polaris Platform.

## 🔧 Configuración de Variables de Entorno

### 1. Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# Microsoft 365 SMTP Configuration
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=tu-email@tudominio.com
SMTP_PASSWORD=tu-contraseña-de-aplicacion
SMTP_FROM=tu-email@tudominio.com
SMTP_FROM_NAME=Polaris Platform

# Email Configuration
CONTACT_EMAIL=contacto@polaris-platform.com
SUPPORT_EMAIL=soporte@polaris-platform.com
NEWSLETTER_EMAIL=newsletter@polaris-platform.com

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Configurar Microsoft 365

#### Paso 1: Habilitar autenticación de 2 factores
1. Ve a [account.microsoft.com](https://account.microsoft.com)
2. Accede a **Seguridad** > **Verificación en dos pasos**
3. Habilita la verificación en dos pasos

#### Paso 2: Crear contraseña de aplicación
1. Ve a [account.microsoft.com/security](https://account.microsoft.com/security)
2. Selecciona **Opciones de inicio de sesión avanzadas**
3. Selecciona **Crear una nueva contraseña de aplicación**
4. Nombra la aplicación: "Polaris Platform"
5. Copia la contraseña generada y úsala como `SMTP_PASSWORD`

#### Paso 3: Verificar configuración SMTP
- **Host**: `smtp.office365.com`
- **Puerto**: `587`
- **Seguridad**: `STARTTLS`
- **Autenticación**: `Sí`

### 3. Configuración para otros proveedores

#### Gmail SMTP
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASSWORD=tu-contraseña-de-aplicacion
```

#### Outlook/Hotmail SMTP
```bash
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=tu-email@outlook.com
SMTP_PASSWORD=tu-contraseña
```

## 🔒 Seguridad y Mejores Prácticas

### Variables de Entorno
- ✅ **NUNCA** commitees el archivo `.env.local` al repositorio
- ✅ El archivo `.env.local` ya está en `.gitignore`
- ✅ Usa contraseñas de aplicación específicas
- ✅ Rotación regular de credenciales

### Emails Corporativos
- ✅ Usa un dominio corporativo para `SMTP_FROM`
- ✅ Configura registros SPF, DKIM y DMARC
- ✅ Usa emails dedicados para diferentes funciones

## 📧 Funcionalidades Implementadas

### Formulario de Contacto (`/contact`)
- ✅ Validación de campos obligatorios
- ✅ Email de confirmación al usuario
- ✅ Notificación al equipo de soporte
- ✅ Manejo de errores elegante

### Suscripción Newsletter
- ✅ **Coming Soon page**: `/coming-soon`
- ✅ **Footer**: En todas las páginas
- ✅ Email de bienvenida automático
- ✅ Notificación al equipo de marketing

### Templates de Email
- ✅ Diseño responsive
- ✅ Branding de Polaris
- ✅ Contenido dinámico
- ✅ Soporte dark/light theme

## 🧪 Pruebas

### Probar conexión SMTP
```bash
# En el contenedor de Docker
curl -X POST http://localhost:3000/api/test-email
```

### Probar formulario de contacto
1. Ve a `/contact`
2. Completa el formulario
3. Verifica emails en bandeja de entrada

### Probar suscripción newsletter
1. Ve a `/coming-soon` o usa el footer
2. Ingresa tu email
3. Verifica email de bienvenida

## 🚨 Solución de Problemas

### Error: "Invalid login"
- ✅ Verifica que la autenticación 2FA esté habilitada
- ✅ Usa una contraseña de aplicación, no tu contraseña normal
- ✅ Verifica que el email sea correcto

### Error: "Connection timeout"
- ✅ Verifica la configuración del host y puerto
- ✅ Asegúrate de que no haya firewall bloqueando el puerto 587
- ✅ Verifica la conectividad a internet

### Error: "Sender not allowed"
- ✅ Verifica que `SMTP_FROM` coincida con `SMTP_USER`
- ✅ Asegúrate de que el dominio esté autorizado

### Emails no llegan
- ✅ Revisa la carpeta de spam
- ✅ Verifica los logs del servidor
- ✅ Confirma que las direcciones de destino sean válidas

## 📊 Logs y Monitoreo

Los logs de email se almacenan en la consola del servidor. Para ver los logs:

```bash
# Logs del contenedor
docker compose logs marketing -f
```

### Información útil en logs:
- ✅ Intentos de envío de email
- ✅ Errores de conexión SMTP
- ✅ Respuestas del servidor de email
- ✅ Datos de formularios procesados

## 🔄 Integración con Servicios Externos

Para producción, considera integrar con:

### Servicios de Email Transaccional
- **SendGrid**: Para alta deliverabilidad
- **Mailgun**: Para APIs robustas
- **AWS SES**: Para integración con AWS

### Servicios de Newsletter
- **Mailchimp**: Para campañas de marketing
- **ConvertKit**: Para automatización
- **Sendinblue**: Para email marketing

### Analytics
- **Google Analytics**: Para tracking de conversiones
- **Mixpanel**: Para analytics de eventos
- **Segment**: Para unified customer data

---

## 🛟 Soporte

Si necesitas ayuda con la configuración:

1. 📧 **Email**: soporte@polaris-platform.com
2. 💬 **Slack**: Canal #dev-support
3. 📖 **Documentación**: `/docs/email-setup`

---

**Nota**: Esta configuración está optimizada para desarrollo. Para producción, considera usar servicios de email transaccional profesionales. 