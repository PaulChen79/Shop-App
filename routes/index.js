const express = require('express')
const router = express.Router()
const { errorHandler } = require('../middleware/error-handler')
const adminRoutes = require('./admin/admin-routes')
const userController = require('../controllers/user-controller')

router.use('/admin', adminRoutes)

router.get('/login', userController.getLoginPage)
router.get('/register', userController.getRegisterPage)

router.use('/', errorHandler)

module.exports = router
