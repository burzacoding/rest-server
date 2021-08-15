const { Router } = require("express");

const {
  getUsers,
  getUserByParamsID,
  addUser,
} = require("../controllers/user.controller");
const { userApiValidatorMiddleware } = require("../middleware/userValidator");

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUserByParamsID);

router.post("/users", userApiValidatorMiddleware, addUser);

module.exports = router;
