const { User } = require('../models')

const userController = {
  getLoginPage: (req, res, next) => {
    try {
      res.render('login')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
