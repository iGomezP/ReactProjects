// ? Componentes
import { useContext, useEffect } from "react";
import Layout from "components/Layout";
import AuthContext from "context/auth/authContext";
import AppContext from "context/app/appContext";
import Link from "next/link";
import DropzoneComp from "components/Dropzone";
import Alerta from "components/Alerta";

const Index = () => {

  // Extraer el usuario autenticado del storage
  const authContext = useContext( AuthContext );
  const { usuarioAutenticado } = authContext;

  // Extraer el mensaje de error de archivos
  const appContext = useContext( AppContext );
  const { mensaje_archivo, url } = appContext;

  // Se ejecuta cuando carga el componente 1 sola vez (sin dependencias)
  useEffect( () => {

    const token = localStorage.getItem( 'rns_token' );
    if ( token ) {
      usuarioAutenticado();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )


  return (

    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">

        { url ? (
          <>
            <p
              className="text-center text-2xl mt-10"
            >
              <span className="font-bold text-red-700 text-3xl">Tu URL es: </span>
              { `${ process.env.frontendURL }/enlaces/${ url }` }
            </p>
            <button
              type="button"
              className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold mt-10"
              onClick={ () => navigator.clipboard.writeText( `${ process.env.frontendURL }/enlaces/${ url }` ) }
            >
              Copiar Enlace
            </button>
          </>
        ) :
          (
            <>
              { mensaje_archivo && <Alerta /> }

              <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">

                <DropzoneComp />

                <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                  <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                    Compartir archivos de forma sencilla y privada
                  </h2>
                  <p className="text-lg leading-loose">
                    <span className="text-red-500 font-bold"> ReactNoseSend</span> te permite compartir archivos con cifrado de extremo a extremo y un enlace que caduca automáticamente. Así puedes mantener en privado lo que compartes y asegurarte de que tus archivos no permanezcan en línea para siempre.
                  </p>
                  <Link href="/crearCuenta" passHref>
                    <a className="text-red-500 font-bold text-lg hover:text-red-700">Crea una cuenta para mayores beneficios.</a>
                  </Link>
                </div>
              </div>
            </>
          ) }

      </div>
    </Layout>

  );
}

export default Index;