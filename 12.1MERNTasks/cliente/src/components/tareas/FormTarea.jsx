import { useContext, useState, useEffect } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";
import TareaContext from "../../context/tareas/TareaContext";

const FormTarea = () => {

  // Extraer si un proyecto está activo
  const proyectosContext = useContext( ProyectoContext );
  const { proyecto } = proyectosContext;

  // Obtener la funcion del context de tarea
  const tareasContext = useContext( TareaContext );
  const { tareaSeleccionada, errorTarea, obtenerTareas, agregarTarea, validarTarea, actualizarTarea, limpiarTarea } = tareasContext;

  // Effect que detecta si hay una tarea seleccionada
  useEffect( () => {

    if ( tareaSeleccionada !== null ) {
      setTarea( tareaSeleccionada );
    } else {
      setTarea( {
        nombre: ''
      } )
    }

  }, [ tareaSeleccionada ] )

  // State del formulario
  const [ tarea, setTarea ] = useState( {
    nombre: ''
  } )

  // Extraer el nombre del proyecto
  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if ( !proyecto ) {
    return null
  }

  // Array destructuring para extraer el proyecto actual
  const [ proyectoActual ] = proyecto;

  // Leer los valores del formulario
  const handleChange = e => {
    setTarea( {
      ...tarea,
      [ e.target.name ]: e.target.value
    } )
  }

  const onSubmit = e => {
    e.preventDefault();

    // Validar
    if ( nombre.trim() === '' ) {
      validarTarea();
      return;
    }

    // Si es edición o si es nueva tarea
    if ( tareaSeleccionada === null ) {
      // Agregar la tarea nueva al state de tareas, se iguala el id y se pasan las tareas en false
      tarea.proyecto = proyectoActual._id;
      agregarTarea( tarea );
    } else {
      // Actualizar tarea existente
      actualizarTarea( tarea );

      // Elimina tareaSeleccionara del state
      limpiarTarea();

    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas( proyectoActual.id );

    // Reiniciar el Form
    setTarea( {
      nombre: ''
    } )

  }

  return (
    <div className="formulario">
      <form
        onSubmit={ onSubmit }
      >

        <div className="contenedor-input">
          <input
            type="text"
            name="nombre"
            id=""
            className="input-text"
            placeholder="Nombre Tarea..."
            value={ nombre }
            onChange={ handleChange }
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            value={ tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea' }
            className="btn btn-primario btn-submit btn-block"
          />
        </div>

      </form>

      { errorTarea ?
        <p className="mensaje error">
          El nombre de la tarea es obligatorio
        </p>
        :
        null
      }

    </div>
  );
}

export default FormTarea;