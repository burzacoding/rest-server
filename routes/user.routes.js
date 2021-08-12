const { Router } = require("express");

const UserController = require("../controllers/user.controller")

const router = Router();



router.get("/users", UserController.getUsers);

router.get("/users/:id", UserController.getUserByParamsID);

router.post("/users", UserController.addUser);

module.exports = router;
