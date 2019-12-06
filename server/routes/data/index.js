var express = require('express')
var router = express.Router()

var users = require('./users')
var preprints = require('./preprints')
var prereviews = require('./prereviews')
var comments = require('./comments')
var reviewrequests = require('./reviewrequests')

router.use('/data', [users, preprints, prereviews, comments, reviewrequests])

module.exports = router
