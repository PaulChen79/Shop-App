const { User } = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')

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
  },
  login: (req, res, next) => {
    try {
      req.flash('success_msg', 'Login Successfully')
      res.redirect('/products')
    } catch (error) {
      next(error)
    }
  },
  register: async (req, res, next) => {
    try {
      console.log(req.body)
      const { userName, email, password, passwordCheck } = req.body
      if (!userName || !email || !password) {
        req.flash('warning_msg', 'All fields are required.')
        return res.redirect('/register')
      }
      if (password !== passwordCheck) {
        req.flash('warning_msg', 'Check password is not match.')
        return res.redirect('/register')
      }
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { userName }
          ]
        }
      })
      if (user) {
        req.flash('warning_msg', 'Email or username has already been registered.')
        return res.redirect('/register')
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      await User.create({ userName, email, password: hashedPassword })
      req.flash('success_msg', 'You have successfully registered.')
      return res.redirect('/login')
    } catch (error) {
      next(error)
    }
  },
  logout: async (req, res, next) => {
    try {
      req.logout(() => {
        req.flash('success_msg', 'You have successfully logged out.')
        res.redirect('/products')
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
