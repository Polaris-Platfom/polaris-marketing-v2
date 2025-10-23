# 🚀 Quick Start - Desarrollo Local

## ⚠️ Error Actual

Estás viendo un error 500 en `/api/newsletter` porque las variables de entorno de Supabase no están configuradas.

---

## ✅ Solución Inmediata (2 opciones)

### Opción 1: Usar Supabase Real (Recomendado)

**Paso 1: Obtener credenciales de Supabase (5 minutos)**

1. Ve a https://supabase.com/dashboard
2. Crea un proyecto nuevo (o usa uno existente)
3. Ve a Settings → API
4. Copia:
   - Project URL: `https://xxxxx.supabase.co`
   - anon public key: `eyJ...`
   - service_role key: `eyJ...`

**Paso 2: Crear `.env.local`**

Crea un archivo llamado `.env.local` en la raíz del proyecto con:

```bash
# Application URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_PLATFORM_URL=http://localhost:3000
NEXT_PUBLIC_MARKETING_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase - REEMPLAZA CON TUS VALORES REALES
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key-aqui

# Email Addresses
FROM_EMAIL=noreply@polarisplatform.ch
CONTACT_EMAIL=hello@polarisplatform.ch
NEWSLETTER_EMAIL=newsletter@polarisplatform.ch
SUPPORT_EMAIL=support@polarisplatform.ch

# Build Settings
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

**Paso 3: Reiniciar servidor**

```bash
# Detén el servidor (Ctrl+C)
# Inicia de nuevo
npm run dev
```

**Paso 4: Configurar Resend en Edge Function**

Si quieres que los emails funcionen:

1. Ve a tu proyecto Supabase → Edge Functions → Secrets
2. Agrega estos secrets:
   ```
   RESEND_API_KEY=re_tu_key (obtén en https://resend.com)
   FROM_EMAIL=noreply@polarisplatform.ch
   CONTACT_EMAIL=hello@polarisplatform.ch
   NEWSLETTER_EMAIL=newsletter@polarisplatform.ch
   ```

---

### Opción 2: Modo Desarrollo Sin Supabase (Temporal)

Si solo quieres ver la UI sin funcionalidad backend:

**Crear archivo de mock temporal**

Crea `.env.local`:

```bash
# URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_PLATFORM_URL=http://localhost:3000
NEXT_PUBLIC_MARKETING_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase - VALORES TEMPORALES (NO FUNCIONARÁN PERO NO ROMPEN)
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-key

# Email
FROM_EMAIL=noreply@polarisplatform.ch
CONTACT_EMAIL=hello@polarisplatform.ch
NEWSLETTER_EMAIL=newsletter@polarisplatform.ch

# Build
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

⚠️ **Nota**: Con estos valores placeholder, el formulario no funcionará pero la app cargará sin errores.

---

## 🔍 Verificar que Funciona

Después de configurar `.env.local`:

1. **Reinicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

2. **Prueba el formulario de newsletter**
   - Abre http://localhost:3000
   - Baja al footer
   - Intenta suscribirte con un email

3. **Verifica en Supabase**
   - Ve a Table Editor → `newsletter_subscribers`
   - Deberías ver el email que ingresaste

---

## 📚 Para Más Detalles

Una vez que tengas Supabase configurado:

- **Setup Completo**: `NEXT_STEPS.md`
- **Guía Supabase**: `docs/setup/supabase-setup.md`
- **Migración**: `MIGRATION_TO_SUPABASE.md`

---

## 🆘 Errores Comunes

### Error: "Cannot find module @supabase/supabase-js"
```bash
npm install
```

### Error: "Failed to fetch" en consola
- Verifica que `.env.local` exista en la raíz
- Verifica que las URLs de Supabase sean correctas
- Reinicia el servidor de dev

### Edge Function falla
- Verifica que los secrets estén configurados en Supabase
- La Edge Function ya está desplegada, solo faltan los secrets

---

## ⏱️ Timeline

**Para tener todo funcionando:**
- Crear proyecto Supabase: 3 min
- Copiar credenciales: 1 min
- Crear `.env.local`: 1 min
- Reiniciar servidor: 30 seg
- **Total: ~5 minutos**

---

**¿Necesitas ayuda?** Revisa `NEXT_STEPS.md` para la guía completa paso a paso.

