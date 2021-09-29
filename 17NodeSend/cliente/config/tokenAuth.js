import clienteAxios from "./axios";

// Asigna el header con el token, luego regresa a authState para continuar con la verificación
const TokenAuth = token => {

  if ( token ) {
    // Si el token existe, se asigna al header
    clienteAxios.defaults.headers.common[ 'Authorization' ] = `Bearer ${ token }`;
  } else {
    // Si no existe, se elimina para que vaya en blanco
    delete clienteAxios.defaults.headers.common[ 'Authorization' ];
  }
};

export default TokenAuth;