const allowedExtensions = ["png", "jpg", "jpeg"];

const isAllowedExtensionMiddleware = (req, res, next, extensions = allowedExtensions) => {
  const archivo = req.files.archivo;
  if (!extensions.includes(archivo.extension)) {
    return res.status(400).json({
      message: 'Extensión "' + archivo.extension + '" no se permite.',
    });
  }
  next();
};

module.exports = {
  isAllowedExtensionMiddleware,
};
