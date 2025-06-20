const express = require('express');
const router = express.Router();
const { add, edit, remove, all, storedItems } = require("../controllers/storage");
const { stuffAuth } = require('../middleware/stuffAuth');
const { isAdmin } = require('../middleware/isAdmin');


router.get("/", stuffAuth, all);
router.get("/:id", stuffAuth, storedItems);
router.post("/add", stuffAuth, add);
router.post("/remove/:id", stuffAuth, remove);
router.put("/edit/:id", stuffAuth, edit);

module.exports = router;
