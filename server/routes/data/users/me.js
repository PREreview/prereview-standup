var user = require('../../../db/tables/users')
var { getPrereviewsForUser } = require('../../../db/tables/prereviews')

var express = require('express')
var router = express.Router()


// Serves the current user's own data to the client app
// only works if the user is logged in - otherwise req.user is null
router.get('/me', function (req, res) {
	if (req.user) {
		getPrereviewsForUser(req.user).then(
			prereviews => {
				var user = Object.assign({}, req.user)
				user.prereviews = prereviews
				res.json(user)
			}
		)
	} else {
		res.status(401)
		res.json({})
	}
})

// Current user sets their account to private
// so that their real name and ORCID are hidden
router.post('/me/become_private', function (req, res) {
	if (req.user) {
		user.makeUserPrivate(req.user).then(res.json(req.user))
	} else {
		res.status(401)
		res.json({})
	}
})

// Current user sets their account to public
// so that their real name and ORCID are shown
router.post('/me/become_public', function (req, res) {
	if (req.user) {
		user.makeUserPublic(req.user).then(res.json(req.user))
	} else {
		res.status(401)
		res.json({})
	}
})

// Current user accepts the Code of Conduct -
// without this the user is not allowed to create content
router.post('/me/accept_coc', function (req, res) {
	if (req.user) {
		user.acceptCoC(req.user).then(res.json(req.user))
	} else {
		res.status(401)
		res.json({})
	}
})


module.exports = router
