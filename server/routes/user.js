const express = require('express')
const router = express.Router()

router.get('/:userID', (req, res) => {
    res.send(`User ID: ${req.params.userID}`)
})

module.exports = router