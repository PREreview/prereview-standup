var express = require('express')
var router = express.Router()

var submit = require('./submit')
var preprint_id = require('./preprint_id')

router.use('/reviewrequests', [submit, preprint_id])

module.exports = router
