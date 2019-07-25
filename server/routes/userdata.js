// serves the current user's own data to the client app
// only works if the user is logged in - otherwise req.user is null
module.exports = app => app.get('/userdata', function (req, res) {
  res.json(req.user)
})
