const express = require('express')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const exphbs = require('express-handlebars')
const handlebarsHelpers = require('./helpers/handlebars-helpers')
const { getUser } = require('./helpers/auth-helpers')
const passport = require('./config/passport')
const routes = require('./routes/index')
const PORT = process.env.PORT || 3000

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: 'hbs', helpers: handlebarsHelpers }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.user = getUser(req)
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
