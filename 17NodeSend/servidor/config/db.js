// Datos para la conexión a la BD
const mongoose = require( 'mongoose' );
require( 'dotenv' ).config( { path: 'variables.env' } );

const conectarDB = async () => {


  try {
    await mongoose.connect( process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } );
    console.log( "DB conectada" );
  } catch ( error ) {
    console.log( `Hubo un error al conectar a la base de datos => ${ error }` );
    process.exit( 1 );
  }
}

// Se hace disponible en el index.js
module.exports = conectarDB;