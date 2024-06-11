const express = require("express");
const router = express.Router();
const StripeWebhook = require("../controllers/StripeWebhook");

// http://localhost:8000/webhook
router.post("/", express.raw({ type: 'application/json' }), StripeWebhook);

module.exports = router;