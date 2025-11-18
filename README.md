# Pass Manager


Proyecto desarrollado con NestJS para la gestión de contraseñas.

## Instalación


1. Clona el repositorio:

```sh
git clone https://github.com/WilPaD/nest-pass-manager.git
cd nest-pass-manager
```

2. Instala las dependencias con Bun:

```sh
bun install
```

3. Copia el archivo de ejemplo de entorno y configura tus variables:

```sh
cp .env.example .env
# Edita .env con tus datos de base de datos y JWT
```

## Inicio en desarrollo

1. Levanta la base de datos PostgreSQL y configura las variables en `.env`.

2. Ejecuta el servidor en modo desarrollo con Bun:

```sh
bun run start:dev
```

El servidor estará disponible en `http://localhost:3000` (o el puerto que definas en `.env`).
