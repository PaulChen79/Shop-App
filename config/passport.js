const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return done(null, false, req.flash('warning_msg', 'Email or password incorrect.'))
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) return done(null, false, req.flash('warning_msg', 'Email or password incorrect.'))
    return done(null, user)
  } catch (error) {
    done(error, false)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user.toJSON())
  } catch (error) {
    done(error, false)
  }
})

module.exports = passport
