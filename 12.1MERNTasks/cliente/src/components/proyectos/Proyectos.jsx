import { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/autenticacion/AuthContext";

const Proyectos = () => {

  // Extraer la información de autenticación
  const authContext = useContext( AuthContext );
  const { UsuarioAutenticado } = authContext;

  useEffect( () => {
    UsuarioAutenticado();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  return (
    <div className="contenedor-app">

      <Sidebar />

      <div className="seccion-principal">

        <Barra />

        <main>

          <FormTarea />

          <div className="contenedor-tareas">

            <ListadoTareas />

          </div>

        </main>

      </div>

    </div>
  );
}

export default Proyectos;