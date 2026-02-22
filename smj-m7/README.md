# React + Vite

<div align="center">

# SMJ Store · Full-Stack Ecommerce

Aplicación full-stack que ofrece un catálogo de productos, experiencia de compra y gestión de carrito en tiempo real. El frontend está construido con React 19 + Vite y Tailwind CSS 4, mientras que el backend expone APIs REST con Express, MongoDB y Stripe para pagos.

</div>

## ✨ Características principales

### Frontend (smj-m7)
- Landing page con héroe, destacados y grid de productos responsiva (4 columnas en desktop, cards accesibles).
- Vistas dedicadas para listado, detalle de producto con información ampliada, checkout, perfiles, registro e inicio de sesión.
- Contextos (`UserContext`, `ProductContext`) para manejar sesión, carrito y catálogo desde cualquier componente.
- Ruteo protegido: rutas públicas/privadas, páginas de éxito/cancelación de pago y pantalla "En construcción".
- UI custom basada en la paleta `dust-grey`, tipografía Google Sans y componentes utilitarios con Tailwind CSS 4.

### Backend (carpeta raíz)
- API REST con Express 5, protección CORS y middlewares JWT para endpoints privados.
- Modelos MongoDB/Mongoose para usuarios, productos y carritos.
- Registro/login con `bcryptjs` y emisión de tokens firmados (`SECRET`).
- Integración Stripe: creación de productos/precios, sesiones de Checkout y URLs dinámicas de éxito/cancelación.
- Servicios de carrito: leer, editar y convertir productos en `line_items` listos para Stripe.

## 🧱 Estructura del proyecto

```
SMJ3
├── package.json              # Backend scripts y dependencias
├── src/                      # Servidor Express + controladores + modelos
└── smj-m7/                   # Aplicación React
	├── package.json          # Scripts Vite
	├── src/
	│   ├── components/       # Layout, Home, Auth, Product, Checkout...
	│   ├── contexts/         # Product & User providers
	│   ├── config/axios.js   # Cliente Axios con VITE_BACKEND_URL
	│   ├── routes/           # HOC para rutas privadas/públicas
	│   └── utils/formatCLP.js
	└── public/
```

## ⚙️ Requisitos previos

- Node.js 20+ y npm 10+
- Cuenta de MongoDB Atlas (o instancia local) y clave privada de Stripe

## 🚀 Puesta en marcha

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd SMJ3

# Backend
npm install

# Frontend
cd smj-m7
npm install
```

### 2. Variables de entorno

#### Backend (`.env` en la raíz del proyecto)

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster/db
SECRET=super-secret-jwt-key
STRIPE_KEY=sk_test_xxx
STRIPE_SUCCESS_URL=http://localhost:5173/pago-exitoso
STRIPE_CANCEL_URL=http://localhost:5173/pago-cancelado
```

#### Frontend (`smj-m7/.env`)

```env
VITE_BACKEND_URL=https://smj3-phat.vercel.app
```

### 3. Ejecutar los servidores

```bash
# Backend (desde la raíz)
npm run dev

# Frontend (desde smj-m7)
npm run dev
```

El frontend usa Vite y por defecto corre en `http://localhost:5173`. El backend queda disponible en `http://localhost:5000` (o el puerto configurado).

## 📡 Endpoints clave

| Método | Ruta            | Descripción                              |
|--------|-----------------|------------------------------------------|
| POST   | `/users`        | Registro de usuario y creación de carrito|
| POST   | `/users/login`  | Login, devuelve JWT                      |
| GET    | `/users/auth`   | Verificación (requiere token)            |
| GET    | `/products`     | Lista de productos                       |
| POST   | `/products`     | Crear producto sincronizado con Stripe   |
| PUT/DELETE | `/products/:id` | Actualizar/eliminar producto         |
| GET    | `/carts`        | Obtener carrito del usuario autenticado  |
| PUT    | `/carts`        | Actualizar ítems del carrito             |
| POST   | `/carts/checkout` | Crear sesión de pago Stripe            |

> Rutas de carrito requieren middleware de autorización (`authorization.js`) que valida el token JWT.

## 🧩 Scripts disponibles

### Backend
- `npm run dev` · Inicia el servidor con Nodemon.

### Frontend
- `npm run dev` · Lanza Vite con HMR en desarrollo.
- `npm run build` · Genera artefactos listos para producción.
- `npm run preview` · Sirve el build generado.
- `npm run lint` · Ejecuta ESLint con reglas React + Hooks.

## 🗺️ Rutas del frontend

- `/` · Landing + destacados.
- `/products` · Catálogo con filtros y botones rápidos.
- `/products/:slug` · Detalle con descripción extendida, cuidados y envío.
- `/registro`, `/iniciar-sesion` · Flujo Auth.
- `/carrito`, `/perfil` · Rutas privadas protegidas.
- `/pago-exitoso`, `/pago-cancelado` · Estados de checkout.
- `/en-construccion` · Página Coming Soon reutilizable.

## ✅ Próximos pasos sugeridos

- Conectar el botón "Volver al inicio" y cualquier sección WIP con la ruta `/en-construccion`.
- Integrar envío real del formulario de checkout/notificaciones.
- Agregar pruebas unitarias/end-to-end para rutas críticas.

---

Hecho con React, Vite, Tailwind, Express, MongoDB y Stripe.
