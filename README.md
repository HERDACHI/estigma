# ESTIGMA – Sistema de Incentivos CMSF  
Aplicación web institucional para la gestión de incentivos, catálogo de productos, canjes y administración de doctores del Centro Médico San Francisco (CMSF).

---

## 🚀 Tecnologías utilizadas

### **Frontend**
- React + Vite
- CSS institucional CMSF
- Componentes modulares (Catalogo, CatalogoProductos, CrearProducto, Login)
- Fetch API para comunicación con backend

### **Backend**
- Node.js + Express
- MySQL (pool de conexiones)
- Multer (subida de imágenes)
- Controladores REST
- Validaciones de negocio (saldo, producto activo, auditoría)

### **Base de Datos**
Tablas principales:
- `doctores`
- `productos`
- `canjes` (auditoría completa)
- `usuarios` (login)

---

## 📌 Funcionalidades principales

### ✔ Gestión de productos
- Crear productos con imagen
- Campo `activo` para habilitar/deshabilitar productos
- Costo en francoins
- Listado general para catálogo

### ✔ Catálogo de productos (Frontend)
- Filtros por rango de francoins
- Vista con imágenes
- Validación automática:
  - Producto inactivo → botón deshabilitado
  - Saldo insuficiente → botón deshabilitado
- Botón “Canjear” solo si el doctor cumple condiciones

### ✔ Sistema de canje
- Validación de producto activo
- Validación de saldo del doctor
- Registro en tabla `canjes` con:
  - doctor_id  
  - producto_id  
  - costo  
  - francoins_antes  
  - francoins_despues  
  - fecha automática  
- Actualización automática del saldo del doctor

### ✔ Login institucional
- Guarda en `localStorage`:
  - `tipoUsuario`
  - `idUsuario`
- Redirección según rol

---

## 🗂 Estructura del proyecto

/backend
/src
/controllers
canje.controller.js
productos.controller.js
doctores.controller.js
/routes
canje.routes.js
productos.routes.js
doctores.routes.js
/config
db.js
/uploads
(imágenes de productos)
server.js

/frontend
/src
/components
CatalogoProductos.jsx
/pages
Catalogo.jsx
CrearProducto.jsx
Login.jsx
/assets
colores-cmsf.css

Código

---

## 🔧 Instalación y ejecución

### **Backend**
```bash
cd backend
npm install
npm start
Frontend
bash
cd frontend
npm install
npm run dev
🧪 Endpoints principales
GET /api/productos
Obtiene todos los productos.

POST /api/productos
Crea un producto nuevo (form-data con imagen).

Campos:

nombre

costo

activo (1/0)

imagen (file)

POST /api/canje
Realiza un canje.

Body:

json
{
  "doctor_id": 1,
  "producto_id": 2
}
GET /api/doctores/:id
Obtiene datos del doctor (incluye francoins).

🛡 Validaciones del sistema
Backend
Producto debe existir

Producto debe estar activo

Doctor debe existir

Doctor debe tener saldo suficiente

Inserción auditada en tabla canjes

Frontend
Botón “Canjear” deshabilitado si:

producto.activo = 0

doctorFrancoins < producto.costo

📸 Subida de imágenes
El backend usa multer y guarda las imágenes en:

Código
/backend/src/uploads
El nombre del archivo se almacena en la columna imagen de la tabla productos.

🧾 Auditoría de canjes
Cada canje registra:

doctor_id

producto_id

costo

francoins_antes

francoins_despues

fecha (timestamp automático)

Esto permite trazabilidad completa del sistema.

👨‍💻 Autor
Desarrollado por HERDACHI, Ingeniero en Sistemas y Desarrollador Full-Stack.

