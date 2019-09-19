var express = require('express')
var router = express.Router()

var submit = require('./submit')

router.use('/comments', [submit])

module.exports = router
