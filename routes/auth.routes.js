const { Router } = require("express");

const { login, register } = require("../controllers/auth.controller");
const {
  checkGooglesigninMiddleware,
} = require("../middleware/checkGooglesignin");
const { isAdminMiddleware } = require("../middleware/isAdmin");
const { validateJWT } = require("../middleware/jwtValidator");
const { userAuthValidatorMiddleware } = require("../middleware/userValidator");
const User = require("../models/user");
const { googleVerify, generateToken } = require("../utils/helpers");

const router = Router();

router.post("/login", userAuthValidatorMiddleware, login);

router.post("/register", userAuthValidatorMiddleware, register);

router.get("/private", [validateJWT, isAdminMiddleware], (req, res) => {
  res.send("Entrado exitosamente al panel de admin");
});

router.post("/googlesignin", checkGooglesigninMiddleware, async (req, res) => {
  const token = res.locals.token;

  try {
    const { name, email, picture: img } = await googleVerify(token);

    let user = await User.findOne({ email });
    if (!user) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        img,
        password: ':P',
        google: true,
      }

      usuario = new User(data);
      await usuario.save();
    }

    if (!usuario.active) {
      return res.status(401).send({
        message: "User no longer exists"
      })
    }

    const tokenJwt = await generateToken(usuario.id)

    res.json({
      usuario,
      tokenJwt,
    });
  } catch (error) {
    res.status(400).json({
      error
    });
  }
});

module.exports = router;