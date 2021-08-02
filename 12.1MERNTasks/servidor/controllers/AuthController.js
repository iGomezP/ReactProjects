const Usuario = require( '../models/Usuario.js' );
const bcryptjs = require( 'bcryptjs' );
const { validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );

exports.autenticarUsuario = async ( req, res ) => {

  // Revisar si hay errores, el resultado proviene desde el router
  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
    return res.status( 400 ).json( { errores: errores.array() } )
  }

  // Extraer email y password
  const { email, password } = req.body;

  try {

    // Revisar que sea un usuario registrado
    let usuario = await Usuario.findOne( { email } );

    if ( !usuario ) {
      return res.status( 400 ).json( { msg: 'El usuario no existe' } );
    }

    // Revisar el password ingresando el password tecleado vs el password hasheado
    const passCorrecto = await bcryptjs.compare( password, usuario.password );
    if ( !passCorrecto ) {
      return res.status( 400 ).json( { msg: 'El password es incorrecto' } );
    }

    // Si todo es correcto se crea el JSON Web Token (JWT)
    // Crear y firmar el Json Web Token
    // Crear JWT
    const payload = {
      usuario: {
        id: usuario.id
      }

    };

    // Firmar el JWToken
    jwt.sign( payload, process.env.SECRETA, {
      expiresIn: 3600 // Expira en 1 hora
    }, ( error, token ) => {
      if ( error ) {
        throw error;
      }

      // Mensaje de confirmación
      res.json( { token } );

    } );


  } catch ( error ) {
    console.log( error );
  }
};

// Obtiene el usuario autenticado
exports.UsuarioAutenticado = async ( req, res ) => {

  try {
    // Obtener los datos del usuario con excepción del password (.select)
    const usuario = await Usuario.findById( req.usuario.id ).select( '-password' );
    // Responde con la información obtenida
    res.json( { usuario } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Hubo un error al recuperar el usuario autenticado.' );
  }

};
