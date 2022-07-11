const db = require('../config');

class Order {

    static async listOrdersForUser() {
        //returns all orders that the authenticated user has created
    }

    static async createOrder(order) {
        //takes the user's order and stores it in the database
    }

}

module.exports = Order;