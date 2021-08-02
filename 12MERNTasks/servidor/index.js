const express = require( 'express' );
const conectarDB = require( './config/db' );
const cors = require( 'cors' );

// Crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// ¿ Habilitar CORS
app.use( cors() );

// Habilitar express.json que permite leer lo que el usuario coloque
app.use( express.json( { extended: true } ) );

// Puerto de la app
// Se crea por que en heroku se espera que la variable del entorno se llame PORT
// ° No se puede tener el mismo puerto como cliente y servidor, deben ser diferentes en desarrollo
const port = process.env.port || 4000;

// Importar todas las rutas
app.use( '/api/usuarios', require( './routes/usuarios' ) );
app.use( '/api/auth', require( './routes/auth' ) );
app.use( '/api/proyectos', require( './routes/proyectos' ) );
app.use( '/api/tareas', require( './routes/tareas' ) );

// Arrancar a app
app.listen( port, '0.0.0.0', () => {
  console.log( `El servidor está funcionando en el puerto ${ port }` );
} );










// ° Se recomienda definir el router en un archivo separado pero en esta ocasión será definido en el mismo archivo:
// Definir la página principal
// app.get( '/', ( req, res ) => {
//   res.send( 'Hola Mundo' );
// } );