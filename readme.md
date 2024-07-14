[![Status][statuss-shield]][statuss-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/hmfarias/03-acamica-delilah">
    <img src="https://github.com/hmfarias/JavaScript-Proyect-RFSeguridad/blob/main/assets/images/LOGO-RF-SEGURIDAD.png" alt="Logo" width="175" height="270">
  </a>
  <h2 align="center">PROYECTO RF SEGURDIAD INTEGRAL SRL</h2>

  <p align="center">
   Una página web institucional, con una sección para usuarios resgistrados con opciones administrativas como la liquidación de sueldo e impresión de recibos.
   
    <br />
    <a href="https://github.com/hmfarias/JavaScript-Proyect-RFSeguridad/">Ver repositorio</a>
    ·
    <a href="https://github.com/hmfarias/JavaScript-Proyect-RFSeguridad/issues">Reportar un error</a>
    ·
    <a href="https://github.com/hmfarias/JavaScript-Proyect-RFSeguridad/issues">Solicitar función</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

### Tabla de contenidos

  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#construido-con">Construido con</a></li>
        <li><a href="#descripción-general">Desripción General</a></li>
          <ul><a href="#entregable">Entregable</a></ul>
          <ul><a href="#uso-de-librerías">Uso de Librerías</a></ul>
          <ul><a href="#proceso-de-creación">Proceso de Creación</a></ul>
      </ul>
    </li>
    <li>
      <a href="#comenzando">Comenzando</a>
      <ul>
        <li><a href="#prerequisitos">Prerequisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
        <li><a href="#documentación">Documentación</a></li>
      </ul>
    </li>
    <li><a href="#contribuyendo">Contribuyendo</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ol>

<!-- ABOUT THE PROJECT -->

## Sobre el Proyecto

[![Product Name Screen Shot][product-screenshot]](https://github.com/hmfarias/03-acamica-delilah)

Delilah Resto es el backend de un sistema de pedidos en línea para un restaurante que opera las partes necesarias para montar una API REST que permite operaciones CRUD en una estructura de datos.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Construido con

- [![NodeJS][nodejs]][node-url] Como entorno
- [![Express][express]][express-url] Framework
- [![Nodemon][nodemon]][nodemon-url] Utilidad de interface
- [![Ratelimit][ratelimit]][ratelimit-url] Control del tráfico entrante en la API
- [![JSONWeb][jsonweb]][jsonweb-url] Estándar para propagar entre dos partes de forma segura, la identidad de un determinado usuario y sus privilegios. Cifrado de contraseña con la biblioteca [bcrypt](https://www.npmjs.com/package/bcrypt 'bcrypy').
- [![XAMPP][xampp]][xampp-url] como Servidor
- [![MySQL][mysql]][mysql-url] Sistema de administración de Base de Datos
- [![Workbench][workbench]][workbench-url] Entorno gráfico para el diseño de bases de datos, servidores, administración y mantenimiento del sistema MySQL
- [![Sequelize][sequelize]][sequelize-url] ORM para Nodejs que permite manipular la Base de Datos SQL de forma sencilla
- [![Postman][postman]][postman-url] Herramienta para crear solicitudes y probar la API de forma sencilla
- [![Swagger][swagger]][swagger-url] Especificación abierta para definir la API REST
- [![Others][others]][others-url] Paquetes adicionales para seguridad y manejo de CORS como [Helmet](https://www.npmjs.com/package/helmet 'Helmet'), [Compression](https://www.npmjs.com/package/helmet 'Compression') y [Cors](https://www.npmjs.com/package/cors 'Cors')

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Descripción general

Delilah Resto es el backend de un sistema de pedidos en línea para un restaurante que opera las partes necesarias para montar una API REST que permite operaciones CRUD en una estructura de datos.

#### Entregable

El objetivo del proyecto Delilah Resto presentado, es emular la tarea de un desarrollador backend.
Los entregables son:

- Archivos JS
- Archivo SQL o instalación desde la aplicación
- Archivo de Documentación
- [Readme.md](https://github.com/hmfarias/03-acamica-delilah/blob/master/README-esp.md) con instrucciones de instalación.

(El frontend no está incluido en el paquete entregable ni en los recursos de este proyecto. El foco está en el backend.)

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

#### Uso de Librerías

No se usaron librerías, plugins o cualquier otro recurso que no esté especificado en la guía de instrucciones recibida, ya que el objetivo del proyecto es validar los conocimientos básicos.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

#### Proceso de creación

##### Pasos seguidos

- **Paso 1: Introducción al proyecto**
  Entre los recursos recibidos, se analizó cada una de las vistas para entender el proyecto en su totalidad.
  Se observó detalladamente como es el comportamiento de la aplicación y se empezó a diagnosticar a grandes rasgos la arquitectura de la misma.

- **Paso 2: Definición de la especificación**
  En base a la información relevada se realizó la documentación con Swagger bajo el estándar OpenAPI.
  Se creó un archivo `delilahResto.json` en el directorio `SETUP` del proyecto y se completó la lista de Endpoints.

- **Paso 3: Creación del entorno**
  Se creó una carpeta en la computadora y se inició un repositorio GIT sobre esa carpeta. Asimismo, el proyecto NodejS se inicializó creando el archivo package.json.
  También se instalaron las dependencias necesarias y se creó el servidor web.

- **Paso 4: Endpoints**
  Se instaló Express en el proyecto y se comenzó a definir todas las rutas que se especificaron en la documentación.
  Se utilizaron los métodos Get, Post, Put y Delete dependiendo de la acción a realizar.

- **Paso 5: Estructura de la información**
  La estructura de la base de datos fue diseñada para soportar todo el flujo de la aplicación. Para ello se revisó nuevamente cada una de las vistas y se diseñó cada tabla en base a la información expedita de dichas vistas.

- **Paso 6: Conexión a la base de datos**
  Se introdujo el código necesario para la conexión a la base de datos y se habilitó un puerto local, conectado a una base de datos MySQL.

**Listar y crear Productos**

- **Paso 1: estructura y tabla de Productos**
  En base a la especificación creada previamente, se creó la tabla Productos con las columnas requeridas para cumplir con la especificación de la API.

- **Step 2: CRUD para Productos**
  Se agregó Express al proyecto, y se creó el primer endpoint de Products y se generaron las operaciones necesarias para poder crear, leer, actualizar y borrar un producto.

**Sistema de Usuarios**

- **Paso 1: Estructura y tabla de Usuarios**
  En base a la especificación creada previamente, se creó la tabla Usuarios con las columnas requeridas para cumplir con la especificación de la API.
  La tabla **Usuarios** está relacionada con la tabla **Roles**. Al crearlo se tuvieron en cuenta las siguientes condiciones:

  - Un usuario tiene un solo rol.
  - Se puede asignar un rol a varios usuarios.

- **Paso 2: Registro e inicio de sesión de Usuario**
  Según la especificación, se creó el endpoint correspondiente para brindarle al usuario una forma de crear una nueva cuenta.
  Asimismo, se incorporó el Token **JWT** para brindar a los usuarios registrados una forma de iniciar sesión en la plataforma.

- **Paso 3: Rol**
  Se generó una estrategia de validación de roles para todos endpoints existentes. Por ejemplo, que `solo los usuarios administradores pueden crear, editar y eliminar productos, y que los usuarios comunes solo tienen acceso a su información personal`.

**Creación de Roles**

- **Paso 1: Estructura y tabla de Roles**
  En base a la especificación creada anteriormente, se creó la tabla Roles con las columnas requeridas para cumplir con la especificación de la API.

- **Step 2: CRUD para Roles**
  Se generaron las operaciones necesarias para poder crear, leer, actualizar y borrar roles.

**Creación de Métodos de Pago**

- **Paso 1: Estructura y tabla de Métodos de Pago**
  En base a la especificación creada anteriormente, se creó la tabla Métodos de pago con las columnas requeridas para cumplir con la especificación de la API.

- **Step 2: CRUD para Métodos de Pago**
  Se generaron las operaciones necesarias para poder crear, leer, actualizar y eliminar un Medios de Pago.

**Creación de Órdenes**

- **Paso 1: estructura y tabla de Órdenes**
  La tabla de Órdenes está relacionada con dos tablas: **Usuarios** y **Productos**. A la hora de crearla se han tenido en cuenta las siguientes condiciones:

  - Una órden puede ser realizada por un solo usuario.
  - Un usuario puede realizar más de una órden.
  - Una órden puede contener varios productos.
  - Un producto puede formar parte de varias órdenes.

- **Paso 2: Crear y recibir Órdenes**
  Con las tablas ya creadas, se generó el primer endpoint para la creación de las Órdenes. Siempre en base a la especificación para saber qué se debe recibir y qué se debe devolver.
  Luego se creó un nuevo endpoint para obtener todas las órdenes. Esta consulta no solo devuelve el detalle de las órdenes, sino también el detalle de todos los **productos**, **usuarios** y **métodos de pago** relacionados a la misma.
  El GET de todas las órdenes solo puede ser ejecutado por un administrador. Un usuario registrado solo recibe los datos de su propia Órden.

- **Paso 3: Edición de Órdenes**
  El último paso para terminar con la API fue proporcionar al administrador herramientas de edición sobre las órdenes realizadas para actualizar el estado de las mismas ('nueva', 'confirmada', 'preparando', 'enviando', 'cancelada', 'entregada'). Es por eso que se creó un endpoint para realizar una actualización en la ruta de la Órden.

**Rate Limit Policy**
Finalmente, se incorporó el _Rate Limit Policy_ para permitir el control del tráfico entrante para la API al limitar la cantidad de solicitudes que la API puede recibir dentro de un período de tiempo determinado. Una vez que se alcanza el límite, la política rechaza todas las solicitudes, evitando así cualquier carga adicional en la API de back-end.

> Cuando configura el _Rate Limit Policy_, puede especificar cualquier número de pares de valores de cuota (número de solicitudes) y ventana de tiempo (período de tiempo).
> Consulte el tema [Archivo de Entorno](#el-archivo-de-entorno)

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- GETTING STARTED -->

## Comenzando

Esta guía describe paso a paso cómo configurar el entorno local para poner en marcha el sistema.
Se indican las herramientas necesarias para montar el servidor, los pasos de instalación y configuración, la creación de la base de datos y su población y por último, la correcta integración entre ambas partes para poder utilizar la API de forma local u online.

### Prerequisitos

Antes de comenzar la instalación, es necesario tener:

- [Node Js](https://nodejs.org/en/ 'Node js')
- [XAMPP](https://www.apachefriends.org/download.html 'XAMPP')
- [MySQL Workbench](https://www.mysql.com/products/workbench/ 'MYSQL')
- Instale [Nodemon](https://nodemon.io/ 'nodemon')

  ```
  npm install nodemon -g (for global installation)
  npm install nodemon --save-dev (for local installation)
  ```

  <p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Instalación

1. ##### Clonar el proyecto del repositorio

- Cree una carpeta en un directorio local y desde la `terminal` dentro de la carpeta creada, inicialice git:

```
git init
```

- Clonar todo el proyecto:

```
git clone https://github.com/hmfarias/03-acamica-delilah.git
```

2. ##### Instalar Dependencias

- En la raíz del proyecto, escriba el comando:

```
npm install
```

> Esto crea la carpeta _node_modules_ con las dependencias necesarias, como _express_, _sequelize_, _jwt_, etc.

3. ##### Poner la Base de Datos en línea

- Abra [XAMPP](https://www.apachefriends.org/download.html 'XAMPP'). Vaya a `Server Manage` e inicie `MySQL Database`
- Abra [MySQL Workbench](https://www.mysql.com/products/workbench/ 'MYSQL') y establezca la conexión con la base de datos. Asegúrese de que la base de datos MySql se esté ejecutando en el puerto 3306.
- En el proyecto existe una carpeta llamada `./setup`. En esta carpeta se encuentran los archivos de script necesarios para crear y llenar la base de datos con datos de prueba.
  Desde MySQL Workbench, vaya a la opción `Archivo -> Abrir script SQL`, seleccione y ejecute el archivo `./setup/delilah_create.sql`. A continuación, seleccione y ejecute el archivo `./setup/delilah_inserts.sql`.

> Esto crea la base de datos `delilah`, así como las tablas necesarias y los datos de prueba en las tablas creadas.

  <p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>
  
4. #### Variables de Entorno

##### El Archivo de Entorno

Deberá crear o modificar el archivo `.env` en la carpeta raíz del proyecto.
En este archivo, deberá configurar las siguientes variables de entorno:

- Para configurar la conexión con la Base de Datos:
  - **DB_SERVER= (ej: 127.0.0.1)**
  - **DB_USER= (ej: root)**
  - **DB_PWD=**
  - **DB_NAME= delilah**
  - **DB_PORT= 3306**
  - **APP_PORT= 3000**
    <br>
- Cadena secreta para JWT. Son números y caracteres especiales que utilizará el servidor para generar el token para cada usuario que haya iniciado sesión. **NUNCA EXPONGA ESTA CADENA DE CARACTERES**
  - **JWT_SECRET=(e.g. ger7gtlhiu&ylkjsd876fswihelgklmvals654sakltfghpa$)**
    <br>
- Tiempo de vida del Token
  - **EXPIRE_TIME_TOKEN = 120m**
    <br>
- Número máximo de solicitudes según el _Rate Limit Policy_ deseado
  - **MAX_REQUEST = ej: 20**
    <br>
- Tiempo de espera en minutos después de superar MAX_REQUEST
  - **MINUTES_TO_WAIT = 1**

5. #### Poner el Servidor en línea

   Para poner el servidor en línea, ejecute el siguiente comando en la terminal (desde la raíz del proyecto):

   ```
   npm run server
   ```

   > Esto inicia el archivo `./src/server.js ` con nodemon.
   > Verá el siguiente mensaje en la consola:
   >
   > ```
   >   Listening in Port: 3000
   >   Executing (default): SELECT 1+1 AS result
   >   All OK - connected database
   > ```

6. #### La API está en línea y "escuchando" en el puerto seleccionado
   Después de completar los pasos anteriores, puede comenzar a probar la API de Delilah Resto.
   Puede usar [Postman](https://www.postman.com/ 'Postman') para ello.
   En la carpeta `/setup`, puede encontrar la Colección Postman que prueba todos y cada uno de los endpoints de la API.
   Inicie Postman e importe el archivo `./setup/API Delilah-postman_collection.json`. Allí tendrá todos los ejemplos de uso de cada endpoint disponible, así como los modelos Json de cada petición.
   Tener en cuenta que de acuerdo con el esquema de seguridad implementado para la API, para probar cada punto final, deberá iniciar sesión en el sistema con un usuario existente (administrador o usuario común) y usar el token devuelto por el servidor en el encabezado de cada solicitud. .

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

### Documentación

Con Server "online", puede visitar la página de documentación, [http://localhost:3000/api/v1/docs/#/](http://localhost:3000/api/v1/docs/#/) para obtener los detalles de cada solicitud y su respuesta.
También puede ir a [Swagger](https://editor.swagger.io/ 'Swagger') y arrastrar o importar el archivo ` ./setup/delilahResto.yaml` para obtener el mismo resultado.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>
<!-- CONTRIBUTING -->

## Contribuyendo

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que haga es **muy apreciada**.

Si tiene una sugerencia para mejorar este proyecto, por favor haga un "fork" al repositorio y cree un "pull request". También puede simplemente abrir un "issue" con la etiqueta "mejora".
¡No olvide darle una estrella al proyecto! ¡Gracias de nuevo!

1. Fork al Proyecto
2. Cree una nueva rama para su característica (`git checkout -b feature/newFeature`)
3. Commit para los cambios (`git commit -m 'Add some newFeature'`)
4. Push a la nueva rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- LICENSE -->

## Licencia

Distribuido bajo la licencia MIT. Consulte `LICENSE.txt` para obtener más información.

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- CONTACT -->

## Contacto

Marcelo Farias - [+54 9 3512601888](https://twitter.com/your_username) - hmfarias7@gmail.com

Link del Proyecto: [https://github.com/hmfarias/03-acamica-delilah](https://github.com/hmfarias/03-acamica-delilah)

<p align="right">(<a href="#tabla-de-contenidos">volver</a>)</p>

<!-- ACKNOWLEDGMENTS -->

<!-- MARKDOWN LINKS & IMAGES -->

<!-- [statuss-shield]: https://img.shields.io/badge/STATUS-Developing-green -->

[statuss-shield]: https://img.shields.io/badge/STATUSS-finished-green
[statuss-url]: https://github.com/hmfarias/03-acamica-delilah#readme
[forks-shield]: https://img.shields.io/github/forks/hmfarias/03-acamica-delilah
[forks-url]: https://github.com/hmfarias/03-acamica-delilah/network/members
[stars-shield]: https://img.shields.io/github/stars/hmfarias/03-acamica-delilah
[stars-url]: https://github.com/hmfarias/03-acamica-delilah/stargazers
[issues-shield]: https://img.shields.io/github/issues/hmfarias/03-acamica-delilah
[issues-url]: https://github.com/hmfarias/03-acamica-delilah/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg
[license-url]: https://github.com/hmfarias/03-acamica-delilah/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/hugo-marcelo-farias
[product-screenshot]: https://user-images.githubusercontent.com/56005148/192166732-ecbcd321-b61d-4998-a114-5d616846ed8d.png
[nodejs]: https://img.shields.io/badge/nodeJS-347012?style=for-the-badge&logo=nodedotjs&logoColor=white
[node-url]: https://nodejs.org/
[nodemon]: https://img.shields.io/badge/nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=4F4D3F
[nodemon-url]: https://nodemon.io/
[express]: https://img.shields.io/badge/express-35495E?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[jsonweb]: https://img.shields.io/badge/JSON_Web_Token-4A4A55?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[jsonweb-url]: https://jwt.io/
[ratelimit]: https://img.shields.io/badge/Rate_Limt-4A4A55?style=for-the-badge&logo=express&logoColor=white
[ratelimit-url]: https://www.npmjs.com/package/express-rate-limit
[xampp]: https://img.shields.io/badge/XAMPP-EFEEE5?style=for-the-badge&logo=xampp&logoColor=orange
[xampp-url]: https://www.apachefriends.org/es/index.html
[mysql]: https://img.shields.io/badge/MySQL-3E6E93?style=for-the-badge&logo=mysql&logoColor=orange
[mysql-url]: https://www.mysql.com/
[workbench]: https://img.shields.io/badge/MySQL_Workbench-orange?style=for-the-badge&logo=mysql&logoColor=blue
[workbench-url]: https://www.mysql.com/products/workbench/
[sequelize]: https://img.shields.io/badge/Sequelize-grey?style=for-the-badge&logo=sequelize&logoColor=52B0E6
[sequelize-url]: https://sequelize.org/
[postman]: https://img.shields.io/badge/Postman-orange?style=for-the-badge&logo=postman&logoColor=white
[postman-url]: https://www.postman.com/
[swagger]: https://img.shields.io/badge/Swagger-4F8C2E?style=for-the-badge&logo=swagger&logoColor=white
[swagger-url]: https://swagger.io/
[others]: https://img.shields.io/badge/Others-grey?style=for-the-badge
[others-url]: https://github.com/hmfarias/03-acamica-delilah
