const express = require( 'express' );
const router = express.Router();
const TareaController = require( '../controllers/TareaController' );
const auth = require( '../middleware/auth' );
const { check } = require( 'express-validator' );

// Crear una tarea
// api/tareas
router.post( '/',
  auth,
  [ check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty() ],
  [ check( 'proyecto', 'El proyecto es obligatorio' ).not().isEmpty() ],
  TareaController.CrearTarea
);

// Obtener las tareas por proyecto
router.get( '/',
  auth,
  TareaController.ObtenerTareas
);

// Actualizar una tarea
router.put( '/:id',
  auth,
  TareaController.ActualizarTarea
)

router.delete( '/:id',
  auth,
  TareaController.EliminarTarea
);

module.exports = router;