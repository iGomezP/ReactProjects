// Endpoint de autenticación
const express = require( 'express' )
const router = express.Router();
const authController = require( '../controllers/authController' );
const { check } = require( 'express-validator' );
const authMiddle = require( '../middleware/authMiddle' );



router.post( '/',
  [
    check( 'email', 'Agrega un Email válido.' ).isEmail(),
    check( 'password', 'El password no puede ir vacío.' ).notEmpty()
  ],
  authController.autenticarUsuario
);


router.get( '/',
  authMiddle,
  authController.usuarioAutenticado
);


module.exports = router;