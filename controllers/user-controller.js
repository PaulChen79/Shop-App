const { User } = require('../models')

const userController = {
  getLoginPage: (req, res, next) => {
    try {
      res.render('login')
    } catch (error) {
      next(error)
    }
  },
  getRegisterPage: (req, res, next) => {
    try {
      res.render('register')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
