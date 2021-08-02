import { Fragment, useState, useContext } from "react";
import ProyectoContext from "../../context/proyectos/ProyectoContext";

const NuevoProyecto = () => {

  // Obtener el state del formulario
  const proyectosContext = useContext( ProyectoContext );
  const {
    // ¿ States
    formulario,
    errorFormulario,
    // ¿ Funciones
    mostrarFormulario,
    agregarProyecto,
    mostrarError
  } = proyectosContext;

  // State para proyecto
  const [ proyecto, setProyecto ] = useState( {
    nombre: ''
  } );


  // Lee los contenidos del input
  const onChangeProyecto = e => {
    setProyecto( {
      ...proyecto,
      [ e.target.name ]: e.target.value
    } );
  }

  // Extraer nombre de proyecto
  const { nombre } = proyecto;

  // Cuando el usuario envía un proyecto
  const onSubmitProyecto = e => {
    e.preventDefault();

    // Validar proyecto
    if ( nombre === '' ) {
      mostrarError();
      return;
    }


    // Agregar al state
    agregarProyecto( proyecto );


    // Reiniciar el form
    setProyecto( {
      nombre: ''
    } );

  }

  // Mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  }


  return (
    <Fragment>

      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={ onClickFormulario }
      >
        Nuevo Proyecto
      </button>

      {/* Si formulario existe que se muestre, de lo contrario se oculta */ }
      {
        formulario ?
          ( <form
            className="formulario-nuevo-proyecto"
            onSubmit={ onSubmitProyecto }
          >
            <input
              type="text"
              name="nombre"
              id=""
              className="input-text"
              placeholder="Nombre del Proyecto"
              onChange={ onChangeProyecto }
              value={ nombre }

            />

            <input
              type="submit"
              value="Agregar Proyecto"
              className="btn btn-primario btn-block"
            />

          </form> )
          :
          null
      }

      {/* Revisa si el error del formulario es verdadero o falso */ }
      {
        errorFormulario ?
          <p className="mensaje error">
            El Nombre del Proyecto es Obligatorio
          </p>
          :
          null
      }

    </Fragment>
  );
}

export default NuevoProyecto;