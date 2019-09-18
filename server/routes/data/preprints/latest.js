var { searchPreprints } = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

var latest = []

var update = () => searchPreprints().then(
  results => (latest = results)
)

setInterval(update, 86400000)

update()

// Returns data about a preprint by DOi
router.get('/latest', function (req, res, next) {
  res.json(latest)
})

module.exports = router
