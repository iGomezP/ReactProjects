const Enlaces = require( '../models/Enlace' );
const { nanoid } = require( 'nanoid' );
const bcryptjs = require( 'bcryptjs' );
const { validationResult } = require( 'express-validator' );


exports.nuevoEnlace = async ( req, res, next ) => {

  // Revisar si hay errores
  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
    return res.status( 400 ).json( { errores: errores.array() } );
  }

  // Crear un objeto de Enlace
  const { nombreOriginal, nombre } = req.body;

  const enlace = new Enlaces();
  enlace.url = nanoid( 10 );
  enlace.nombre = nombre;
  enlace.nombreOriginal = nombreOriginal;

  // Si el usuario está autenticado
  if ( req.usuario ) {
    const { password, descargas } = req.body;

    // Asignar a enlace el número de descargas
    if ( descargas ) {
      enlace.descargas = descargas;
    }

    // Asignar un password
    if ( password ) {
      const salt = await bcryptjs.genSalt( 10 );
      enlace.password = await bcryptjs.hash( password, salt );
    }

    // Asignar el autor
    enlace.autor = req.usuario.id;
  }

  // Almacenar enlace en la BD
  // console.log( typeof enlace._id );
  // console.log( enlace );
  try {
    await enlace.save();
    return res.json( { msg: `Enlace guardado exitosamente =>`, enlace: enlace.url } );
  } catch ( error ) {
    console.log( `No se pudo guardar el enlace => ${ error }` );
  }
};

// ¬ Obtener un listado de todos los enlaces
exports.todosEnlaces = async ( req, res ) => {
  try {
    const enlaces = await Enlaces.find( {} ).select( 'url nombre -_id' );
    res.json( { enlaces } );
  } catch ( error ) {
    console.log( error );
  }
}

// Retorna si el enlace tiene password o no
exports.tienePassword = async ( req, res, next ) => {
  // Se obtiene la url generada
  const { url } = req.params;
  // console.log( url );

  // Verificar si el enlace existe buscando en la BD por url
  const enlace = await Enlaces.findOne( { url } );

  // Si el enlace no existe
  if ( !enlace ) {
    res.status( 404 ).json( { msg: "El enlace no existe." } );
    return next();
  }

  if ( enlace.password ) {
    return res.json( { password: true, enlace: enlace.url } );
  }

  next();

}

// Verifica si el password es correcto
exports.verificarPassword = async ( req, res, next ) => {
  const { url } = req.params;

  // Consultar por el enlace
  const enlace = await Enlaces.findOne( { url } );

  // Verificar el password
  const { password } = req.body;

  if ( bcryptjs.compareSync( password, enlace.password ) ) {
    // Permitir la descarga del archivo (pasa al siguiente componente)
    next();
  } else {
    return res.status( 401 ).json( { msg: 'Password Incorrecto' } );
  }




}

// Obtener enlace
exports.obtenerEnlace = async ( req, res, next ) => {
  // Se obtiene la url generada
  const { url } = req.params;
  // console.log( url );

  // Verificar si el enlace existe buscando en la BD por url
  const enlace = await Enlaces.findOne( { url } );

  // Si el enlace no existe
  if ( !enlace ) {
    res.status( 404 ).json( { msg: "El enlace no existe." } );
    return next();
  }

  // Si el enlace existe
  res.json( { archivo: enlace.nombre, password: false } );

  next();
};
