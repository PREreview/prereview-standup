// Handles user data

var orcid = require('orcid-utils')
var user = require('../../db/tables/users')

module.exports = app => {
  // Serves the current user's own data to the client app
  // only works if the user is logged in - otherwise req.user is null
  app.get('/data/users/me', function (req, res) {
    if (req.user) {
      res.json(req.user)
    } else {
      res.status(401)
      res.json({})
    }
  })

  // Returns data about a user by ID
  // If there is no authed user, show only public information
  // If there is an authed user, show only public information unless they request their own data
  // If there is an authed user and they are an admin, show them all data
  app.get('/data/users/:userid', function (req, res) {
    var userid = params.userid

    var user

    if (orcid.isValid(userid)) {
      // lookup user by orcid
      users.getUser({ orcid: userid }).then(
        returneduser => {
          user = returneduser
        }
      )
    } else {
      // lookup user by id
      users.getUserByID(userid).then(
        returneduser => {
          user = returneduser
        }
      )
    }

    // Don't include the auth tokens
    delete user.token

    // If logged in user is not admin, and 
    // requested user is pseudonymous, ensure real name and orcid are removed
    if (!req.user.is_admin && user.is_private) {
      delete user.name
      delete user.orcid
    }

    res.json(user)
  })
}
