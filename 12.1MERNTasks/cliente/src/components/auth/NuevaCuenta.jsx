import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/AlertaContext";
import AuthContext from "../../context/autenticacion/AuthContext";

const NuevaCuenta = ( props ) => {

  // Extraer los valores de AlertaContext
  const alertaContext = useContext( AlertaContext );
  const { alerta, MostrarAlerta } = alertaContext;

  // Extraer los valores de AuthContext
  const authContext = useContext( AuthContext );
  const { mensaje, autenticado, RegistrarUsuario } = authContext;

  // En caso de que le usuario se haya autenticado o registrado o sea un registro duplicado
  useEffect( () => {

    if ( autenticado ) {
      props.history.push( '/proyectos' );
    }

    if ( mensaje ) {
      MostrarAlerta( mensaje.msg, 'alerta-error' );
    }


    // eslint-disable-next-line
  }, [ mensaje, autenticado, props.history ] );

  // State para iniciar sesión
  const [ usuario, setUsuario ] = useState( {
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  } );

  // Extraer de usuario
  const { nombre, email, password, confirmar } = usuario;

  const onChange = e => {
    setUsuario( {
      ...usuario,
      [ e.target.name ]: e.target.value
    }
    )
  }

  // Cuando el usuario quiere iniciar sesión
  const onSubmit = e => {
    e.preventDefault();

    // Validar que no haya campos vacíos
    if ( nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmar.trim() === '' ) {
      MostrarAlerta( 'Todos los campos son obligatorios', 'alerta-error' );
      return;
    }

    // Password mínimo de 6 caracteres
    if ( password.length < 6 ) {
      MostrarAlerta( 'El password debe de ser de al menos 6 caracteres', 'alerta-error' );
      return;
    }

    // Revisar que los 2 passwords sean iguales
    if ( password !== confirmar ) {
      MostrarAlerta( 'Los passwords no son iguales', 'alerta-error' );
      return;
    }

    // Pasarlo al Action de Express
    RegistrarUsuario( {
      nombre, email, password
    } );
  }

  return (
    <div className="form-usuario">
      {
        alerta ?
          <div className={ `alerta ${ alerta.categoria }` }>
            { alerta.msg }
          </div>
          :
          null
      }
      <div className="contenedor-form sombra-dark">
        <h1>Crear Nueva Cuenta</h1>

        <form
          onSubmit={ onSubmit }
        >

          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu Nombre"
              value={ nombre }
              onChange={ onChange }
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={ email }
              onChange={ onChange }
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password (Min. 6 caracteres)"
              value={ password }
              onChange={ onChange }
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Repetir Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite Tu Password"
              value={ confirmar }
              onChange={ onChange }
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              value="Registrarme"
              className="btn btn-primario btn-block"
            />
          </div>

        </form>

        <Link to={ '/' } className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>

      </div>
    </div>
  );
}

export default NuevaCuenta;