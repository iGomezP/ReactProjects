import { useReducer } from "react";
import TareaContext from "./TareaContext";
import TareaReducer from "./TareaReducer";
import clienteAxios from "../../config/axios";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  // ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA

} from "../../types";

const TareaState = props => {
  const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null
  }

  // Crear dispatch y state
  const [ state, dispatch ] = useReducer( TareaReducer, initialState );

  // Crear las funciones


  // Obtener las tareas de un proyecto
  const obtenerTareas = async proyecto => {

    try {
      // Cuando se usa params en el cliente, en el servidor debe usarse req.query en lugar de req.body
      const resultado = await clienteAxios.get( '/api/tareas', { params: { proyecto } } );
      // console.log( resultado.data.tareas );

      dispatch( {
        type: TAREAS_PROYECTO,
        payload: resultado.data.tareas
      } );

    } catch ( error ) {
      console.log( error );
    }

  }

  // Agregar una tarea al proyecto seleccionado
  const agregarTarea = async tarea => {

    const resultado = await clienteAxios.post( '/api/tareas', tarea );
    console.log( resultado );

    try {

      dispatch( {
        type: AGREGAR_TAREA,
        payload: tarea
      } );

    } catch ( error ) {
      console.log( error );
    }

  }

  // Valida y muestra un error en caso de que sea necesario
  const validarTarea = () => {
    dispatch( {
      type: VALIDAR_TAREA
    } )
  }

  // Eliminar tarea por id
  const eliminarTarea = async ( id, proyecto ) => {

    try {

      await clienteAxios.delete( `/api/tareas/${ id }`, { params: { proyecto } } );

      dispatch( {
        type: ELIMINAR_TAREA,
        payload: id
      } )

    } catch ( error ) {
      console.log( error );
    }

  }

  // Cambia el estado de cada tarea
  // const cambiarEstadoTarea = tarea => {
  //   dispatch( {
  //     type: ESTADO_TAREA,
  //     payload: tarea
  //   } )
  // }

  // Edita o modifica una tarea
  const actualizarTarea = async tarea => {

    try {

      const resultado = await clienteAxios.put( `/api/tareas/${ tarea._id }`, tarea );
      // console.log( resultado.data.tareaExiste );

      dispatch( {
        type: ACTUALIZAR_TAREA,
        payload: resultado.data.tareaExiste
      } )

    } catch ( error ) {
      console.log( error );
    }

  }


  // Extrae la tarea para edición
  const guardarTareaActual = tarea => {
    dispatch( {
      type: TAREA_ACTUAL,
      payload: tarea
    } )
  }


  // Elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch( {
      type: LIMPIAR_TAREA
    } )
  }

  return (
    <TareaContext.Provider
      value={ {

        // ¿ States
        tareasProyecto: state.tareasProyecto,
        errorTarea: state.errorTarea,
        tareaSeleccionada: state.tareaSeleccionada,

        // ¿ Funciones
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        // cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea

      } }
    >
      { props.children }
    </TareaContext.Provider>
  )

}

export default TareaState;