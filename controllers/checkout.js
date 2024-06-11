require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require("uuid");
const db = require("../config/database");

async function checkout(req, res) {
    try {
        const { user, product } = req.body;

        const order_id = uuidv4();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "thb",
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: product.quantity,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5000/success.html?order_id=${order_id}`,
            cancel_url: `http://localhost:5000/cancel.html?order_id=${order_id}`,
        });

        const order = {
            fullname: user.fullname,
            address: user.address,
            order_id,
            session_id: session.id,
            status: session.status
        }

        await db.query("INSERT INTO orders SET ?", order);

        res.status(200).json({
            message: "Checkout Successfully",
            session_id: session.id
        });

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = checkout;