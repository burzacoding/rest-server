const allowedCollections = ["products", "users", "categories"];
const isAllowedCollectionMiddleware = (req, res, next, collections = allowedCollections) => {
  const { coleccion } = req.params;
  if (!collections.includes(coleccion)) {
    return res
      .status(400)
      .json({ message: "Colección no permitida.", collections });
  }
  next();
};

module.exports = {
  isAllowedCollectionMiddleware,
};
