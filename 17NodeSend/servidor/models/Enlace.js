const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const enlacesSchema = new Schema( {
  url: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true
  },
  nombreOriginal: {
    type: String,
    required: true
  },
  descargas: {
    type: Number,
    default: 1
  },
  // Obtiene el autor del otro Schema
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    default: null
  },
  password: {
    type: String,
    default: null
  },
  creado: {
    type: Date,
    default: Date.now()
  }

} );

module.exports = mongoose.model( 'Enlaces', enlacesSchema );