const express = require("express");
const uploadFile = require("../utils/upload");
const { register, login } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", uploadFile.single("photo"), register);

router.post("/login", login);

module.exports = router;