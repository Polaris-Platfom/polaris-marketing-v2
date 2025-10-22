# Polaris Blog API - Postman Collection

Esta colección de Postman proporciona una forma completa y fácil de probar todos los endpoints de la API de gestión del blog de Polaris Platform.

## 📦 Contenido

- `Polaris-Blog-API.postman_collection.json` - Colección principal con todos los endpoints
- `Polaris-Blog-API-Local.postman_environment.json` - Entorno para desarrollo local
- `Polaris-Blog-API-Production.postman_environment.json` - Entorno para producción

## 🚀 Instalación Rápida

### Opción 1: Importar Archivos Individuales

1. **Abrir Postman**
2. **Importar la colección:**
   - Click en "Import" (botón en la esquina superior izquierda)
   - Arrastra `Polaris-Blog-API.postman_collection.json` o navega hasta el archivo
   - Click "Import"

3. **Importar el entorno (opcional pero recomendado):**
   - Click en "Import" nuevamente
   - Selecciona `Polaris-Blog-API-Local.postman_environment.json`
   - Click "Import"

4. **Seleccionar el entorno:**
   - En la esquina superior derecha, selecciona "Polaris Blog API - Local" del dropdown de entornos

### Opción 2: Importar Todo de Una Vez

1. Abre Postman
2. Click en "Import"
3. Arrastra todos los archivos `.json` de esta carpeta
4. Click "Import"
5. Selecciona el entorno "Polaris Blog API - Local"

## 📋 Estructura de la Colección

La colección está organizada en las siguientes carpetas:

### 1. **List Posts** (5 requests)
- Get All Posts (English)
- Get Featured Posts Only
- Get Technology Category Posts
- Get Limited Posts (5)
- Get Spanish Posts

### 2. **Get Single Post** (2 requests)
- Get Post by ID
- Get Non-existent Post (404) - Test de error

### 3. **Create Post** (5 requests)
- Create Technology Post
- Create Community Post
- Create Case Study Post
- Create Minimal Post (Auto Reading Time)
- Create Invalid Post (Missing Fields) - Test de validación

### 4. **Update Post** (3 requests)
- Update Post Title and Featured
- Update Post Content Only
- Update Non-existent Post (404) - Test de error

### 5. **Delete Post** (2 requests)
- Delete Created Post
- Delete Non-existent Post (404) - Test de error

### 6. **Full Workflow Test** (6 requests)
Un flujo completo que demuestra todo el ciclo de vida:
1. Crear post
2. Verificar creación
3. Actualizar post
4. Verificar actualización
5. Eliminar post
6. Verificar eliminación

## 🎯 Cómo Usar

### Para Pruebas Básicas

1. **Asegúrate de que el servidor está corriendo:**
   ```bash
   npm run dev
   ```

2. **Ejecuta requests individuales:**
   - Navega a cualquier carpeta en la colección
   - Selecciona un request
   - Click en el botón "Send"

### Para Pruebas Completas

1. **Ejecuta la carpeta "Full Workflow Test":**
   - Click derecho en "Full Workflow Test"
   - Selecciona "Run folder"
   - Verás un test runner con todos los pasos
   - Click "Run Polaris Blog API"

2. **Revisa los resultados:**
   - Todos los tests deberían pasar ✅
   - Verás el estado de cada paso del workflow

### Orden Recomendado de Pruebas

Si quieres probar manualmente:

1. **Listar posts existentes:**
   ```
   List Posts → Get All Posts (English)
   ```

2. **Crear un nuevo post:**
   ```
   Create Post → Create Technology Post
   ```
   ⚠️ **Importante:** Esto guardará automáticamente el ID del post creado en `{{createdPostId}}`

3. **Actualizar el post creado:**
   ```
   Update Post → Update Post Title and Featured
   ```

4. **Verificar el post actualizado:**
   ```
   Get Single Post → Get Post by ID
   ```
   (Usa `{{createdPostId}}` como ID)

5. **Eliminar el post:**
   ```
   Delete Post → Delete Created Post
   ```

## 🔧 Variables de Entorno

### Variables Disponibles

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `baseUrl` | URL del servidor API | `http://localhost:3000` |
| `locale` | Idioma por defecto | `en` |
| `createdPostId` | ID del último post creado | (auto-generado) |
| `workflowPostId` | ID usado en workflow tests | (auto-generado) |
| `testPostId` | ID para pruebas generales | (auto-generado) |

### Cambiar Variables

1. Click en el ícono de ojo 👁️ en la esquina superior derecha
2. Selecciona tu entorno
3. Modifica los valores según necesites
4. Click "Save"

### Crear Tu Propio Entorno

1. Click en "Environments" en la barra lateral izquierda
2. Click "+" para crear nuevo entorno
3. Agrega las variables necesarias:
   - `baseUrl`: URL de tu servidor
   - `locale`: Idioma preferido
4. Guarda el entorno

## ✅ Tests Automáticos

Cada request incluye tests automáticos que verifican:

- ✅ Código de estado HTTP correcto
- ✅ Estructura de respuesta válida
- ✅ Presencia de campos requeridos
- ✅ Valores esperados en la respuesta
- ✅ Manejo correcto de errores

### Ver Resultados de Tests

Después de ejecutar un request:
1. Scroll down en la respuesta
2. Click en la pestaña "Test Results"
3. Verás qué tests pasaron ✅ y cuáles fallaron ❌

## 📝 Datos de Ejemplo

