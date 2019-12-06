var preprints = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by arXiv
router.get('/arxiv/*', function (req, res, next) {
  var arxiv = req.params[0]

  preprints.getPreprint({
    id: `arxiv/${arxiv}`
  }).then(
    returnedpreprint => {
      res.json(returnedpreprint)
    }
  ).catch(
    e => res.status(404, 'We do not have data for that preprint')
  )
})

module.exports = router
