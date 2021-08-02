const { validationResult } = require( "express-validator" );
const Proyecto = require( "../models/Proyecto" );
const Tarea = require( "../models/Tarea" );


// Crea una nueva tarea
exports.CrearTarea = async ( req, res ) => {

  // Revisar si hay errores, el resultado proviene desde el router
  const errores = validationResult( req );

  if ( !errores.isEmpty() ) {
    return res.status( 400 ).json( { errores: errores.array() } )
  }

  try {

    // Extraer el proyecto y comprobar si existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById( proyecto );

    if ( !existeProyecto ) {
      res.status( 404 ).json( { msg: 'Proyecto no encontrado.' } )
    }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    // Verificar el creador del proyecto
    if ( existeProyecto.creador.toString() !== req.usuario.id ) {
      return res.status( 401 ).json( { msg: 'Usuario no autorizado' } );
    }

    // Creamos la tarea
    const tarea = new Tarea( req.body );
    await tarea.save();
    res.json( { msg: 'Tarea creada de forma exitosa.' } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Hubo un error al añadir la tarea.' )
  }
}

// Obtiene las tareas por proyecto
exports.ObtenerTareas = async ( req, res ) => {

  try {
    // Extraer el proyecto y comprobar si existe
    // Cuando se usa params en el cliente, en el servidor debe usarse req.query en lugar de req.body
    const { proyecto } = req.query;

    const existeProyecto = await Proyecto.findById( proyecto );

    if ( !existeProyecto ) {
      res.status( 404 ).json( { msg: 'Proyecto no encontrado.' } )
    }

    // Revisar si el proyecto actual pertenece al usuario autenticado
    // Verificar el creador del proyecto
    if ( existeProyecto.creador.toString() !== req.usuario.id ) {
      return res.status( 401 ).json( { msg: 'Usuario no autorizado' } );
    }

    // Obtener las tareas por proyecto
    const tareas = await Tarea.find( { proyecto } ).sort( { creado: -1 } );
    res.json( { tareas } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Hubo un error al obtener las tareas.' );
  }

}

// Actualizar una tarea
exports.ActualizarTarea = async ( req, res ) => {

  try {

    // Extraer el proyecto y comprobar si existe
    const { proyecto, nombre, estado } = req.body;

    // Si la tarea existe o no
    let tareaExiste = await Tarea.findById( req.params.id );
    if ( !tareaExiste ) {
      return res.status( 404 ).json( { msg: 'La tarea no existe.' } );
    }

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById( proyecto );
    // Revisar si el proyecto actual pertenece al usuario autenticado
    // Verificar el creador del proyecto
    if ( existeProyecto.creador.toString() !== req.usuario.id ) {
      return res.status( 401 ).json( { msg: 'Usuario no autorizado' } );
    }

    // Crear un objeto con la nueva información
    const nuevaTarea = {};

    // ° Al mandarse el objeto completo desde el cliente, se deja de utilizar el if
    // if ( nombre ) {
    nuevaTarea.nombre = nombre;
    // }

    // if ( estado ) {
    nuevaTarea.estado = estado;
    // }

    // Guardar la tarea
    tareaExiste = await Tarea.findOneAndUpdate( { _id: req.params.id }, nuevaTarea, { new: true } );
    res.json( { tareaExiste } );

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Hubo un error al actualizar la tarea.' );
  }

}

//  Eliminar Tarea
exports.EliminarTarea = async ( req, res ) => {

  try {

    // Extraer el proyecto y comprobar si existe
    // Cuando se usa params en el cliente, en el servidor debe usarse req.query en lugar de req.body
    const { proyecto } = req.query;

    // Si la tarea existe o no
    let tareaExiste = await Tarea.findById( req.params.id );
    if ( !tareaExiste ) {
      return res.status( 404 ).json( { msg: 'La tarea no existe.' } );
    }

    // Extraer proyecto
    const existeProyecto = await Proyecto.findById( proyecto );
    // Revisar si el proyecto actual pertenece al usuario autenticado
    // Verificar el creador del proyecto
    if ( existeProyecto.creador.toString() !== req.usuario.id ) {
      return res.status( 401 ).json( { msg: 'Usuario no autorizado' } );
    }

    // Eliminar
    await Tarea.findOneAndRemove( { _id: req.params.id } );
    res.json( { msg: `La tarea '${ tareaExiste.nombre }' fue eliminada` } )

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).send( 'Hubo un error al actualizar la tarea.' );
  }

}