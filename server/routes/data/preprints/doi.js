var isdoi = require('doi-regex')
var preprints = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.get('/doi/*', function (req, res, next) {
  var doi = req.params[0]

  if (!isdoi({ exact: true }).test(doi)) {
    res.status(500, 'Malformed DOI in requested URI')
  }

  // TODO: enrich preprint with getpreprints data
  // e.g. if it's not in our DB, check crossref
  // if we have it, check for updates now

  preprints.getPreprint({
    id: `doi/${doi}`
  }).then(
    returnedpreprint => {
      res.json(returnedpreprint)
    }
  ).catch(
    e => res.status(404, 'We do not have data for that preprint')
  )
})

module.exports = router
