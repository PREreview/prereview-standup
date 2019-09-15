var { searchPreprints } = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.post('/search', function (req, res, next) {
  searchPreprints(req.body.query).then(
    results => res.json(results)
  )
})

module.exports = router
