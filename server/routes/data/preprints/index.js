var express = require('express')
var router = express.Router()

router.use('/preprints', [
  require('./doi'),
  require('./latest'),
  require('./search')
])

module.exports = router
