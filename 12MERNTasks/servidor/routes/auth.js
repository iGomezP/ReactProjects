// Rutas para autenticar usuarios
const express = require( 'express' );
const router = express.Router();
const { check } = require( 'express-validator' );
const authController = require( '../controllers/AuthController' );
const auth = require( '../middleware/auth' );

// Iniciar sesión
// api/auth
router.post( '/',
  // Las reglas del validador van en el router pero se validan en el controlador
  // ¿ Implementado en React
  // [
  //   check( 'email', 'Agrega un email válido' ).isEmail(),
  //   check( 'password', 'El password debe ser mínimo de 6 caracteres' ).isLength( { min: 6 } )
  // ],
  authController.autenticarUsuario
);

// Obtiene el usuario autenticado
router.get( '/',
  auth,
  authController.UsuarioAutenticado
);

module.exports = router;
