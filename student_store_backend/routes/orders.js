const express = require("express")
const Order = require("../models/orders")
const { requireAuthenticatedUser } = require('../middleware/security')
const router = express.Router()

router.get('/', requireAuthenticatedUser, async (req,res,next) => {
    try {
        const user = res.locals.user
        let orderList = await Order.listOrdersForUser(user);
        return res.status(200).json({
            orders : orderList
        })
    }
    catch(err) {
       next(err)
    }
})

router.post('/', requireAuthenticatedUser, (req,res,next) => {
    try {
       //calls the CreateOrder method
       const user = res.locals.user
       let newOrder = Order.createOrder({user, order: req.body})
       return res.status(201).json({newOrder})
    }
    catch (err) {
        next(err)
    }
})

module.exports = router;