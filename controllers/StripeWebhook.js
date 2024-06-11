require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const db = require("../config/database");

async function StripeWebhook(req, res) {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_ENDPOINT_SECRET);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;

            const result = await db.query("UPDATE orders SET status = ? WHERE session_id = ?", 
                [checkoutSessionCompleted.status, checkoutSessionCompleted.id]
            )

            console.log(result);

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
}

module.exports = StripeWebhook;