const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/products', adminController.getProductsPage)
router.get('/categories', adminController.getCategoriesPage)
router.get('/users', adminController.getUsersPage)
router.patch('/users/:id', adminController.setAdmin)

module.exports = router
