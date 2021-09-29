/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import { useContext } from "react";
import Layout from "components/Layout";
import clienteAxios from "config/axios";
import { useState } from "react";
import AppContext from "context/app/appContext";
import Alerta from "components/Alerta";

/*
  ° Los props son la respuesta que se obtiene
  ° En este caso pueden ser el nombre, la url, etc
*/
export async function getServerSideProps( { params } ) {
  const { enlace } = params;
  // console.log( enlace );
  const resultado = await clienteAxios.get( `/api/enlaces/${ enlace }` );
  console.log( resultado );

  return {
    props: {
      enlace: resultado.data
    }
  }
}

/*
  ° Se refiere al routing
  ° En este caso se refiere a las url's
  ° este método accede al de arriba
*/
export async function getServerSidePaths() {
  const enlaces = await clienteAxios.get( '/api/enlaces' );
  return {
    paths: enlaces.data.enlaces.map( enlace => ( {
      params: {
        enlace: enlace.url,
        nombre: enlace.nombre
      }
    } ) ),
    // Si está como true, si alguien entra a una página inexistente continua y carga una página,
    // Si está como false, muestra una página 404
    fallback: false
  }
}

// ¬ Función principal

export default function Enlace( { enlace } ) {
  // console.log( enlace.archivo );

  // Context de app
  const appContext = useContext( AppContext );
  const { mensaje_archivo, mostrarAlerta } = appContext;

  const [ tienePassword, setTienePassword ] = useState( enlace.password );
  const [ password, setPassword ] = useState( '' );
  const [ link, setLink ] = useState( enlace.archivo );

  const verificarPassword = async e => {
    e.preventDefault();

    const data = {
      password
    }

    try {
      const resultado = await clienteAxios.post( `/api/enlaces/${ enlace.enlace }`, data );
      enlace.archivo = resultado.data.archivo
      setTienePassword( resultado.data.password );
      setLink( resultado.data.archivo );
    } catch ( error ) {
      mostrarAlerta( error.response.data.msg );
    }


  }


  return (
    <Layout>
      { tienePassword ? (
        <>
          <p className="text-center">Este archivo está protegido con un password.</p>
          { mensaje_archivo && <Alerta /> }
          <div className="flex justify-center mt-5">
            <div className="max-w-lg w-full">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={ e => verificarPassword( e ) }
              >
                <div className="mb-4">
                  <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Ingresa el password del enlace"
                    value={ password }
                    onChange={ e => setPassword( e.target.value ) }
                  />
                </div>
                <input type="submit" value="Validar Password" className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold" />
              </form>
            </div>
          </div>
        </>
      )
        :
        (
          <>
            <h1
              className="text-4xl text-center text-gray-700"
            >
              Descarga tu archivo:
            </h1>
            <div
              className="flex items-center justify-center mt-10"
            >
              <a
                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                href={ `${ process.env.backendURL }/api/archivos/${ link }` }
              >Aquí</a>
            </div >
          </>
        )
      }
    </Layout >
  )
}