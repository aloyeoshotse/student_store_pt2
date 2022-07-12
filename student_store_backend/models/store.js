const db = require('../db');

class Store {
    
    static async listProducts() {
        //run a SQL query that searches the database for all products and returns a list of them
        const results = await db.query(
            `
             SELECT * FROM products;
            `
        );
        console.log("results: ", results.rows)
        return results.rows


        // const results = await db.query(
        //     `
        //      SELECT orders.id AS "orderId",
        //             orders.customer_id AS "customerId",
        //             order_details.quantity AS "quantity",
        //             products.name AS "name",
        //             products.price AS "price"
        //      FROM orders
        //      JOIN order_details ON orders.id = order_details.order_id
        //      JOIN products ON products.id = order_details.product_id
        //      WHERE customer_id = (SELECT id FROM users WHERE email = $1);
        //     `, [user.email]
        // )
      
        // return results.rows
    }
}



module.exports = Store