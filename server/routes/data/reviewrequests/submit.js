
var express = require('express')
var reviewrequests = require('../../../db/tables/reviewrequests')

var router = express.Router()

// Submits a new review request
router.post('/submit', function(req, res, next) {
  var reviewrequest = {
    id: Math.random().toString(36).substring(2, 15),
    preprint_id: req.body.preprint_id,
    author_id: req.body.author_id,
    date_created: new Date()
  }

  reviewrequests
    .addReviewRequest(reviewrequest)
    .then(data => res.json(data))
    .catch(e => {
      console.error('Error trying to create Review Request with data:', JSON.stringify(reviewrequest))
      console.error(e)
      res.status(500, 'Something went wrong trying to publish this Review Request')
    }
  )
})

module.exports = router
