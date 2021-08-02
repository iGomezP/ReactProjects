import { useReducer } from "react";
import AlertaReducer from "./AlertaReducer";
import AlertaContext from "./AlertaContext";
import {
  MOSTRAR_ALERTA,
  OCULTAR_ALERTA
} from "../../types";

const AlertaState = props => {

  // State inicial
  const initialState = {
    alerta: null
  }

  const [ state, dispatch ] = useReducer( AlertaReducer, initialState );

  // Funciones
  const MostrarAlerta = ( msg, categoria ) => {
    dispatch( {
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria
      }
    } );

    // Oculta la alerta después de x tiempo
    setTimeout( () => {
      dispatch( {
        type: OCULTAR_ALERTA
      } )
    }, 5000 );

  }

  return (
    <AlertaContext.Provider
      value={ {
        // ¿ States
        alerta: state.alerta,
        // ¿ Funciones
        MostrarAlerta
      } }
    >
      { props.children }
    </AlertaContext.Provider>
  )

}

export default AlertaState;