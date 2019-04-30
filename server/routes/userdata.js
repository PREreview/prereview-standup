module.exports = app => app.get('/userdata', function (req, res) {
  res.json(req.user)
})
