const express = require('express');
const router = express.Router();
const { login, register, current } = require("../controllers/admin");
const { stuffAuth } = require('../middleware/stuffAuth');

router.post("/login", login);
router.post("/register", register);
router.get("/current", stuffAuth, current);

module.exports = router;