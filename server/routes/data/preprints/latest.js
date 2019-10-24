var { searchPreprints } = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.get('/latest', function (req, res, next) {
  var start = Date.now()
  searchPreprints().then(latest => {
    console.log('search took', Date.now() - start, 'ms')
    return res.json(latest)
  })
})

module.exports = router
