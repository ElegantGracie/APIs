const express = require("express");
const uploadFile = require("../utils/upload");
const { register, login, forgotPassword, resetPassword } = require("../controllers/auth");

const router = express.Router();

router.post("/signup", uploadFile.single("photo"), register);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.patch("/reset-password", resetPassword);

module.exports = router;