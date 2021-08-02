const mongoose = require( 'mongoose' );

// Se crea un Schema para definir el modelo de los usuarios
const UsuariosSchema = mongoose.Schema( {
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  registro: {
    type: Date,
    default: Date.now()
  }
} );

// Se exporta con el nombre Usuario
module.exports = mongoose.model( 'Usuario', UsuariosSchema );