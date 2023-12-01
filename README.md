# grupo_Fiweb_backend

# Como  levantar la base de datos local

Para levantar la base de datos y dejar funcionando el backend debemos guiarnos por los siguientes pasos:

PASO 1

Primero debemos instalar todas las dependencias utilizadas en la aplicación. Para esto:

```bash
yarn install
```

PASO 2

Creamos el archivo .env que contendrá nuestras credenciales para ingresar a la base de datos. El contenido es el siguiente:

```javascript
DB_USERNAME = <nombre_usuario>
DB_PASSWORD = <password>
DB_NAME = fiwebdb
DB_HOST = 'localhost'
JWT_SECRET = fiweb_secret
```

PASO 3

Corremos las migraciones para crear las tablas en la base de datos

```bash
npx sequelize db:migrate
```

PASO 4

Iniciamos el programa. Para esta entrega el servidor utilizado sigue siendo el localhost.

La primera opción es con el siguiente comando:

```bash
yarn start
```
Esta opción unicamente inicia el servidor, cualquier cambio agregado después de haberlo iniciado no se muestra automáticamente por lo que para ver los cambios debemos cerrar el servidor y volverlo a correr.

La segunda opción es con el siguiente comando:


```bash
yarn dev
```
Esta opción actualiza los cambios en el código automáticamente por lo que los cambios son visibles instantaneamente.

Cabe destacar que para poder utilizar la aplicación debe estar corriendo el servidor para el backend y también para el frontend simultáneamente.


# Documentacion de la API

Aquí dejamos la documentación de la API. Está hecha en postman y se pueden ver todos los endpoints utilizados.

**[Documentacion API Proyecto Tecnologías y Aplicaciones Web](https://documenter.getpostman.com/view/26329522/2s9Ye8fuRr)**
