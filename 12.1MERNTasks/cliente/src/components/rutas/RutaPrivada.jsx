/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autenticacion/AuthContext";

//  Higher Order Component
// ° Este es un componente que contiene otro componente dentro de él, recibe un componente y los props del mismo
// ° Su función es tomar autenticado para saber si el usuario está autenticado o no
// ! Si no está autenticado, se le redirecciona a la página principal
// ¿ Si está autenticado, se le envía al componente que lo está mandando a llamar con una copia de los props
const RutaPrivada = ( { component: Component, ...props } ) => {

  const authContext = useContext( AuthContext );
  const { autenticado, cargando, UsuarioAutenticado } = authContext;

  useEffect( () => {
    UsuarioAutenticado();

  }, [] )

  return (
    <Route
      { ...props }
      render={ props => !autenticado && !cargando ?
        (
          <Redirect to="/" />
        )
        :
        (
          <Component { ...props } />
        ) }
    />
  );
}

export default RutaPrivada;