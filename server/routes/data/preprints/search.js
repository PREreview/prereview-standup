var { searchPreprints } = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.post('/search', function (req, res, next) {
  var start = Date.now()
  searchPreprints(req.body.query).then(
    results => {
      console.log('search took', Date.now() - start, 'ms')
      return res.json(results)
    }
  )
})

module.exports = router
