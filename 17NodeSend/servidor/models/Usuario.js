const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema;

// La forma que van a tener los datos para la base de datos
const usuariosSchema = new Schema( {
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
} );

module.exports = mongoose.model( 'Usuario', usuariosSchema );