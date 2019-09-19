var comments = require('../../../db/tables/comments')
var convertDelta = require('../../../../client/lib/editor/convert')

var express = require('express')
var router = express.Router()

// Submits a new comment
router.post('/submit', function (req, res, next) {
  
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  console.log(req.body)

  if (req.user.id !== req.body.author.id) {
    // user must be logged in as the same one claiming to author the comment
    return res.status(401, 'You cannot post a comment as another user')
  }

  var comment = {
    prereview_id: req.body.prereview_id,
    author_id: req.body.author.user_id,
    content: convertDelta.toHTML(req.body.comment)
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
