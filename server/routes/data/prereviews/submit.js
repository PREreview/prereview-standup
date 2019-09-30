var prereviews = require('../../../db/tables/prereviews')
var convertDelta = require('../../../../client/lib/editor/convert')

var express = require('express')
var router = express.Router()

// Submits a new PREreview
router.post('/submit', function (req, res, next) {
  
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  if (req.user.id !== req.body.author.id) {
    // user must be logged in as the same one claiming to author the PREreview
    return res.status(401, 'You cannot post a PREreview as another user')
  }

  // if (!isdoi({ exact: true }).test(prereview.preprint_doi)) {
  //   // preprint doi must be valid
  //   return res.status(500, 'preprint DOI is not valid')
  // }

  var prereview = {
    preprint_id: req.body.preprint.id,
    author_id: req.body.author.user_id,
    content: convertDelta.toHTML(req.body.prereview).replace('<p><br></p>', '')
  }

	prereviews.addPrereview(prereview).then(
    data => res.json(data)
  ).catch(
    e => {
      console.error('Error trying to create PREreview with data:', JSON.stringify(prereview))
      console.error(e)
      res.status(500, 'Something went wrong trying to publish this PREreview')
    }
  )
})

module.exports = router
