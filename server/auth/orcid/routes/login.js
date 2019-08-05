var express = require('express')
var router = express.Router()

var passport = require('passport')

router.get('/login', passport.authenticate('orcid'))

module.exports = router
