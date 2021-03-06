var express = require('express')
var router = express.Router()

router.use('/preprints', [
  require('./arxiv'),
  require('./doi'),
  require('./latest'),
  require('./search'),
  require('./insert'),
  require('./getMetadata')
])

module.exports = router
