import { useState, useContext } from "react";
import AppContext from "context/app/appContext";

const Formulario = () => {

  const [ tienePassword, setTienePassword ] = useState( false );

  // Context de app
  const appContext = useContext( AppContext );
  const { passwordArchivo, numeroDescargas } = appContext;

  const obtenerDescargas = e => {
    const descargas = parseInt( e.target.value );
    numeroDescargas( descargas );
  }

  return (
    <div
      className="w-full mt-20"
    >
      <div>
        <label htmlFor="" className="text-lg text-gray-800">Eliminar tras:</label>
        <select
          className="appearance-none w-full bg-gray-100 mt-2 border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
          defaultValue=""
          onChange={ e => obtenerDescargas( e ) }
        >
          <option value="" disabled >-- Seleccione --</option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="text-lg text-gray-800 mr-2">Proteger con contraseña:</label>
          <input
            type="checkbox"
            // Al cambiar agrega lo contrario a lo que haya en el state
            onChange={ () => setTienePassword( !tienePassword ) }
          />
        </div>
        { tienePassword ?
          ( <input
            type="password"
            id="password"
            className="appearance-none w-full mt-2 bg-gray-100 border border-gray-400 text-black py-3 px-4 pr-8"
            placeholder="Contraseña"
            onChange={ e => passwordArchivo( e.target.value ) }
          /> )
          :
          null }
      </div>
    </div>
  );
}

export default Formulario;