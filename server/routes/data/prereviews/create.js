var isdoi = require('doi-regex')
var prereviews = require('../../../db/tables/prereviews')
var preprints = require('../../../db/tables/preprints')

var express = require('express')
var router = express.Router()

// Returns data about a preprint by DOi
router.post('/create', function (req, res, next) {
  
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  var prereview = req.body.prereview

  if (req.user.id !== prereview.author_id) {
    // user must be logged in as the same one claiming to author the PREreview
    return res.status(401, 'You cannot post a PREreview as another user')
  }

  if (!isdoi({ exact: true }).test(prereview.preprint_doi)) {
    // preprint doi must be valid
    return res.status(500, 'preprint DOI is not valid')
  }

  var getredirecturi = data => `/preprints/doi/${prereview.preprint_doi}/reviews/id/${data.id}`

	prereviews.createPrereview(prereview).then(
    data => {
      res.redirect(getredirecturi(data))
    }
  ).catch(
    e => {
      console.error('Error trying to create prereview with data:', JSON.stringify(prereview))
      console.error(e)
      res.status(500, 'Something went wrong trying to publish this review')
    }
  )
})

module.exports = router
