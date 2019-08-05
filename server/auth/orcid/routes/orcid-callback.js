var express = require('express')
var router = express.Router()

var passport = require('passport')

// finish authenticating with ORCID
router.get('/orcid-callback', passport.authenticate('orcid', {
  successRedirect: '/profile',
  failureRedirect: '/'
}))

module.exports = router
