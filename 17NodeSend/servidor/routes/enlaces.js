// Endpoint de enlaces
const express = require( 'express' )
const router = express.Router();
const enlacesController = require( '../controllers/enlacesController' );
const archivosController = require( '../controllers/archivosController' );
const { check } = require( 'express-validator' );
const authMiddle = require( '../middleware/authMiddle' );

router.post( '/',
  [
    check( 'nombre', 'Sube un archivo' ).notEmpty(),
    check( 'nombreOriginal', 'Sube un archivo' ).notEmpty()
  ],
  authMiddle,
  enlacesController.nuevoEnlace
);

router.get( '/',
  enlacesController.todosEnlaces
);

router.get( '/:url',
  enlacesController.tienePassword,
  enlacesController.obtenerEnlace
);

router.post( '/:url',
  enlacesController.verificarPassword,
  enlacesController.obtenerEnlace
);

module.exports = router;