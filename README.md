# 🚀 Proyecto Nexcob

Este proyecto combina **Laravel 12**, **Inertia.js**, **Vue 3** y **TypeScript** para ofrecer una experiencia SPA (Single Page Application) con una base robusta de backend en PHP y frontend moderno con Vue.

## ✅ Requisitos

Antes de comenzar, asegúrate de tener instalado:

- PHP >= 8.2
- Composer
- Node.js >= 18
- NPM o Yarn
- MySQL o PostgreSQL
- Laravel CLI (`composer global require laravel/installer`)
- Opcional: Docker, Laravel Sail, Laravel Valet

---

## 🛠️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/BizzDome/nexcob.git
cd nexcob
```

### 2. Instala dependencias de PHP

```bash
composer install
```

### 3. Instala dependencias de JavaScript

```bash
npm install
# o
yarn install
```

### 4. Copia el archivo de entorno y genera la clave

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configura la base de datos
Edita el archivo .env con tus credenciales de base de datos:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_db
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

### 6. Ejecuta las migraciones

```bash
php artisan migrate
```

### 7. Compila los assets y detectar cambios en tiempo real
****
```bash
composer run dev
```

### ⚡ Ejecutar el servidor

```bash
php artisan serve
```
Accede a la aplicación en: http://localhost:8000

### 📦 Comandos Útiles

```bash
php artisan migrate:fresh --seed       # Resetear DB con seeders
npm run dev                            # Servidor frontend con Vite
npm run build                          # Compilar para producción
php artisan route:list                 # Listar rutas disponibles
```