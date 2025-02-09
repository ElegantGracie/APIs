const { createRelationship } = require("../controllers/relationship");
const verifyToken = require("../utils/verification");
const router = require("express").Router();

router.post("/create", verifyToken, createRelationship);

module.exports = router;