# 📧 Configuración de Email con Resend en Supabase

## 🔍 Problema Actual

Los emails no se están enviando porque la Edge Function necesita configurar **secrets** (variables de entorno seguras) en Supabase.

**⚠️ RESTRICCIÓN DE RESEND:** Sin un dominio verificado, Resend **SOLO** permite enviar emails a tu propia dirección (`osmelprieto92@gmail.com`). No puedes enviar a `hello@polarisplatform.ch` hasta que verifiques el dominio.

---

## 📝 Secrets Necesarios

La Edge Function `send-email` necesita los siguientes secrets configurados:

| Secret Name | Descripción | Para Testing (Sin Dominio Verificado) | Para Producción (Con Dominio Verificado) |
|------------|-------------|--------------------------------------|------------------------------------------|
| `RESEND_API_KEY` | API key de Resend | `re_xxxxxxxxxxxxx` | `re_xxxxxxxxxxxxx` |
| `FROM_EMAIL` | Email remitente | `onboarding@resend.dev` | `noreply@polarisplatform.ch` |
| `CONTACT_EMAIL` | Email destino para contacto | `osmelprieto92@gmail.com` (tu email) | `hello@polarisplatform.ch` |
| `NEWSLETTER_EMAIL` | Email destino para newsletter | `osmelprieto92@gmail.com` (tu email) | `newsletter@polarisplatform.ch` |

**⚠️ IMPORTANTE:** Sin dominio verificado, Resend solo permite enviar emails a **tu propia dirección** (`osmelprieto92@gmail.com`).

---

## 🚀 Pasos para Configurar los Secrets

### 1. Obtener API Key de Resend

1. Ve a https://resend.com/api-keys
2. Si no tienes una cuenta, créala primero
3. Crea una nueva API key:
   - Click en "Create API Key"
   - Nombre: `Polaris Platform Production`
   - Permisos: `Sending access`
4. **Copia la API key** (solo se muestra una vez)

---

### 2. Verificar Dominio en Resend (Importante!)

**⚠️ Para enviar desde `@polarisplatform.ch` necesitas verificar el dominio:**

1. Ve a https://resend.com/domains
2. Click en "Add Domain"
3. Ingresa: `polarisplatform.ch`
4. Sigue las instrucciones para agregar registros DNS:
   - Agrega los registros TXT/CNAME que Resend te proporcione en tu proveedor de DNS
   - Espera 24-48 horas para que se propague

**Alternativa para Testing (Inmediato):**
- Resend permite enviar desde `onboarding@resend.dev` sin verificar dominio
- Para pruebas, usa temporalmente:
  - `FROM_EMAIL=onboarding@resend.dev`
  - Solo para desarrollo, no para producción

---

### 3. Configurar Secrets en Supabase

#### Opción A: Desde Dashboard (Recomendado)

1. Ve a https://supabase.com/dashboard/project/snongqljarskvbifqngf/settings/functions
2. Click en la sección "**Secrets**" o "**Environment Variables**"
3. Agrega cada secret:

**Para Testing (SIN dominio verificado):**
```
RESEND_API_KEY = re_your_actual_key_here
FROM_EMAIL = onboarding@resend.dev
CONTACT_EMAIL = osmelprieto92@gmail.com
NEWSLETTER_EMAIL = osmelprieto92@gmail.com
```

**Para Producción (CON dominio verificado):**
```
RESEND_API_KEY = re_your_actual_key_here
FROM_EMAIL = noreply@polarisplatform.ch
CONTACT_EMAIL = hello@polarisplatform.ch
NEWSLETTER_EMAIL = newsletter@polarisplatform.ch
```

4. Click "Save" después de agregar cada uno

#### Opción B: Desde CLI (Avanzado)

Si tienes Supabase CLI instalado:

