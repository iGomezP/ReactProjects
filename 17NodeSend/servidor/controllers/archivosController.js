// Subida de archivos
const multer = require( 'multer' );
const { nanoid } = require( 'nanoid' );
// FileSystem, permite crear o eliminar archivos locales
const fs = require( 'fs' );
const Enlaces = require( '../models/Enlace' );

exports.subirArchivo = async ( req, res, next ) => {

  // Se definen los límites de tamaño para los archivos
  // Usuario no logueado
  const file1Mb = 1024 * 1024;
  // Usuario logueado
  const file10Mb = 1024 * 1024 * 10;

  const configMulter = {
    // ¬ Limite de 1Mb, si el usuario está autenticado 10Mb
    limits: { fileSize: req.usuario ? file10Mb : file1Mb },
    // ¬ Se le indica en dónde se va a almacenar el archivo
    storage: fileStorage = multer.diskStorage( {
      destination: ( req, file, cb ) => {
        // Ruta de guardado
        cb( null, __dirname + '/../uploads' )
      },
      filename: ( req, file, cb ) => {
        // Se extrae el tipo de archivo y se separa la extensión desde el mimetype (puede devolver extensiones erroneas)
        // const extension = file.mimetype.split( '/' )[ 1 ];
        // Para obtener la extensión desde el nombre original usando substring para cortar la última parte
        const extension = file.originalname.substring( file.originalname.lastIndexOf( '.' ), file.originalname.length );
        // Se genera un nombre de archivo aleatorio y se une a la extensión extraida arriba
        cb( null, `${ nanoid( 10 ) }${ extension }` );
      }
      // ° Fragmento para no aceptar ciertos tipos de archivo
      // fileFilter: ( req, file, bd ) => {
      //   if ( file.mimetype === "application/pdf" ) {
      //     return cb( null, true );
      //   }
      // }
    } )
  };

  // Se llama a la subida del archivo pasando la configuración de arriba
  // Este recibe un solo archivo
  const upload = multer( configMulter ).single( 'archivo' );

  // Se manda a llamar a la función que sube el archivo
  upload( req, res, async ( error ) => {
    // console.log( req.file );

    if ( !error ) {
      res.json( { archivo: req.file.filename } );
    } else {
      console.log( `Hubo un error al subir el archivo => ${ error }` )
      return next();
    }
  } );
}

exports.eliminarArchivo = async ( req, res, next ) => {
  // console.log( req.archivo );

  // Eliminar el archivo local
  try {
    // Elimina de forma permanente un archivo local
    fs.unlinkSync( __dirname + `/../uploads/${ req.archivo }` );
    console.log( `Archivo eliminado.` );
  } catch ( error ) {
    console.log( `Hubo un error el eliminar el archivo => ${ error }` );
    return next();
  }
}

// Descarga el archivo
exports.descargarArchivo = async ( req, res, next ) => {

  // Obtiene el enlace
  const { archivo } = req.params;
  const enlace = await Enlaces.findOne( { nombre: archivo } );

  const bajarArchivo = __dirname + '/../uploads/' + archivo;

  res.download( bajarArchivo );

  // Eliminar el archivo y la entrada en la base de datos
  // Extraer el # de descargas del enlace
  const { descargas, nombre, _id } = enlace;
  if ( descargas === 1 ) {
    // Si las descargas son = 1 - Borrar el registro y el archivo
    // console.log( `Si, solo hay ${ descargas } descarga.` );

    // Eliminar el archivo
    req.archivo = nombre;

    // Eliminar el registro en la DB
    await Enlaces.findByIdAndDelete( enlace._id );

    // Pasando al siguiente middleware ( archivosController )
    next();
  } else {
    // Si las descargas son > 1 - Restar 1 al contador de descargas
    // console.log( `Descargas totales => ${ descargas }.` );
    // console.log( `Descargando...` );
    enlace.descargas--;
    await enlace.save();
    // console.log( `Quedan ${ enlace.descargas } descargas.` );
  }
}