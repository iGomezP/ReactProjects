const Usuario = require( '../models/Usuario' );
const bcryptjs = require( 'bcryptjs' );
const jwt = require( 'jsonwebtoken' );
const { validationResult } = require( 'express-validator' );
require( 'dotenv' ).config( { path: 'variables.env' } );


exports.autenticarUsuario = async ( req, res, next ) => {

  // Mostrar mensajes de error de express-validator
  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
    return res.status( 400 ).json( { errores: errores.array() } );
  }

  // Buscar el usuario para ver si está registrado
  const { email, password } = req.body;
  const usuario = await Usuario.findOne( { email } );

  if ( !usuario ) {
    res.status( 401 ).json( { msg: "El usuario no existe." } )
    return next();
  }

  // Verificar el password y autenticar el usuario
  // console.log( `Usuario: ${ usuario.nombre }` );
  if ( bcryptjs.compareSync( password, usuario.password ) ) {
    // res.status( 200 ).json( { msg: `Sesión iniciada como: ${ usuario.nombre }` } );
    // Crear JWT
    const token = jwt.sign( {
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email
    }, process.env.SECRETA, {
      expiresIn: '8h'
    } );

    res.json( { token } );

  } else {
    res.status( 401 ).json( { msg: "La contraseña es incorrecta." } );
    return next();
  }
};


exports.usuarioAutenticado = ( req, res, next ) => {

  if ( req.usuario !== 401 ) {
    res.json( { usuario: req.usuario } );
  } else {
    res.status( 401 ).json( { msg: 'Token expirado.' } );
  }

};