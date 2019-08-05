// Handles user data

var express = require('express')
var router = express.Router()

var me = require('./me')
var userId = require('./userId')

router.use('/users', [me, userId])

module.exports = router
