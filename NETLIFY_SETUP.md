# 🚀 Netlify Deployment - Quick Setup

Tu proyecto está listo para desplegarse en Netlify! Sigue estos pasos simples.

---

## ✅ Lo que ya está configurado

- ✅ `netlify.toml` con configuración optimizada
- ✅ `@netlify/plugin-nextjs` instalado
- ✅ `next.config.js` compatible con Netlify
- ✅ Scripts de verificación pre-deployment
- ✅ Documentación completa

---

## 📋 Pasos Rápidos

### 1️⃣ Sube los cambios a GitHub

```bash
git add .
git commit -m "feat: add Netlify deployment configuration"
git push origin main
```

### 2️⃣ Conecta con Netlify

1. Ve a [Netlify](https://app.netlify.com/)
2. Click en **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** y autoriza
4. Elige el repositorio: `Polaris-Platfom/polaris-marketing-v2`
5. Netlify detectará automáticamente la configuración

### 3️⃣ Configura Variables de Entorno

En **Site Settings** → **Environment Variables**, agrega:

#### Requeridas

```env
# URLs de producción
NEXT_PUBLIC_API_URL=https://api.polarisplatform.ch
NEXT_PUBLIC_PLATFORM_URL=https://app.polarisplatform.ch
NEXT_PUBLIC_MARKETING_URL=https://polarisplatform.ch

# Supabase (Database y Edge Functions)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Resend (Email - configurado en Edge Function)
RESEND_API_KEY=re_your_api_key_here

# Email Addresses
FROM_EMAIL=noreply@polarisplatform.ch
CONTACT_EMAIL=hello@polarisplatform.ch
NEWSLETTER_EMAIL=newsletter@polarisplatform.ch

# Build
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

#### Opcionales

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
```

### 4️⃣ Despliega

Click en **"Deploy site"** y espera 2-5 minutos.

---

## 🔍 Verificación

Después del deployment, verifica:

- [ ] ✅ Site carga en `https://[tu-site].netlify.app`
- [ ] ✅ Todas las páginas funcionan
- [ ] ✅ Formulario de contacto envía emails
- [ ] ✅ Cambio de idioma funciona
- [ ] ✅ Modo oscuro funciona
- [ ] ✅ Blog carga correctamente
- [ ] ✅ Imágenes se muestran
- [ ] ✅ Bandera suiza en footer

---

## 🌐 Dominio Personalizado (Opcional)

### Configurar DNS

1. En Netlify: **Domain Settings** → **Add custom domain**
2. Ingresa: `polarisplatform.ch`
3. Agrega estos registros DNS en tu proveedor:

```
Tipo: A
Nombre: @
Valor: 75.2.60.5

Tipo: CNAME
Nombre: www
Valor: [tu-site].netlify.app
```

4. Espera 24-48 horas para propagación
5. HTTPS se activa automáticamente

---

## 📚 Documentación Completa

- **Guía Detallada**: [docs/setup/netlify-deployment.md](docs/setup/netlify-deployment.md)
- **Checklist Completo**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **Setup Supabase**: [docs/setup/supabase-setup.md](docs/setup/supabase-setup.md)
- **Migración a Supabase**: [MIGRATION_TO_SUPABASE.md](MIGRATION_TO_SUPABASE.md)

---

## 🆘 Troubleshooting

### Build falla

```bash
# Solución: Limpia caché y redeploy
Site Settings → Build & Deploy → Clear cache and retry deploy
```

### Variables de entorno no funcionan

1. Verifica que nombres sean correctos
2. Variables cliente deben empezar con `NEXT_PUBLIC_`
3. Redeploy después de agregar variables

### API routes no funcionan

1. Verifica que `@netlify/plugin-nextjs` esté instalado
2. Revisa logs de funciones en dashboard

---

## 🎯 Build Settings

Estos valores ya están configurados en `netlify.toml`:

```toml
Build command: npm run build
Publish directory: .next
Node version: 20
```

---

## ⚡ Deployment Automático

Netlify despliega automáticamente cuando:

- ✅ Haces push a `main`
- ✅ Merges un pull request
- ✅ Triggers manual desde dashboard

Cada PR obtiene su propio preview URL para testing.

---

## 📞 Soporte

¿Problemas? Consulta:

- [Netlify Docs](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Community Forums](https://answers.netlify.com/)

---

## 🎉 ¡Listo!

Tu sitio estará live en minutos. 

**URL temporal**: `https://[nombre-unico].netlify.app`  
**URL personalizada**: `https://polarisplatform.ch` (después de configurar DNS)

---

**Última actualización**: 2025-01-23  
**Mantenido por**: Polaris Platform Team

