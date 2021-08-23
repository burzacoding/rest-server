const { Router } = require("express");
const { uploadFile } = require("../controllers/files.controller");

const router = Router();

router.post('/', uploadFile)

module.exports = router