La colección incluye datos de demostración completos para:

### Autores Predefinidos

**Osmel P. Teran (CTO)**
```json
{
  "name": "Osmel P. Teran",
  "role": "CTO & Co-Founder",
  "bio": "Blockchain engineer with expertise in decentralized governance systems and smart contracts.",
  "image": "/assets/images/team/osmel-teran.png",
  "initials": "OPT"
}
```

**Dionne P. Teran (Head of Community)**
```json
{
  "name": "Dionne P. Teran",
  "role": "Head of Community",
  "bio": "Community management expert with deep understanding of digital democracy and civic engagement processes.",
  "image": "/team/dionne.jpg",
  "initials": "DPT"
}
```

### Categorías Disponibles

- `technology` - Posts sobre tecnología y desarrollo
- `community` - Posts sobre construcción de comunidades
- `case-study` - Estudios de caso y ejemplos reales
- `tutorial` - Guías y tutoriales paso a paso
- `future` - Tendencias y predicciones

### Posts de Ejemplo Incluidos

1. **Introduction to Blockchain Technology** - Post técnico completo con markdown
2. **Building Engaged Online Communities** - Post sobre gestión comunitaria
3. **Case Study: Digital Transformation** - Estudio de caso detallado
4. **Quick Tips for Better Meetings** - Post corto con auto-cálculo de tiempo

## 🐛 Solución de Problemas

### El servidor no responde
```bash
# Verifica que el servidor esté corriendo
npm run dev

# Verifica el puerto en uso
curl http://localhost:3000/api/health
```

### Errores 404 en requests de Update/Delete
**Problema:** No existe el post con ese ID  
**Solución:** Ejecuta primero "Create Technology Post" para generar un post con ID válido

### Variables de entorno no funcionan
**Problema:** Las variables como `{{createdPostId}}` no se resuelven  
**Solución:** 
1. Asegúrate de haber seleccionado un entorno
2. Ejecuta primero un request que cree el post
3. Verifica que las variables se guardaron (ícono del ojo 👁️)

### Tests fallan
**Problema:** Algunos tests no pasan  
**Solución:**
1. Verifica que el servidor esté corriendo
2. Asegúrate de usar el entorno correcto
3. Ejecuta los requests en el orden recomendado
4. Revisa los logs del servidor para más detalles

## 📚 Recursos Adicionales

### Documentación
- **Referencia API Completa:** `docs/api/blog-endpoints.md`
- **Ejemplos Prácticos:** `docs/api/blog-examples.md`
- **Resumen de Implementación:** `docs/api/IMPLEMENTATION_SUMMARY.md`

### Scripts Alternativos
Si prefieres usar scripts en lugar de Postman:
- **PowerShell:** `scripts/test-blog-api.ps1`
- **Bash:** `scripts/test-blog-api.sh`

## 🔐 Notas de Seguridad

⚠️ **Importante para Producción:**

Esta colección está configurada para desarrollo local. Para uso en producción:

1. **Cambia al entorno de producción:**
   - Selecciona "Polaris Blog API - Production"
   - Actualiza `baseUrl` con tu URL real

2. **Agrega autenticación:**
   - Los endpoints actualmente NO tienen autenticación
   - Agrega headers de autorización cuando implementes auth
   - Actualiza la variable `apiToken`

3. **Revisa los datos de prueba:**
   - No uses datos de prueba en producción
   - Asegúrate de que el contenido sea apropiado
   - Verifica permisos antes de crear/modificar/eliminar

## 💡 Tips y Mejores Prácticas

### 1. Usa el Runner para Tests Completos
```
Click derecho en la colección → Run collection
```
Esto ejecutará todos los requests y te mostrará un reporte completo.

### 2. Guarda Responses como Ejemplos
Después de obtener una buena respuesta:
```
Click en "Save Response" → "Save as example"
```
Útil para documentación y referencia.

### 3. Organiza tus Entornos
Crea diferentes entornos para:
- Desarrollo local
- Servidor de staging
- Producción
- Testing

### 4. Exporta Resultados
Después de ejecutar el Collection Runner:
```
Click en "Export Results" para guardar un reporte
```

### 5. Comparte con el Equipo
Puedes compartir esta colección:
1. Export la colección
2. Comparte el archivo JSON
3. O usa Postman Workspaces para colaboración en equipo

## 🎨 Personalización

### Agregar Nuevos Requests

1. Click derecho en una carpeta
2. "Add Request"
3. Configura URL, método, body
4. Agrega tests si es necesario
5. Guarda

### Agregar Tests Personalizados

En la pestaña "Tests" de cualquier request:
```javascript
// Verificar código de estado
pm.test("Status OK", function () {
    pm.response.to.have.status(200);
});

// Verificar tiempo de respuesta
pm.test("Response time < 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Verificar contenido
pm.test("Has correct title", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.title).to.include("Blockchain");
});
```

## 🆘 Soporte

Si encuentras problemas:

1. **Revisa la documentación:** `docs/api/`
2. **Verifica el servidor:** Logs en la consola
3. **Prueba con scripts:** `scripts/test-blog-api.ps1`
4. **Contacta al equipo de desarrollo**

## 📄 Licencia

Esta colección es parte del proyecto Polaris Platform.  
Uso interno - Polaris Platform Team

---

**Última actualización:** Octubre 22, 2025  
**Versión de la colección:** 1.0.0  
**Compatible con:** Postman 10.0+

