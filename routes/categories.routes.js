const { Router } = require("express");
const {
  getCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

const router = Router();

router.get("/all", getCategories);

router.get("/one/:id", getSingleCategory);

router.post("/add", createCategory);

router.put("/one/:id", updateCategory);

router.delete("/one/:id", deleteCategory);

module.exports = router;
