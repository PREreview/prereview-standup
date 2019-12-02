var reviewrequests = require('../../../db/tables/reviewrequests')

var express = require('express')
var router = express.Router()

// Submits a new review request
router.post('/submit', function (req, res, next) {
  // if (!req.user) {
  //   // user must be logged in
  //   return res.status(401)
  // }

  // if (req.user.id !== req.body.author.id) {
  //   // user must be logged in as the same one claiming to author the review request
  //   return res.status(401, 'You cannot post a review request as another user')
  // }

  var reviewrequest = {
    preprint_id: req.body.preprint_id,
    author_id: req.body.author_id,
  }

  reviewrequests.addReviewRequest(reviewrequest).then(
    data => res.json(data)
  ).catch(
    e => {
      console.error('Error trying to create Review Request with data:', JSON.stringify(reviewrequest))
      console.error(e)
      res.status(500, 'Something went wrong trying to publish this Review Request')
    }
  )
})

module.exports = router
