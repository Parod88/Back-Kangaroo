# Wallaclone Backend

Este es el proyecto final del equipo madCoders en el Full Stack Web Bootcamp 11 de keepcoding. Se puede acceder a los requisitos básicos de la plataforma [pulsando aquí.](./documentation/specifications_wallaclone.pdf)

### Los miembros del equipo:

- Ángel Calvo Monzón: [calvo.monzon.angel@gmail.com](mailto:calvo.monzon.angel@gmail.com)
- Misael Ojeda Duarte: [msl.snzn@gmail.com](mailto:msl.snzn@gmail.com)
- Pablo Pérez Sineiro: [pablopsdigital@gmail.com](mailto:pablopsdigital@gmail.com)
- Pablo Rodríguez Gómez: [pabrodgom@gmail.com](mailto:pabrodgom@gmail.com)

# Iniciar el proyecto

Inicialmente es necesario tener instalado node en el equipo. Esto se puede hacer desde la siguiente ruta.

[https://nodejs.org/en/](https://nodejs.org/en/)

Con Node instalado, para iniciar el proyecto será necesario generar un clone en local.

    https://github.com/Parod88/BackWallaclone.git

Posteriormente será necesario instalar las dependencias del proyecto, para ello se debe ejecutar el comando.

```bash
npm install
```

Una vez instaladas las dependencias simplemente se debe ejecutar el proyecto. Ejecutando algunos de los siguientes comandos en función del modo de ejecución.

```bash
npm run dev
#or
npm start
```

Otra forma adicional es ejecutar el proyecto en el cloud de **StackBlitz**

[stackblitz.com/github/Parod88/BackWallaclone](stackblitz.com/github/Parod88/BackWallaclone)

## Instalar la base de datos

Se debe tener mongoDB instalado en local: https://www.mongodb.com/
Una vez instalado mongo se deberá generar una colección llamada **wallaclone** a la cual se conecta el proyecto para almacenar y consumir datos.

### Para comprobar que el proyecto se encuentra en ejecución se puede visitar la dirección:

- Ruta front de servidor: http://localhost:3000/
- Ruta api usuarios: http://localhost:3000/api/v1/user
- Ruta api anuncios: http://localhost:3000/api/v1/advertisement

## Documentación API

Actualmente existe un fichero de swagger.json donde se documentan los diferentes endpoints del API. Para consultar dicha documentación será necesario acceder a la ruta.

http://localhost:3000/api/api-docs/
