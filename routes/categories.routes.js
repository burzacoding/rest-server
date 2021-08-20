const { Router } = require("express");
const {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { isAdminMiddleware } = require("../middleware/isAdmin");
const { validateJWT } = require("../middleware/jwtValidator");

const router = Router();

// PUBLIC API

router.get("/", getCategories);

router.get("/:id", getSingleCategory);

// PRIVATE API

router.post("/", [validateJWT, isAdminMiddleware], createCategory);

router.put("/:id", [validateJWT, isAdminMiddleware], updateCategory);

router.delete("/:id", [validateJWT, isAdminMiddleware], deleteCategory);

module.exports = router;
