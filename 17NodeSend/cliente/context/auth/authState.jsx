// ? Componentes
import AuthContext from "./authContext";
import { useReducer } from "react";
import AuthReducer from "./authReducer";
import clienteAxios from "config/axios";
import TokenAuth from "config/tokenAuth";
// | Types
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OCULTAR_ALERTA,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
  LIMPIAR_STATE,
} from "types";


const AuthState = props => {

  // Definir un State inicial
  const initialState = {
    // NextJs verifica en el servidor y el cliente por el localstorage
    // con una comprobación a window obtenemos el token
    token: typeof window !== "undefined" ? localStorage.getItem( 'rns_token' ) : '',
    autenticado: null,
    usuario: null,
    mensaje: null
  };

  // Definir el reducer
  const [ state, dispatch ] = useReducer( AuthReducer, initialState );

  // Registrar nuevos usuarios
  const registrarUsuario = async datos => {

    try {
      const respuesta = await clienteAxios.post( '/api/usuarios', datos );
      dispatch( {
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg
      } );
    } catch ( error ) {
      dispatch( {
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      } );
    }
    limpiarAlerta();
  };


  // Autenticar usuarios
  const iniciarSesion = async datos => {
    try {
      const respuesta = await clienteAxios.post( '/api/auth', datos );
      dispatch( {
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token
      } );
    } catch ( error ) {
      dispatch( {
        type: LOGIN_ERROR,
        payload: error.response.data.msg
      } )
    }
    limpiarAlerta();
  };

  // Retornar el Usuario autenticado en base al JWT
  const usuarioAutenticado = async () => {
    // Obtener el token del local storage
    const token = localStorage.getItem( 'rns_token' );
    TokenAuth( token );

    try {
      const respuesta = await clienteAxios.get( '/api/auth' );
      if ( respuesta.data.usuario ) {
        dispatch( {
          type: USUARIO_AUTENTICADO,
          payload: respuesta.data.usuario
        } );
      }
    } catch ( error ) {
      // Recibe el código de error 401 y elimina el token expirado del storage
      if ( error.response.status === 401 ) {
        localStorage.removeItem( 'rns_token' );
      }
      dispatch( {
        type: REGISTRO_ERROR,
        payload: error.response.data.msg
      } );
    }
  };

  // Cerrar Sesión
  const cerrarSesion = () => {
    dispatch( {
      type: CERRAR_SESION
    } );
  }

  // Limpia la alerta después de 3 segundos
  const limpiarAlerta = () => {
    setTimeout( () => {
      dispatch( {
        type: OCULTAR_ALERTA
      } )
    }, 3000 );
  };

  return (
    <AuthContext.Provider
      value={ {
        // ? Variables del state
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        // ? Funciones
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      } }
    >
      { props.children }
    </AuthContext.Provider>
  )
};

export default AuthState;