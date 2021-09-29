// Endpoint de autenticación
const express = require( 'express' )
const router = express.Router();
const archivosController = require( '../controllers/archivosController' );
const authMiddle = require( '../middleware/authMiddle' );

router.post( '/',
  authMiddle,
  archivosController.subirArchivo
);

router.get( '/:archivo',
  archivosController.descargarArchivo,
  archivosController.eliminarArchivo
)

module.exports = router;