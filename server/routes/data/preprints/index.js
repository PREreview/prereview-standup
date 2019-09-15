var express = require('express')
var router = express.Router()

var doi = require('./doi')
var search = require('./search')

router.use('/preprints', [doi, search])

module.exports = router
