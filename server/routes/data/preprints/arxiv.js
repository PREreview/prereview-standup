var isdoi = require('doi-regex')
var preprints = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.get('/arxiv/*', function (req, res, next) {
  var arxivid = req.path.split('/arxiv/')[1]

  if (!arxivid) {
    res.status(500, 'Malformed arXiv ID in requested URI')
  }

  var preprint

  preprints.getPreprint({
    identifier_type: 'arxiv',
    identifier: arxivid
  }).then(
    returnedpreprint => {
      res.json(returnedpreprint)
    }
  ).catch(
    e => res.status(404, 'We do not have data for that preprint')
  )
})

module.exports = router
