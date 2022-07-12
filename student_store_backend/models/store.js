const db = require('../db');

class Store {
    
    static async listProducts() {
        //run a SQL query that searches the database for all products and returns a list of them
        const results = await db.query(
            `
             SELECT * FROM products;
            `
        );
       
        return results.rows
    }
}



module.exports = Store