import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OCULTAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
  LIMPIAR_STATE

} from "types";

const AuthReducer = ( state, action ) => {
  switch ( action.type ) {

    case REGISTRO_EXITOSO:
    case REGISTRO_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload
      }

    case LOGIN_EXITOSO:
      // Agrega el token al local storage
      localStorage.setItem( 'rns_token', action.payload );
      return {
        ...state,
        token: action.payload,
        autenticado: true
      }

    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true
      }

    case OCULTAR_ALERTA:
      return {
        ...state,
        mensaje: null
      }

    case CERRAR_SESION:
      // Elimina el token del local storage cuando se cierra sesión
      localStorage.removeItem( 'rns_token' );
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null
      }



    default:
      return state;
  }
};

export default AuthReducer;