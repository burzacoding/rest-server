const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../utils/helpers");

const login = async (req, res) => {
  const { email, password } = res.locals.stagedUser;

  // Verificar si el email existe
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      ok: false,
      errors: ["error/user-not-found"],
    });
    return;
  }

  // Verificar si el usuario esta activo (propiedad "active: boolean")
  if (!user.active) {
    res.status(400).json({
      ok: false,
      errors: ["error/user-not-active"],
    });
  }

  // Verificar si la contraseña es valida
  const isValidPassword = bcryptjs.compareSync(password, user.password);
  if (!isValidPassword) {
    res.status(400).json({
      ok: false,
      errors: ["error/invalid-password"],
    });
    return;
  }

  // Generar JWT

  const token = await generateToken( user.id );

  const userClean = {
    name: user.name,
    // role: user.role,
    // active: user.active,
    // email: user.email,
    // uid: user.id,
    img: user.img,
  }
  res.json({
    ...userClean,
    token
  });
};

const register = (req, res) => {
  res.json("Hola register!");
};

module.exports = {
  login,
  register,
};
