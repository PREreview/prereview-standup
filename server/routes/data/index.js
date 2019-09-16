var express = require('express')
var router = express.Router()

var prereviews = require('./prereviews')
var users = require('./users')
var preprints = require('./preprints')

router.use('/data', [prereviews, users, preprints])

module.exports = router
