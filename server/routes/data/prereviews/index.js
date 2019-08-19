var express = require('express')
var router = express.Router()

var create = require('./create')
var id = require('./id')
// var doi = require('./doi')

router.use('/prereviews', [create, id])

module.exports = router
