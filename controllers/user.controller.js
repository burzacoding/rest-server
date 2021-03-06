const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { getStagedData } = require("../middleware/userValidator");

const getUsers = async (req, res) => {
  let { limit = 100, page = 0 } = req.query;
  const usuarios = User.find({ active: true })
    .skip(Number(page * limit))
    .limit(Number(limit));
  const total = User.countDocuments({ active: true });
  const resp = await Promise.all([usuarios, total]);
  res.status(200).json({
    results: resp[0],
    total: resp[1],
    limit,
    page,
  });
};

const getUserByParamsID = (req, res) => {};

const addUser = async (req, res) => {
  // Solo agarrar campos necesarios, ignoramos la basura
  const { name, email, password, img = "none" } = res.locals.stagedUser;
  
  // Verificar si el correo existe
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400).json({
      code: "error/email-not-unique",
      message: "Este email ya esta registrado.",
    });
    return;
  }
  // Encriptación de contraseña
  const salt = bcryptjs.genSaltSync();
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const sanitizedUser = {
    name,
    email,
    password: hashedPassword,
    img,
  };
  const newUser = new User(sanitizedUser);
  // Se guarda en la DB
  await newUser.save();
  res.status(201).json({
    ok: true,
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = {
  getUsers,
  getUserByParamsID,
  addUser,
};
