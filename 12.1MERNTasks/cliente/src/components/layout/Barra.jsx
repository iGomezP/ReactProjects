import { useContext, useEffect } from "react";
import AuthContext from "../../context/autenticacion/AuthContext";

const Barra = () => {

  // Extraer la información de autenticación
  const authContext = useContext( AuthContext );
  const { usuario, UsuarioAutenticado, CerrarSesion } = authContext;

  useEffect( () => {
    UsuarioAutenticado();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <header className="app-header">
      {
        usuario ?
          <p className="nombre-usuario">
            Hola <span>{ usuario.nombre }</span>
          </p>
          :
          null
      }
      <nav className="nav-principal">
        <button
          className="btn btn-blank btn-primario cerrar-sesion"
          onClick={ () => CerrarSesion() }
        >
          Cerrar Sesión
        </button>
      </nav>
    </header>
  );
}

export default Barra;