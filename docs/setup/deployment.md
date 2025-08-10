# 🚀 Deployment Guide - Polaris Marketing Website

Esta guía te ayudará a configurar el deployment continuo con GitHub Actions en un droplet de Digital Ocean usando Docker.

## 📋 Tabla de Contenidos

1. [Prerrequisitos](#prerrequisitos)
2. [Configuración del Servidor](#configuración-del-servidor)
3. [Configuración de GitHub Actions](#configuración-de-github-actions)
4. [Configuración de Dominio y SSL](#configuración-de-dominio-y-ssl)
5. [Deployment](#deployment)
6. [Monitoreo y Mantenimiento](#monitoreo-y-mantenimiento)
7. [Troubleshooting](#troubleshooting)

## 🔧 Prerrequisitos

### Cuentas necesarias:
- ✅ Cuenta de Digital Ocean
- ✅ Cuenta de Docker Hub
- ✅ Dominio registrado
- ✅ Acceso a GitHub repository

### Herramientas locales:
- ✅ SSH client
- ✅ Git
- ✅ Docker (opcional, para testing local)

## 🖥️ Configuración del Servidor

### Paso 1: Crear Droplet en Digital Ocean

1. **Crear nuevo droplet:**
   - OS: Ubuntu 22.04 LTS
   - Tamaño: Básico, 2GB RAM, 1 CPU (mínimo)
   - Región: La más cercana a tu audiencia
   - Autenticación: SSH Key (recomendado)

2. **Configurar DNS:**
   ```bash
   # Agregar registros A en tu proveedor DNS
   A record: your-domain.com -> [IP_DEL_DROPLET]
   A record: www.your-domain.com -> [IP_DEL_DROPLET]
   ```

### Paso 2: Configurar Servidor

1. **Conectar al servidor:**
   ```bash
   ssh root@[IP_DEL_DROPLET]
   ```

2. **Ejecutar script de configuración:**
   ```bash
   # Descargar script de configuración
   wget https://raw.githubusercontent.com/tu-usuario/polaris-marketing/master/deploy/setup-server.sh
   
   # Hacer ejecutable
   chmod +x setup-server.sh
   
   # Ejecutar como root
   ./setup-server.sh
   ```

3. **Configurar SSL:**
   ```bash
   # Después de que el DNS esté propagado
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

### Paso 3: Configurar Nginx

1. **Copiar configuración:**
   ```bash
   sudo cp /path/to/nginx.conf /etc/nginx/sites-available/polaris
   sudo ln -s /etc/nginx/sites-available/polaris /etc/nginx/sites-enabled/
   sudo rm /etc/nginx/sites-enabled/default
   ```

2. **Actualizar configuración:**
   ```bash
   # Editar el archivo y reemplazar 'your-domain.com' con tu dominio real
   sudo nano /etc/nginx/sites-available/polaris
   ```

3. **Reiniciar Nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 🔐 Configuración de GitHub Actions

### Secrets necesarios en GitHub:

Ve a: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

#### Docker Hub:
```bash
DOCKER_USERNAME=tu-usuario-docker-hub
DOCKER_PASSWORD=tu-password-docker-hub
```

#### Digital Ocean Server:
```bash
DO_HOST=tu-dominio.com  # o IP del servidor
DO_USERNAME=deploy
DO_PORT=22
DO_SSH_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
...tu-clave-ssh-privada...
-----END OPENSSH PRIVATE KEY-----
```

#### Variables de Entorno:
```bash
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=hello@polarisplatform.ch
SMTP_PASSWORD=tu-password-smtp
SMTP_FROM=hello@polarisplatform.ch
SMTP_FROM_NAME=Polaris Platform
CONTACT_EMAIL=hello@polarisplatform.ch
SUPPORT_EMAIL=hello@polarisplatform.ch
NEWSLETTER_EMAIL=hello@polarisplatform.ch
```

### Configurar SSH Key:

1. **Generar SSH key pair:**
   ```bash
   ssh-keygen -t ed25519 -C "github-actions@polaris-platform.com"
   ```

2. **Agregar public key al servidor:**
   ```bash
   # En tu servidor
   sudo -u deploy mkdir -p /home/deploy/.ssh
   sudo -u deploy nano /home/deploy/.ssh/authorized_keys
   # Pegar la clave pública
   sudo -u deploy chmod 600 /home/deploy/.ssh/authorized_keys
   ```

3. **Agregar private key a GitHub Secrets:**
   - Copia el contenido completo de la clave privada
   - Agrégala como secret `DO_SSH_KEY`

## 🌐 Configuración de Dominio y SSL

### Paso 1: Configurar DNS

```bash
# Registros DNS necesarios
A     @               [IP_DEL_SERVIDOR]
A     www             [IP_DEL_SERVIDOR]
CNAME api             your-domain.com
```

### Paso 2: Obtener Certificado SSL

```bash
# En el servidor
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Configurar renovación automática
sudo crontab -e
# Agregar línea:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 🚀 Deployment

### Deployment Automático:

1. **Push a master branch:**
   ```bash
   git push origin master
   ```

2. **El workflow automáticamente:**
   - ✅ Ejecuta tests
   - ✅ Build la aplicación
   - ✅ Crea imagen Docker
   - ✅ Sube a Docker Hub
   - ✅ Despliega en Digital Ocean
   - ✅ Verifica health check

### Deployment Manual:

```bash
# En el servidor
sudo -u deploy -i
cd /opt/polaris
./deploy.sh
```

## 📊 Monitoreo y Mantenimiento

### Comandos útiles:

```bash
# Ver logs de la aplicación
docker logs polaris-marketing -f

# Estado del container
docker ps

# Restart container
docker restart polaris-marketing

# Ver logs de Nginx
sudo tail -f /var/log/nginx/polaris-access.log
sudo tail -f /var/log/nginx/polaris-error.log

# Monitoreo del sistema
htop
df -h
free -h
```

### Monitoreo automático:

- **Netdata**: `http://tu-servidor:19999`
- **Logs**: `/var/log/polaris/`
- **Health check**: Script cron cada 5 minutos

### Backups:

```bash
# Backup manual
sudo tar -czf /var/backups/polaris/backup-$(date +%Y%m%d).tar.gz /opt/polaris

# Backup automático (cron)
0 2 * * * tar -czf /var/backups/polaris/backup-$(date +\%Y\%m\%d).tar.gz /opt/polaris
```

## 🛠️ Troubleshooting

### Problemas comunes:

#### 1. **Deployment falla en GitHub Actions**
```bash
# Verificar secrets
# Verificar conectividad SSH
ssh -i ~/.ssh/id_ed25519 deploy@tu-servidor

# Verificar Docker Hub
docker login
```

#### 2. **Container no inicia**
```bash
# Ver logs detallados
docker logs polaris-marketing

# Verificar variables de entorno
docker exec polaris-marketing env
```

#### 3. **SSL no funciona**
```bash
# Verificar certificado
sudo certbot certificates

# Renovar certificado
sudo certbot renew

# Verificar Nginx
sudo nginx -t
```

#### 4. **Aplicación no responde**
```bash
# Health check manual
curl -f http://localhost:3000/api/health

# Restart servicios
sudo systemctl restart nginx
docker restart polaris-marketing
```

### Logs importantes:

```bash
# Aplicación
/var/log/polaris/
docker logs polaris-marketing

# Nginx
/var/log/nginx/polaris-access.log
/var/log/nginx/polaris-error.log

# Sistema
/var/log/syslog
/var/log/auth.log

# Monitoreo
/var/log/polaris/monitor.log
```

## 📞 Soporte

Si tienes problemas con el deployment:

1. **Verifica los logs** en el orden mencionado arriba
2. **Revisa el status** de todos los servicios
3. **Comprueba la conectividad** y DNS
4. **Valida las configuraciones** de GitHub Secrets

### Contacto:
- 📧 Email: hello@polarisplatform.ch
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/polaris-marketing/issues)

---

**Nota**: Esta configuración está optimizada para producción con las mejores prácticas de seguridad, monitoreo y mantenimiento. 