import { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import clienteAxios from "../../config/axios";
import TokenAuth from "../../config/tokenAuth";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from "../../types";

const AuthState = props => {

  // State inicial
  const initialState = {
    token: localStorage.getItem( 'token' ),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true
  }

  // Inicializacion del reducer
  const [ state, dispatch ] = useReducer( AuthReducer, initialState );

  // Funciones
  const RegistrarUsuario = async datos => {

    try {

      const respuesta = await clienteAxios.post( '/api/usuarios', datos );
      // console.log( respuesta.data );

      dispatch( {
        type: REGISTRO_EXITOSO,
        payload: respuesta.data
      } );

      // Obtener el usuario
      UsuarioAutenticado();

    } catch ( error ) {
      // console.log( error.response.data.msg );
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }

      dispatch( {
        type: REGISTRO_ERROR,
        payload: alerta
      } );
    }
  };

  // Cuando el usuario inicia sesión
  const IniciarSesion = async datos => {

    try {

      const respuesta = await clienteAxios.post( '/api/auth', datos );
      // console.log( respuesta );
      dispatch( {
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      } );

      // Obtener el usuario
      UsuarioAutenticado();

    } catch ( error ) {
      console.log( error.response.data.msg );
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }

      dispatch( {
        type: LOGIN_ERROR,
        payload: alerta
      } );
    }
  };

  // Retorna el usuario autenticado
  const UsuarioAutenticado = async () => {
    const token = localStorage.getItem( 'token' );
    if ( token ) {
      // Función para enviar el token por headers
      TokenAuth( token );
    }

    try {

      const respuesta = await clienteAxios.get( '/api/auth' );
      // console.log(  );

      dispatch( {
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario
      } )

    } catch ( error ) {
      console.log( error.response );
      dispatch( {
        type: LOGIN_ERROR
      } )
    }
  };

  // Cierra la sesión del usuario
  const CerrarSesion = () => {
    dispatch( {
      type: CERRAR_SESION
    } )
  }

  return (
    <AuthContext.Provider
      value={ {
        // ¿ States
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        // ¿ Funciones
        RegistrarUsuario,
        IniciarSesion,
        UsuarioAutenticado,
        CerrarSesion
      } }
    >
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthState;