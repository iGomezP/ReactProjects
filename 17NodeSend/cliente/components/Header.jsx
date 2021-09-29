// ? Componentes
import { Fragment, useContext, useEffect } from 'react';
import AuthContext from 'context/auth/authContext';
import AppContext from 'context/app/appContext';
// ~ Componentes de Next
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// | Recursos
import logo from '../public/logo.svg';

const Header = () => {

  // Routing programado
  const router = useRouter();

  // Extraer el usuario autenticado del storage
  const authContext = useContext( AuthContext );
  const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

  // Extraer el context de la aplicación
  const appContext = useContext( AppContext );
  const { reiniciarState } = appContext;

  // Se ejecuta cuando carga el componente 1 sola vez (sin dependencias)
  useEffect( () => {

    usuarioAutenticado();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  const redireccionar = () => {
    router.push( '/' );
    reiniciarState();
  }

  return (

    <header className="py-8 flex flex-col md:flex-row items-center justify-between">

      <div className="w-64 mb-8 md:mb-0 cursor-pointer">
        <Link href="/" passHref>
          <a>
            <Image src={ logo } alt="LogoNodeSend" onClick={ () => redireccionar() } />
          </a>
        </Link>
      </div>

      <div>
        { usuario ? (
          <div className="flex items-center">
            <p className="mr-2">¡Hola { usuario.nombre }!</p>
            <button
              type="button"
              className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
              onClick={ () => cerrarSesion() }
            >
              Cerrar Sesión
            </button>
          </div>
        )
          :
          (
            <Fragment>
              <Link
                href="/login"
                passHref
              >
                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar Sesión</a>
              </Link>
              <Link
                href="/crearCuenta"
                passHref
              >
                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear Cuenta</a>
              </Link>
            </Fragment>
          ) }
      </div>
    </header>

  );
}

export default Header;

// ° Apuntes de Tailwind.css
// py-8: Padding arriba y abajo de 8
// flex-col: display flex en columnas
// md: <== forma en que Tailwind maneja los media queries para tamaño mediano
// flex-row: display flex en filas