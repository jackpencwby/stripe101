const express = require("express");
const router = express.Router();
const checkout = require("../controllers/checkout");

// http://localhost:8000/api/checkout
router.post("/", express.json(), checkout);

module.exports = router;