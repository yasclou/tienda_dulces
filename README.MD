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

---

## Tecnologías utilizadas

* Node.js (v18 o superior)
* Express.js
* Nodemon
* Dotenv
* PostgreSQL
* Handlebars

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
git clone https://github.com/yasclou/tienda_dulces.git
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
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

Las credenciales se gestionan mediante variables de entorno para evitar exponer información sensible en el código fuente.

---

## Rutas disponibles

### Ruta principal

```
GET /
```

Devuelve una vista HTML indicando que el servidor está funcionando.

---

### Estado del servidor

```
GET /status
```

Devuelve el estado del servidor en formato JSON:

```
{
  "status": "🐘 Conectado a la base de datos "tienda_dulces"",
  "message": "✅ Servidor iniciado en http://localhost:3000"
}
```

---

## CRUD de usuarios

Se implementó un CRUD completo sobre la entidad usuarios con persistencia en base de datos.

### Obtener producto

```
GET /nombres de dulces
```

### Crear producto

```
POST /nombres de dulces
```

### Actualizar producto

```
PUT /nombres de dulces/:id
```

### Eliminar producto

```
DELETE /nombres de dulces/:id
```

### Consideraciones

* Se validan errores de conexión y consultas.
* Se verifica la existencia del usuario antes de modificar o eliminar.
* Se excluyen datos sensibles (como contraseñas) en las respuestas.
* Las respuestas se entregan en formato JSON estructurado.

---

## Acceso a base de datos

Se trabajó directamente con PostgreSQL mediante consultas SQL utilizando un pool de conexiones.

Se decidió no utilizar un ORM, ya que el proyecto ya contaba con una implementación funcional y esto permitió:

* Mayor control sobre las consultas
* Mejor comprensión del funcionamiento de la base de datos
* Menor complejidad para la escala del proyecto

---

## Transaccionalidad

Se implementaron operaciones que agrupan múltiples acciones consecutivas, asegurando consistencia de datos.

* Uso de transacciones
* Rollback en caso de error
* Registro de éxito o fallo en logs

---

## Registro de eventos

El sistema registra accesos y eventos en:

```
src/logs/log.txt
```

Cada registro incluye:

* Fecha
* Hora
* Ruta accedida
* Resultado de la operación

---

## Renderizado con Handlebars

Se integró un motor de vistas que permite:

* Renderizar contenido dinámico en el servidor
* Mostrar información de forma estructurada
* Mejorar la experiencia del usuario

---

## Justificación técnica

Se utilizó `index.js` como punto de entrada por ser una convención estándar en aplicaciones Node.js.

La estructura modular (controllers, routes, middlewares) permite escalar el proyecto fácilmente, facilitando la incorporación de nuevas funcionalidades como autenticación, productos y pedidos.

El uso de nodemon en desarrollo mejora la eficiencia al reiniciar automáticamente el servidor ante cambios.

El uso de SQL directo fue una decisión consciente para mantener control total sobre las consultas y evitar complejidad innecesaria.

---

## Estado del proyecto

Segunda etapa completada:

* Conexión a base de datos funcional
* CRUD completo implementado
* Validaciones y manejo de errores
* Sistema de logs
* Renderizado dinámico con vistas

El proyecto queda preparado para evolucionar hacia una API REST completa en siguientes módulos.

---

## Requisitos del sistema

* Node.js ≥ 18
* PostgreSQL ≥ 15
* npm ≥ 9


## Reflexión técnica

Durante el desarrollo de esta etapa del proyecto se implementó un backend funcional enfocado en la gestión de dulces e inventario, incorporando operaciones CRUD completas y conexión a una base de datos relacional.

Uno de los principales desafíos fue lograr una conexión estable con la base de datos y mantener la consistencia de los datos al realizar operaciones de creación, actualización y eliminación. Para resolverlo, se trabajó con consultas SQL directas y el uso de un pool de conexiones, lo que permitió mejorar la eficiencia y estabilidad del sistema.

Se decidió no utilizar un ORM como Sequelize, optando por consultas SQL manuales. Esta decisión se tomó para mantener un mayor control sobre las operaciones realizadas y comprender mejor el funcionamiento interno de la base de datos. Además, considerando la escala del proyecto, se evaluó que no era necesario agregar una capa adicional de abstracción.

En cuanto a la organización del código, se utilizó una estructura modular basada en controladores, rutas y middlewares, lo que facilita la escalabilidad y el mantenimiento del proyecto. También se incorporó un sistema de logs para registrar eventos relevantes y apoyar el proceso de depuración.

Como mejora futura, se considera la posibilidad de integrar un ORM, implementar autenticación de usuarios y ampliar la lógica de negocio hacia la gestión completa de pedidos.

En conclusión, esta etapa permitió consolidar conocimientos sobre el manejo de bases de datos, estructuración de backend y buenas prácticas en el desarrollo de aplicaciones con Node.js.
