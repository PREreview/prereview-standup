var user = require('../../../db/tables/users')

var express = require('express')
var router = express.Router()


// Serves the current user's own data to the client app
// only works if the user is logged in - otherwise req.user is null
router.get('/me', function (req, res) {
	if (req.user) {
		res.json(req.user)
	} else {
		res.status(401)
		res.json({})
	}
})

// Allows the current user to switch their account to private
// so that their real name and ORCID are hidden
router.post('/me/become_private', function (req, res) {
	if (req.user) {
		user.makeUserPrivate(req.user).then(res.json(req.user))
	} else {
		res.status(401)
		res.json({})
	}
})

// Allows the current user to switch their account to public
// so that their real name and ORCID are shown
router.post('/me/become_public', function (req, res) {
	if (req.user) {
		user.makeUserPublic(req.user).then(res.json(req.user))
	} else {
		res.status(401)
		res.json({})
	}
})

module.exports = router