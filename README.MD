# Proyecto Backend Node.js – Parte 1

## Que es Node
Node.js permite ejecutar JavaScript en el servidor y construir aplicaciones backend.
 Express.js es un framework que simplifica la creación de servidores web mediante un sistema de rutas, middlewares y manejo de peticiones HTTP.
 En una aplicación web, el cliente envía una solicitud al servidor, el servidor procesa la lógica de la aplicación y devuelve una respuesta en formato HTML o JSON.

## Descripción del proyecto

Este proyecto corresponde a la primera parte del trabajo integrador del módulo de JavaScript backend.
La aplicación consiste en un servidor desarrollado con **Node.js** y **Express**, capaz de servir contenido web, manejar rutas básicas y registrar eventos en archivos planos.

El objetivo de esta etapa es construir la base del sistema backend que posteriormente se conectará a una base de datos y expondrá una API segura.

### Enfoque del proyecto
Backend para una tienda de dulces que permite gestionar usuarios y, en futuras etapas, productos y pedidos.

## Tecnologías utilizadas

* Node.js (v18 o superior)
* Express.js
* Nodemon
* Dotenv

---

## Estructura del proyecto

```
tienda-de-dulces/
├── node_modules/
├── src/
│   ├── db/
│   │   └── conexion.js
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars
│   │   └── home.handlebars
│   ├── routes/ 
│   ├── controllers/ 
│   ├── middlewares/ 
│   ├── public/
│   │   └── css/
│   │       └── style.css
│   └── logs/
│       └── log.txt
├── .env
├── .gitignore           
├── index.js             
└── package.json
```

La carpeta **src** contiene todo el código fuente de la aplicación.

---

## Instalación

1. Clonar el repositorio:

```
git clone <https://github.com/yasclou/proyecto-6-7-8.git>
```

2. Instalar dependencias:

```
npm install
```

---

## Ejecución del proyecto

Modo desarrollo:

```
npm run dev
```

Modo producción:

```
npm start
```

El servidor se iniciará en el puerto definido en el archivo `.env`.

---

## Variables de entorno

Archivo `.env`

```
PORT=3000
```

---

## Rutas disponibles

### Ruta principal

```
GET /
```

Devuelve una respuesta en HTML indicando que el servidor está funcionando.

### Estado del servidor

```
GET /status
```

Devuelve una respuesta en formato JSON con el estado del servidor.

Ejemplo:

```
{
  "status": "ok",
  "message": "Servidor activo"
}
```

---

## Registro de eventos

El sistema registra accesos a rutas específicas en el archivo:

```
src/logs/log.txt
```

Cada registro incluye:

* fecha
* hora
* ruta accedida

---

## Justificación técnica

Se eligió utilizar **index.js** como archivo principal debido a que es ampliamente utilizado en proyectos Node.js para como punto de entrada de la aplicación.

La estructura modular del proyecto (controllers, routes, middlewares, services) permite escalar la aplicación fácilmente en futuras etapas, facilitando la integración con bases de datos, autenticación JWT y una API REST completa.

Se definieron dos scripts principales para ejecutar la aplicación:

- "npm start": ejecuta el servidor utilizando Node.js, pensado para entornos de producción.
- "npm run dev": utiliza nodemon para reiniciar automáticamente el servidor durante el desarrollo, mejorando la eficiencia al evitar reinicios manuales.


---

## Estado del proyecto

Primera etapa completada:
Servidor Express funcional con rutas básicas, contenido estático y persistencia simple mediante archivos.


# PROYECTO 7

## Se utilizó Sequelize como ORM 
para facilitar la conexión con PostgreSQL y la manipulación de datos mediante modelos.

Las credenciales de acceso se almacenaron en variables de entorno utilizando dotenv, evitando exponer información sensible en el código fuente.

## Se utilizó Sequelize para definir el modelo User 
lo que permite mapear la tabla usuarios desde código JavaScript y facilitar la manipulación de datos sin necesidad de escribir consultas SQL manuales.

## Se implementó una ruta POST /usuarios que permite registrar nuevos usuarios en la base de datos
Se utilizó express.json() para procesar datos en formato JSON enviados desde el cliente.
Esto permite separar la lógica del backend del cliente, siguiendo principios de arquitectura REST.

## CRUD
Se implementaron operaciones CRUD parciales sobre la entidad usuarios, incluyendo lectura (GET) y creación (POST) con persistencia en base de datos PostgreSQL mediante Sequelize.

### Requisitos del sistema
- Node.js ≥ 18  
- PostgreSQL ≥ 15  
- npm ≥ 9  

---

## Se integró un motor de vistas con Handlebars
permitiendo renderizado dinámico en el servidor y mejorando la experiencia del usuario al visualizar productos directamente en el navegador

## Se implementó un sistema de renderizado dinámico utilizando Handlebars
junto con un carrito de compras funcional gestionado en el servidor, integrando lógica de negocio mediante servicios y manteniendo una arquitectura basada en el patrón MVC.

## Uso de pool en Postgres
permite manejar múltiples conexiones de forma eficiente sin saturar la base de datos.


### Instalación
1. Clonar el repositorio:
```bash
git clone <tu-url-de-github>
   cd "tienda de dulces"
Instalar dependencias:
npm install
Crear archivo .env con las credenciales de la base de datos:
DB_USER=tu_usuario_postgres
DB_PASSWORD=tu_contraseña_de_pgadmin
DB_HOST=localhost
DB_DATABASE=tienda_dulces
DB_PORT=5432
PORT=3000
Iniciar el servidor en modo desarrollo:
npm run dev


🚀 Uso
Endpoints principales
Método	Ruta	Descripción
GET	/	Página de inicio
GET	/status	Estado del servidor (JSON)
GET	/usuarios	Listar usuarios (sin passwords)
POST	/usuarios	Crear un usuario
PUT	/usuarios/:id	Actualizar usuario por ID
DELETE	/usuarios/:id	Eliminar usuario por ID
POST	/usuarios/history	Crear usuario + historial (transacción)

Ejemplo de JSON para POST/PUT:

```
{
  "nombre de dulce": "Mochi",
  "precio": "9,00",
  "stock": "1000"
}
```

**Justificación técnica
Cliente de conexión: Se eligió Sequelize por su facilidad de manejar ORM, transacciones y relaciones entre modelos.
Protección de datos sensibles: Las contraseñas no se muestran en la respuesta (attributes: ["id","nombre","email"]) y las credenciales de DB se almacenan en .env.
Transacciones: Se usan para crear usuario + historial, asegurando rollback si falla algún paso.
Estructura de carpetas: Separación clara en controllers/, routes/, models/, config/ y public/ para mantener el proyecto organizado y escalable.

**Nota
El archivo log.txt registra visitas a rutas públicas con fecha y hora.
Se pueden agregar paginación o filtros en /usuarios como mejoras futuras.
Las vistas dinámicas podrían implementarse con EJS para la parte frontend.