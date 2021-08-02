const mongoose = require( 'mongoose' );

const ProyectoSchema = mongoose.Schema( {
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  creador: {
    // Hace que cada creador sea el Id único del usuario
    type: mongoose.Schema.Types.ObjectId,
    // Se le indica el nombre del modelo de donde proviene el Id (UsuarioSchema)
    ref: 'Usuario'
  },
  creado: {
    type: Date,
    default: Date.now()
  }
} )

module.exports = mongoose.model( 'Proyecto', ProyectoSchema );