```bash
supabase secrets set RESEND_API_KEY="re_your_actual_key_here"
supabase secrets set FROM_EMAIL="noreply@polarisplatform.ch"
supabase secrets set CONTACT_EMAIL="hello@polarisplatform.ch"
supabase secrets set NEWSLETTER_EMAIL="newsletter@polarisplatform.ch"
```

---

### 4. Reiniciar Edge Function

Después de agregar los secrets:

1. Ve a https://supabase.com/dashboard/project/snongqljarskvbifqngf/functions
2. Encuentra la función `send-email`
3. Click en "**Restart**" o "**Redeploy**"
4. Espera 30 segundos a que reinicie

---

## 🧪 Probar la Configuración

### Desde tu aplicación local:

```bash
node test-contact-email.js
```

**Resultado esperado:**
```
✅ TEST EXITOSO - Verifica tu email en: hello@polarisplatform.ch
   Message ID: xxx-xxx-xxx
```

---

### Desde el navegador:

1. Abre http://localhost:3000
2. Ve al footer
3. Prueba el formulario de contacto
4. Deberías recibir un email en `hello@polarisplatform.ch`

---

## 🔧 Troubleshooting

### Error: "Domain not verified"

**Problema:** Intentas enviar desde `@polarisplatform.ch` pero el dominio no está verificado.

**Solución temporal:**
1. Usa `FROM_EMAIL=onboarding@resend.dev` para testing
2. Verifica el dominio en Resend siguiendo el paso 2

---

### Error: "Invalid API key"

**Problema:** La API key de Resend no es válida.

**Solución:**
1. Verifica que copiaste la API key completa (empieza con `re_`)
2. Crea una nueva API key en https://resend.com/api-keys
3. Actualiza el secret `RESEND_API_KEY` en Supabase
4. Reinicia la Edge Function

---

### Error: "Missing required fields"

**Problema:** Faltan secrets en la configuración.

**Solución:**
1. Verifica que todos los 4 secrets estén configurados:
   ```
   RESEND_API_KEY
   FROM_EMAIL
   CONTACT_EMAIL
   NEWSLETTER_EMAIL
   ```
2. Reinicia la Edge Function

---

### Logs detallados en Supabase

Para ver exactamente qué error está ocurriendo:

1. Ve a https://supabase.com/dashboard/project/snongqljarskvbifqngf/logs/edge-functions
2. Filtra por función: `send-email`
3. Los logs mostrarán emojis indicando el estado:
   - 📧 Email request received
   - 🔑 Environment check
   - 📨 Sending...
   - ✅ Success
   - ❌ Error (con detalles)

---

## ✅ Checklist de Configuración

Antes de probar, asegúrate de:

- [ ] API key de Resend obtenida y válida
- [ ] Dominio verificado en Resend (o usando `onboarding@resend.dev`)
- [ ] Los 4 secrets configurados en Supabase Edge Function
- [ ] Edge Function reiniciada después de agregar secrets
- [ ] Script de prueba ejecutado: `node test-contact-email.js`
- [ ] Email recibido en `hello@polarisplatform.ch`

---

## 📞 Próximos Pasos

Una vez que los emails funcionen:

1. ✅ Configurar dominio personalizado en Resend
2. ✅ Probar todos los formularios:
   - Newsletter subscription
   - Contact form
   - Job applications
3. ✅ Deploy a producción (Netlify)
4. ✅ Configurar las mismas variables en Netlify

---

## 🔗 Enlaces Útiles

- **Supabase Functions:** https://supabase.com/dashboard/project/snongqljarskvbifqngf/functions
- **Supabase Secrets:** https://supabase.com/dashboard/project/snongqljarskvbifqngf/settings/functions
- **Resend Dashboard:** https://resend.com/overview
- **Resend API Keys:** https://resend.com/api-keys
- **Resend Domains:** https://resend.com/domains
- **Edge Function Logs:** https://supabase.com/dashboard/project/snongqljarskvbifqngf/logs/edge-functions

---

**¡Una vez configurado, todo funcionará perfectamente!** 🚀

