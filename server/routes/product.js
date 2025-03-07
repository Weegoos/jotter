const express = require('express')
const router = express.Router()
const app = express()

router.get('/:productID/:productName/:productPrice', (req, res) => {
    res.send({
        id: req.params.productID,
        name: req.params.productName,
        price: req.params.productPrice
    })
})

module.exports = router