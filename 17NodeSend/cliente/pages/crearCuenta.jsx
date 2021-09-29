// ? Componentes
import { useContext, useEffect } from "react";
import AuthContext from "context/auth/authContext";
import Layout from "components/Layout";
import Alerta from "components/Alerta";
// Para Validación de formulario
import { useFormik } from "formik";
import * as Yup from 'yup';

const CrearCuenta = () => {

  // Acceder al state del Reducer
  const authContext = useContext( AuthContext );
  const { registrarUsuario, mensaje } = authContext;

  // Formulario y validación con Formik y Yup
  const formik = useFormik( {
    initialValues: {
      nombre: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object( {
      nombre:
        Yup.string()
          .required( 'El nombre es obligatorio.' ),
      email:
        Yup.string()
          .email( 'El Email no es válido.' )
          .required( 'El Email es obligatorio.' ),
      password:
        Yup.string()
          .required( 'El password no puede ir vacío.' )
          .min( 8, 'El password debe tener al menos 8 caracteres.' )
    } ),
    onSubmit: valores => {
      registrarUsuario( valores );
    }

  } );


  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center">
          Crear Cuenta
        </h2>

        { mensaje && <Alerta /> }

        <div className="flex justify-center mt-5">
          <div className="max-w-lg w-full">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={ formik.handleSubmit }
            >

              <div className="mb-4">
                <label htmlFor="nombre" className="block text-black text-sm font-bold mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Nombre de Usuario"
                  value={ formik.values.nombre }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                {/* Muestra los errores de validación del campo nombre */ }
                { formik.touched.nombre && formik.errors.nombre ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{ formik.errors.nombre }</p>
                  </div>
                ) : null }
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-black text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email de Usuario"
                  value={ formik.values.email }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                { formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{ formik.errors.email }</p>
                  </div>
                ) : null }
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-black text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password de Usuario"
                  value={ formik.values.password }
                  onChange={ formik.handleChange }
                  onBlur={ formik.handleBlur }
                />
                { formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{ formik.errors.password }</p>
                  </div>
                ) : null }
              </div>

              <input type="submit" value="Crear Cuenta" className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold" />

            </form>
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default CrearCuenta;