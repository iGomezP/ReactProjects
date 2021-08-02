import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/AlertaContext";
import AuthContext from "../../context/autenticacion/AuthContext";


const Login = ( props ) => {

  // Extraer los valores de AlertaContext
  const alertaContext = useContext( AlertaContext );
  const { alerta, MostrarAlerta } = alertaContext;

  // Extraer los valores de AuthContext
  const authContext = useContext( AuthContext );
  const { mensaje, autenticado, IniciarSesion } = authContext;

  // En caso de que el password o el usuario no exista
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
    email: '',
    password: ''
  } );

  // Extraer de usuario
  const { email, password } = usuario;

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
    if ( email.trim() === '' ||
      password.trim() === '' ) {
      MostrarAlerta( 'Todos los campos son obligatorios', 'alerta-error' );
      return;
    }

    // Pasarlo al Action de Express
    IniciarSesion( { email, password } );

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
        <h1>Iniciar Sesión</h1>

        <form
          onSubmit={ onSubmit }
        >
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
              placeholder="Tu Password"
              value={ password }
              onChange={ onChange }
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              value="Iniciar Sesión"
              className="btn btn-primario btn-block"
            />
          </div>

        </form>

        <Link to={ '/nueva-cuenta' } className="enlace-cuenta">
          Crear Nueva Cuenta
        </Link>

      </div>
    </div>
  );
}

export default Login;