const Proyecto = require( '../models/Proyecto' );
const { validationResult } = require( 'express-validator' );

exports.crearProyecto = async ( req, res ) => {

  // Revisar si hay errores, el resultado proviene desde el router
  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
    return res.status( 400 ).json( { errores: errores.array() } )
  }

  try {

    // Crear un nuevo proyecto
    const proyecto = new Proyecto( req.body );

    // Guardar al creador via JWT
    proyecto.creador = req.usuario.id;

    // Guardar proyecto
    proyecto.save();
    res.json( proyecto );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( "Hubo un error." );
  }

}

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async ( req, res ) => {

  try {
    // Se usa find para encontrar todos los registros y se usa .sort para organizar los por fecha de creación desde la más reciente a la más antigua
    const proyectos = await Proyecto.find( { creador: req.usuario.id } ).sort( { creado: -1 } );
    res.json( { proyectos } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Hubo un error.' );
  }
}

// Actualizar un proyecto
exports.actualizarProyecto = async ( req, res ) => {
  // Revisar si hay errores, el resultado proviene desde el router
  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
    return res.status( 400 ).json( { errores: errores.array() } )
  }

  // Extraer la información del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if ( nombre ) {
    nuevoProyecto.nombre = nombre;
  }

  try {

    // Revisar el ID
    let proyecto = await Proyecto.findById( req.params.id );

    // Si el proyecto existe o no
    if ( !proyecto ) {
      return res.status( 404 ).json( { msg: 'proyecto no encontrado' } );
    }

    // Verificar el creador del proyecto
    if ( proyecto.creador.toString() !== req.usuario.id ) {
      return res.status( 401 ).json( { msg: 'Usuario no autorizado' } );
    }

    // Actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );

    res.json( { proyecto } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Error en el servidor' );
  }

}

// Elimina n proyecto por su ID
exports.eliminarProyecto = async ( req, res ) => {

  try {
    // Revisar el ID
    let proyecto = await Proyecto.findById( req.params.id );

    // Si el proyecto existe o no
    if ( !proyecto ) {
      return res.status( 404 ).json( { msg: 'proyecto no encontrado' } );
    }

    // Verificar el creador del proyecto
    if ( proyecto.creador.toString() !== req.usuario.id ) {
      return res.status( 401 ).json( { msg: 'Usuario no autorizado' } );
    }

    // Eliminar el proyecto
    await Proyecto.findOneAndRemove( { _id: req.params.id } );
    res.json( { msg: 'Proyecto Eliminado' } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Error al eliminar' );
  }
}