const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/products', adminController.getProductsPage)
router.get('/products/:id', adminController.getProduct)
router.get('/products/:id/edit', adminController.getProductEditPage)
router.get('/categories', adminController.getCategoriesPage)
router.get('/users', adminController.getUsersPage)
router.patch('/users/:id', adminController.setAdmin)

module.exports = router
