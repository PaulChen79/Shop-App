const express = require('express')
const router = express.Router()
const { errorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')
const adminRoutes = require('./admin/admin-routes')
const userController = require('../controllers/user-controller')
const productController = require('../controllers/product-controller')
const { authenticatedAdmin } = require('../middleware/auth')

router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login)
router.post('/register', userController.register)
router.get('/logout', userController.logout)

router.use('/admin', authenticatedAdmin, adminRoutes)

router.get('/products', productController.getProducts)
router.get('/about', productController.getAboutPage)

router.use('/', (req, res) => {
  res.redirect('/products')
})
router.use('/', errorHandler)

module.exports = router
