const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/database");
const checkoutRouter = require("./routes/checkout");
const orderRouter = require("./routes/order");
const StripeWebhookRouter = require("./routes/StripeWebhook");

const port = 8000;

app.use(cors());

app.use("/api/checkout", checkoutRouter);
app.use("/webhook", StripeWebhookRouter);
app.use("/api/order", orderRouter);

app.listen(port, async () => {
    try {
        await db.getConnection();
        console.log(`Listening at http://localhost:${port}`);
    }
    catch (err) {
        console.log(err);
    }
})