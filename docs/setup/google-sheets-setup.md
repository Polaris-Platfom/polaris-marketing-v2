# 📊 Configuración de Google Sheets para Polaris Platform

Esta guía te ayudará a configurar la integración con Google Sheets para registrar automáticamente los suscriptores del newsletter.

## 🚀 Configuración Inicial

### 1. Crear proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets:
   - Ve a "APIs & Services" > "Library"
   - Busca "Google Sheets API"
   - Haz clic en "Enable"

### 2. Crear Service Account

1. Ve a "APIs & Services" > "Credentials"
2. Haz clic en "Create Credentials" > "Service Account"
3. Completa los detalles:
   - **Name**: `polaris-sheets-service`
   - **Description**: `Service account for Polaris newsletter Google Sheets integration`
4. Haz clic en "Create and Continue"
5. En "Grant this service account access to project":
   - **Role**: `Editor` (o un rol más específico si prefieres)
6. Haz clic en "Continue" y luego "Done"

### 3. Crear clave privada para Service Account

1. En la página de Credentials, encontra tu service account recién creado
2. Haz clic en el email del service account
3. Ve a la pestaña "Keys"
4. Haz clic en "Add Key" > "Create New Key"
5. Selecciona "JSON" y haz clic en "Create"
6. Se descargará un archivo JSON - **guárdalo de forma segura**

### 4. Configurar Google Sheets

1. Abre [Google Sheets](https://sheets.google.com/)
2. Crea una nueva hoja de cálculo o usa la existente:
   ```
   https://docs.google.com/spreadsheets/d/1uiHpRpOcAof8cFMdCGfFIybOWf3V1oN_8BcYTO3URBU/edit
   ```
3. Extrae el ID de la spreadsheet de la URL:
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```
4. Comparte la hoja con el service account:
   - Haz clic en "Share" (Compartir)
   - Agrega el email del service account (lo encuentras en el archivo JSON descargado)
   - Dale permisos de "Editor"

## ⚙️ Configuración de Variables de Entorno

### Agregar al archivo .env.local

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_ID=1uiHpRpOcAof8cFMdCGfFIybOWf3V1oN_8BcYTO3URBU
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTU_CLAVE_PRIVADA_AQUI\n-----END PRIVATE KEY-----\n"
```

### Extraer información del archivo JSON

Del archivo JSON descargado, extrae:

```json
{
  "type": "service_account",
  "project_id": "tu-project-id",
  "private_key_id": "key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "service-account@project-id.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account%40project-id.iam.gserviceaccount.com"
}
```

**Variables requeridas:**
- `GOOGLE_SHEETS_ID`: ID de tu hoja de cálculo
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: Valor de `client_email`
- `GOOGLE_PRIVATE_KEY`: Valor completo de `private_key` (incluye saltos de línea)

## 🔧 Estructura de la Hoja de Cálculo

La aplicación creará automáticamente las siguientes columnas:

| Timestamp | Name | Email | Source | Language |
|-----------|------|-------|--------|----------|
| 2024-01-15T10:30:00.000Z | Juan Pérez | juan@email.com | footer | es |
| 2024-01-15T11:45:00.000Z | Mary Smith | mary@email.com | coming-soon | en |

### Descripción de Columnas

- **Timestamp**: Fecha y hora de suscripción (ISO format)
- **Name**: Nombre del suscriptor (opcional)
- **Email**: Dirección de email del suscriptor
- **Source**: Origen de la suscripción (`footer`, `coming-soon`, etc.)
- **Language**: Idioma seleccionado (`es`, `en`)

## 🧪 Pruebas de Conexión

### 1. Probar conexión a Google Sheets

```bash
curl http://localhost:3000/api/test-sheets
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Successfully connected to Google Sheets: Polaris Subscribers"
}
```

### 2. Probar suscripción completa

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@polaris-platform.com",
    "name": "Usuario Test",
    "source": "api-test",
    "language": "es"
  }'
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Te has suscrito exitosamente al newsletter. Revisa tu email para confirmación.",
  "sheetsStatus": "saved"
}
```

## 🔒 Seguridad y Mejores Prácticas

### Protección de Credenciales

1. **Nunca commitees** el archivo JSON de credenciales al repositorio
2. **Usa variables de entorno** para todas las configuraciones sensibles
3. **Rota las claves** periódicamente (cada 90 días recomendado)
4. **Usa IAM roles** con permisos mínimos necesarios

### Agregar a .gitignore

```bash
# Google Cloud credentials
google-sheets-credentials.json
service-account-key.json

# Environment files
.env.local
.env.production
```

### Variables de Entorno en Producción

Para Docker/producción, agrega las variables al archivo de configuración:

```dockerfile
# Dockerfile
ENV GOOGLE_SHEETS_ID=tu-sheets-id
ENV GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
ENV GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## 📊 Monitoreo y Logs

### Revisar logs de la aplicación

```bash
# En desarrollo
npm run dev

# En Docker
docker compose logs marketing -f
```

### Logs importantes a revisar

- ✅ `Successfully added subscriber to Google Sheets: email@example.com`
- ⚠️ `Failed to add subscriber to Google Sheets (but email sent): [error]`
- ❌ `Error initializing Google Sheets: Missing configuration`

## 🚨 Solución de Problemas

### Error: "Missing Google Sheets configuration"

**Causa**: Variables de entorno no configuradas correctamente

**Solución**:
1. Verifica que todas las variables estén en `.env.local`
2. Reinicia el servidor de desarrollo
3. Verifica que no haya espacios extra en las variables

### Error: "Failed to connect to Google Sheets"

**Causa**: Problema de autenticación o permisos

**Solución**:
1. Verifica que el service account tenga acceso a la hoja
2. Comprueba que la API de Google Sheets esté habilitada
3. Verifica que la clave privada esté correctamente formateada

### Error: "Spreadsheet not found"

**Causa**: ID de hoja incorrecto o sin permisos

**Solución**:
1. Verifica el GOOGLE_SHEETS_ID en la URL de tu hoja
2. Comparte la hoja con el email del service account
3. Asegúrate de que la hoja sea accesible

### Error: "Request had insufficient authentication scopes"

**Causa**: Service account sin permisos suficientes

**Solución**:
1. Verifica que el scope incluya `https://www.googleapis.com/auth/spreadsheets`
2. Re-crea la clave del service account si es necesario
3. Asegúrate de que el service account tenga rol de Editor

## 📞 Soporte

Si necesitas ayuda adicional:

1. 📧 **Email**: soporte@polaris-platform.com
2. 📖 **Documentación**: Revisa los logs de la aplicación
3. 🛠️ **Debug**: Usa `/api/test-sheets` para verificar la conexión

---

**Nota**: Mantén tus credenciales seguras y nunca las compartas públicamente. Esta integración está diseñada para ser robusta - si Google Sheets falla, los emails aún se enviarán correctamente. 