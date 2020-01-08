var prereviews = require('../../../db/tables/prereviews')
var convertDelta = require('../../../../client/lib/editor/convert')
var zenodoService = require('../../../services/zenodo');

var express = require('express')
var router = express.Router()

// Submits a new PREreview
router.post('/submit', async function (req, res, next) {
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

  const zenodoData = {
    authorName: req.body.author.name,
    authorOrchid: req.body.author.orcid,
    content: prereview.content,
    title: req.body.preprint.title,
    description: req.body.preprint.abstract
  }

  try {
    // Generate the DOI for it
    prereview.doi = await zenodoService.generateDOI(zenodoData)
    // Save it in our DB
    const data = await prereviews.addPrereview(prereview)
    return res.json(data)
  } catch (e) {
    console.error('Error trying to create PREreview with data:', JSON.stringify(prereview))
    console.error(e)
    return res.status(500, 'Something went wrong trying to publish this PREreview')
  }
})

module.exports = router