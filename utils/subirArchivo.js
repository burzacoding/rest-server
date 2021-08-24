const path = require('path')


const subirArchivo = (archivo, coleccion, id) => {
  return new Promise((resolve, reject) => {
    const pathToUpload = path.join(
      __dirname,
      '../uploads',
      coleccion,
      id
    );
    const filePath = path.join(pathToUpload, "resourceMainImg." + archivo.extension);
    archivo.mv(filePath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(filePath);
    });
  })
};

module.exports = {
  subirArchivo
}
