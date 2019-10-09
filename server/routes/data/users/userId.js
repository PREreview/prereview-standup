var users = require('../../../db/tables/users')

var express = require('express')
var router = express.Router()

// Returns data about a user by ID
// If there is no authed user, show only public information
// If there is an authed user, show only public information unless they request their own data
// If there is an authed user and they are an admin, show them all data
router.get('/:userid', function (req, res) {
  var userid = req.params.userid

  // // user is looking at their own profile
  // if (req.user.id === userid) {
  // 	return res.json(req.user)
  // }

  var admin = req.user && req.user.is_admin

  // lookup user by id
  users.getUserById(userid).then(
    returnuser
  )

  function returnuser (user) {
    if (!user) return res.json(null)

    // Don't include the auth tokens
    delete user.token

    // If logged in user is not admin, and
    // requested user is pseudonymous, ensure real name and orcid are removed
    if (user.is_private && !admin) {
      user.name = `PREreviewer${user.user_id}`
      delete user.orcid
      delete user.profile
    }

    res.json(user)
  }
})

module.exports = router
