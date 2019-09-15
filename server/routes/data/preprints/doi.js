var isdoi = require('doi-regex')
var preprints = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.get('/doi/:doia/:doib', function (req, res, next) {
  var doi = `${req.params.doia}/${req.params.doib}`
  
  if (!isdoi({exact: true}).test(doi)) {
    res.status(500, 'Malformed DOI in requested URI')
  }

  var preprint

  // TODO: enrich preprint with getpreprints data
  // e.g. if it's not in our DB, check crossref
  // if we have it, check for updates now
  
	preprints.getPreprint({
    identifiertype: 'doi',
    identifier: doi
  }).then(
    returnedpreprint => {
      res.json(returnedpreprint)
    }
  ).catch(
    e => res.status(404, 'We do not have data for that preprint')
  )
})

module.exports = router
