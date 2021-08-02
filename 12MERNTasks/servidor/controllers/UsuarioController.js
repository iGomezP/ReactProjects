const Usuario = require( '../models/Usuario.js' );
const bcryptjs = require( 'bcryptjs' );
const { validationResult } = require( 'express-validator' );
const jwt = require( 'jsonwebtoken' );

exports.crearUsuario = async ( req, res ) => {

  // Revisar si hay errores, el resultado proviene desde el router
  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
    return res.status( 400 ).json( { errores: errores.array() } )
  }

  // Extraer email y password
  const { email, password } = req.body;

  try {
    // Revisar que el usuario registrado sea único buscando al usuario con ese email
    let usuario = await Usuario.findOne( { email } );

    if ( usuario ) {
      return res.status( 400 ).json( { msg: 'El usuario ya existe' } );
    }

    // Crear el nuevo usuario
    usuario = new Usuario( req.body );

    // Hashear el password después que el usuario existe y fue implementado
    // ° Salt genera un hash único
    const salt = await bcryptjs.genSalt( 10 );
    usuario.password = await bcryptjs.hash( password, salt );


    // Guardar el nuevo usuario
    await usuario.save();

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
    res.status( 400 ).json( { msg: 'El usuario ya existe' } );
  }
}