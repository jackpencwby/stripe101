const db = require("../config/database");

async function getOrder(req, res) {
    try {
        const order_id = req.params.id;

        const [order] = await db.query("SELECT * FROM orders WHERE order_id = ?", order_id);

        res.status(200).json(order[0]);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = getOrder;