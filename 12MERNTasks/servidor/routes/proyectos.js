const express = require( 'express' );
const router = express.Router();
const ProyectoController = require( '../controllers/ProyectoController' );
const auth = require( '../middleware/auth' );
const { check } = require( 'express-validator' );

// Crea proyectos
// api/proyectos
router.post( '/',
  // Se va pasando a través de los diferentes middlewares
  auth,
  // Verifica que el proyecto tenga un nombre y no pase vacío
  [ check( 'nombre', 'El nombre del proyecto es obligatorio' ).not().isEmpty() ],
  ProyectoController.crearProyecto
);

// Obtener todos los proyectos
router.get( '/',
  auth,
  ProyectoController.obtenerProyectos
);

// Actualiza los proyecto via ID
router.put( '/:id',
  auth,
  [ check( 'nombre', 'El nombre del proyecto es obligatorio' ).not().isEmpty() ],
  ProyectoController.actualizarProyecto
);

// Eliminar un Proyecto
router.delete( '/:id',
  auth,
  ProyectoController.eliminarProyecto
);

module.exports = router;