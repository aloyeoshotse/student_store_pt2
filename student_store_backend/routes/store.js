const express = require("express")
const Store = require("../models/store")
const router = express.Router()

router.get('/', async (req,res,next) => {
    try {
        let productList = await Store.listProducts();
        res.status(200).json({
            products : productList
        })
    }
    catch(err) {
        next(err)
    }
})

module.exports = router;