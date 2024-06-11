const express = require("express");
const router = express.Router();
const getOrder  = require("../controllers/order");

// http://localhost:8000/api/order/:id
router.get("/:id", getOrder);

module.exports = router;