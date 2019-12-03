var reviewrequests = require('../../../db/tables/reviewrequests')

var express = require('express')
var router = express.Router()

// Returns data about a review request by preprint_id
router.get('/preprint_id/*', function(req, res, next) {
  var preprint_id = req.params[0]

  reviewrequests
    .getReviewRequests({
      preprint_id
    })
    .then(reviewRequests => res.json(reviewRequests))
    .catch(e => res.status(404, 'We do not have data for that preprint'))
})

module.exports = router
