// ? Componentes
/*
    °useCallback se usa cuando la aplicación contiene muchas llamadas a la misma función, mejora el rendimiento
    ° En este caso, Dropzone utiliza muchos llamados para subir los archivos
*/
import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import AppContext from "context/app/appContext";
import AuthContext from "context/auth/authContext";
import Formulario from "./Formulario";

const DropzoneComp = () => {

  // Se definen los límites de tamaño para los archivos
  // Usuario no logueado
  const file1Mb = 1024 * 1024;
  // Usuario logueado
  const file10Mb = 1024 * 1024 * 10;

  // Context de app
  const appContext = useContext( AppContext );
  const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = appContext;

  // Context de Auth
  const authContext = useContext( AuthContext );
  const { usuario, autenticado } = authContext;

  const onDropRejected = () => {
    if ( autenticado ) {
      mostrarAlerta( 'El límite de archivo sin ser usuario registrado es de 10 MB.' );
    } else {
      mostrarAlerta( 'El límite de archivo sin ser usuario registrado es de 1 MB.' );
    }
  };

  const onDropAccepted = useCallback( async ( acceptedFiles ) => {
    // console.log( acceptedFiles );

    // Crear un Form-data
    const formData = new FormData();
    formData.append( 'archivo', acceptedFiles[ 0 ] );

    // Subir archivo
    subirArchivo( formData, acceptedFiles[ 0 ].path );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );


  // Extraer contenido de Dropzone
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone( { onDropAccepted, onDropRejected, maxSize: file1Mb } );

  const archivos = acceptedFiles.map( archivo => (
    <li
      key={ archivo.lastModified }
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{ archivo.path }</p>
      <p className="text-sm text-gray-500 text-center">{ ( archivo.size / Math.pow( 1024, 2 ) ).toFixed( 2 ) } MB</p>
    </li>
  ) );

  return (
    <div
      className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">

      {/* Si no hay archivos, se muestra la pantalla para subir archivos, si hay archivos, se muestran los archivos subidos */ }
      { acceptedFiles.length > 0 ?
        (
          <div className="mt-10 w-full">
            <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
            <ul>
              { archivos }
            </ul>

            { autenticado ? <Formulario /> : null }

            { cargando ?
              <p
                className="my-10 text-center text-gray-600"
              >Subiendo Archivo...</p>
              :
              ( <button
                type="button"
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                onClick={ () => crearEnlace() }
              >
                Crear Enlace
              </button> )
            }

          </div>
        ) :
        (

          <div { ...getRootProps( { className: 'dropzone w-full py-32' } ) }>

            <input className="h-100" { ...getInputProps() } />

            { isDragActive ?
              <p className="text-2xl text-center text-gray-800">Suelta el archivo aquí</p>
              :
              <div className="text-center">
                <p className=" text-2xl text-center text-gray-600">Arrastrar y soltar archivos o hacer clic para seleccionar</p>
                <button
                  type="button"
                  className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">
                  Seleccionar archivos para subir
                </button>
              </div>
            }

          </div>
        )
      }
    </div >
  );
}

export default DropzoneComp;