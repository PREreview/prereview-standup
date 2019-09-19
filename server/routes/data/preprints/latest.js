var { searchPreprints } = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.get('/latest', function (req, res, next) {
  searchPreprints().then(latest => res.json(latest))
})

module.exports = router
