const jwt = require( 'jsonwebtoken' );
require( 'dotenv' ).config( { path: 'variables.env' } );



module.exports = ( req, res, next ) => {
  const authHeader = req.get( 'Authorization' );

  if ( authHeader ) {
    // Obtener el token
    const token = authHeader.split( ' ' )[ 1 ];
    if ( token ) {
      try {
        // Comprobar el JWT
        const usuario = jwt.verify( token, process.env.SECRETA );
        // Asigna de manera interna el usuario, esto evita que el usuario pueda manipular la información
        req.usuario = usuario;
      } catch ( error ) {
        req.usuario = 401;
      }
    }
  }

  return next();
}