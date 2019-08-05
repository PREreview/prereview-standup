// serves the current user's own data to the client app
// only works if the user is logged in - otherwise req.user is null
module.exports = app => app.get('/data/prereviews/*', function (req, res) {
  console.log(res, )
})

module.exports = app => app.post('/data/prereviews/*', function (req, res) {
  console.log(res, )
})