var express = require('express')
var router = express.Router()

var submit = require('./submit')
var hide = require('./admin/hide')
var unhide = require('./admin/unhide')
// var id = require('./id')
// var doi = require('./doi')

router.use('/prereviews', [submit, hide, unhide])

module.exports = router
