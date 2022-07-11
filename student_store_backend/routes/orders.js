const express = require("express")
const Order = require("../models/orders")
const router = express.Router()

router.get('/', (req,res,next) => {
    try {
        let orderList = Order.listOrdersForUser;
        res.status(200).json({
            orders : orderList
        })
    }
    catch(err) {
       next(err)
    }
})

router.post('/', (req,res,next) => {
    try {
       //calls the CreateOrder method
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;