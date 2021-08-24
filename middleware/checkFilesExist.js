const { getExtension } = require("../utils/helpers");

const checkFilesExists = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({
      message: "No se recibieron archivos.",
    });
  }
  const archivo = req.files.archivo;
  const archivoExtension = getExtension(archivo.name);
  archivo.extension = archivoExtension;
  next();
};

module.exports = { checkFilesExists };
