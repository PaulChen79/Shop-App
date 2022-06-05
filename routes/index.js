const express = require('express')
const router = express.Router()
const { errorHandler } = require('../middleware/error-handler')

router.get('/', (req, res) => {
  res.send('hello')
})

router.use('/', errorHandler)

module.exports = router
