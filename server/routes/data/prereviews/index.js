var express = require('express')
var router = express.Router()

var submit = require('./submit')
// var id = require('./id')
// var doi = require('./doi')

router.use('/prereviews', [submit])

module.exports = router
