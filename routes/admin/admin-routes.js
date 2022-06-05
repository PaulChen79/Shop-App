const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/products', adminController.getProductsPage)

module.exports = router