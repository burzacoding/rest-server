const { Router } = require("express");
const { uploadFile } = require("../controllers/files.controller");
const {
  validateJWT,
  checkFilesExists,
  isAllowedCollectionMiddleware,
  isAllowedExtensionMiddleware,
} = require("../middleware");

const router = Router();

router.post(
  "/:coleccion/:id",
  [
    validateJWT,
    checkFilesExists,
    isAllowedCollectionMiddleware,
    isAllowedExtensionMiddleware,
  ],
  uploadFile
);

module.exports = router;
