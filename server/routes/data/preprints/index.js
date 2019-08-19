var express = require('express')
var router = express.Router()

var doi = require('./doi')

router.use('/preprints', [doi])

module.exports = router
