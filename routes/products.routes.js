const { Router } = require("express");
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { isAdminMiddleware } = require("../middleware/isAdmin");
const { validateJWT } = require("../middleware/jwtValidator");

const router = Router();


// PUBLIC API

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

// PRIVATE API

router.post("/", [
  validateJWT,
  isAdminMiddleware
], createProduct);

router.put("/:id",[
  validateJWT,
  isAdminMiddleware
], updateProduct);

router.delete("/:id",[
  validateJWT,
  isAdminMiddleware
], deleteProduct);

module.exports = router;
