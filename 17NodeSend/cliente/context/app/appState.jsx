// ? Componentes
import { useReducer } from "react";
import AppContext from "./appContext";
import AppReducer from "./appReducer";
import clienteAxios from "config/axios";
import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA,
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from "types";

const AppState = ( props ) => {

  // Definir el state inicial
  const initialState = {
    mensaje_archivo: null,
    nombre: '',
    nombreOriginal: '',
    cargando: null,
    descargas: 1,
    password: '',
    autor: null,
    url: ''
  };

  // Definir el reducer
  const [ state, dispatch ] = useReducer( AppReducer, initialState );

  // Muestra una alerta
  const mostrarAlerta = msg => {
    dispatch( {
      type: MOSTRAR_ALERTA,
      payload: msg
    } )

    setTimeout( () => {
      dispatch( {
        type: OCULTAR_ALERTA
      } )
    }, 3000 );
  }

  // Sube los archivos al servidor
  const subirArchivo = async ( formData, nombreArchivo ) => {

    dispatch( {
      type: SUBIR_ARCHIVO
    } )

    // console.log( "Subiendo archivo" );
    try {
      const resultado = await clienteAxios.post( '/api/archivos', formData );
      dispatch( {
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombreOriginal: nombreArchivo
        }
      } )
    } catch ( error ) {
      // console.log( error );
      dispatch( {
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg
      } )
    }
  }

  // Crear un enlace
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombreOriginal: state.nombreOriginal,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor
    }
    try {
      const resultado = await clienteAxios.post( '/api/enlaces', data );
      dispatch( {
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.enlace
      } )
    } catch ( error ) {
      console.log( error );
    }
  };

  // Reiniciar el State
  const reiniciarState = () => {
    dispatch( {
      type: LIMPIAR_STATE
    } )
  };

  // Agregar password al archivo
  const passwordArchivo = password => {

    dispatch( {
      type: AGREGAR_PASSWORD,
      payload: password
    } )
  }

  // Agregar el número de descargas
  const numeroDescargas = numDescargas => {
    dispatch( {
      type: AGREGAR_DESCARGAS,
      payload: numDescargas
    } )
  }

  return (
    <AppContext.Provider
      value={ {
        // Variables del state
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombreOriginal: state.nombreOriginal,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        // Funciones
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        reiniciarState,
        passwordArchivo,
        numeroDescargas
      } }
    >
      { props.children }
    </AppContext.Provider>
  )
}

export default AppState;