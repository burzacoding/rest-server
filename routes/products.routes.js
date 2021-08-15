const { Router } = require("express");
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

const router = Router();

router.get("/all", getProducts);

router.get("/one/:id", getSingleProduct);

router.post("/add", createProduct);

router.put("/one/:id", updateProduct);

router.delete("/one/:id", deleteProduct);

module.exports = router;
