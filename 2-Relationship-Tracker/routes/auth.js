const express = require("express");
const uploadFile = require("../utils/upload");
const { register } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", uploadFile.single("photo"), register);

module.exports = router;