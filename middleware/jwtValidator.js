const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req, res, next) => {
  const token = req.header("x-jwt-token");
  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      const usuario = await User.findById(payload.uid);
      if (!usuario) {
        return res
          .status(400)
          .send("El usuario no existe");
      }
      if (!usuario.active) {
        return res
          .status(401)
          .send("Error 401 Unauthorized... el usuario no esta habilitado");
      }
      res.locals.user = usuario;
      next();
    } catch (error) {
      return res
        .status(401)
        .send("Error 401 Unauthorized... el token no es valido");
    }
  } else {
    return res.status(401).send("Error 401 Unauthorized... el token no existe");
  }
};

module.exports = {
  validateJWT
};
