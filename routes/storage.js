const express = require('express');
const router = express.Router();
const { add, edit, remove, all, currentItem } = require("../controllers/storage");
const { stuffAuth } = require('../middleware/stuffAuth');
// const { isAdmin } = require('../middleware/isAdmin');


router.get("/", stuffAuth, all);
router.get("/currentItem", stuffAuth, currentItem);
router.post("/add", stuffAuth, add);
router.delete("/remove", stuffAuth, remove);
router.put("/edit", stuffAuth, edit);

module.exports = router;
