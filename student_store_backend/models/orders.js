const db = require('../db');
const { BadRequestError, NotFoundError } = require('../utils/errors')

class Order {

    static async listOrdersForUser(user) {
        //returns all orders that the authenticated user has created
        const results = await db.query(
            `
             SELECT orders.id AS "orderId",
                    orders.customer_id AS "customerId",
                    order_details.quantity AS "quantity",
                    products.name AS "name",
                    products.price AS "price"
             FROM orders
             JOIN order_details ON orders.id = order_details.order_id
             JOIN products ON products.id = order_details.product_id
             WHERE customer_id = (SELECT id FROM users WHERE email = $1);
            `, [user.email]
        )
      
        return results.rows
    }

    static async createOrder(user) {
        //takes the user's order and stores it in the database
        const userEmail = user.user.email
        const order = user.order
        // {1: 3, 2: 2, 3: 1}
        //format = {productId: quantity}

        const results = await db.query(
            `
             INSERT INTO orders (customer_id)
             VALUES ((SELECT id FROM users WHERE email = $1))
             RETURNING id;
            `, [userEmail]
        );

        const orderId = results.rows[0].id;

        Object.keys(order).forEach((productId) => {
            db.query(
                `
                 INSERT INTO order_details (order_id, product_id, quantity)
                 VALUES ($1, $2, $3)
                `, [orderId, productId, order[productId]]
            );
        })
    }

}

module.exports = Order;