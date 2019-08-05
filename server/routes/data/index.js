var express = require('express')
var router = express.Router()

var users = require('./users')
var preprints = require('./preprints')
var prereviews = require('./prereviews')

router.use('/data', [users, preprints, prereviews])
