// Handles user data

var orcid = require('orcid-utils')
var user = require('../../db/tables/users')

module.exports = app => {
  // Serves the current user's own data to the client app
  // only works if the user is logged in - otherwise req.user is null
  app.get('/data/user', function (req, res) {
    res.json(req.user)
  })

  // Returns data about a user by ID
  // If there is no authed user, show only public information
  // If there is an authed user, show only public information unless they request their own data
  // The there is an authed user and they are an admin, show them all data
  app.get('/data/user/:userid', function (req, res) {
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
      // lookupuser by id
      users.getUserByID(userid).then(
        returneduser => {
          user = returneduser
        }
      )
    }

    delete user.token
    res.json(user)
  })
}
