var checkAuth = require('../auth/checkAuth')

module.exports = app => app.get('/userdata', checkAuth, function (req, res) {
  res.json(req.user)
})
