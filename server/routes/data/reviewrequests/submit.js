var express = require('express')
const uuidv4 = require('uuid/v4')
var reviewrequests = require('../../../db/tables/reviewrequests')

var router = express.Router()

// Submits a new review request
router.post('/submit', async function(req, res, next) {
  var reviewrequest = {
    id: uuidv4(),
    preprint_id: req.body.preprint_id,
    author_id: req.body.author_id,
    date_created: new Date()
  }

  const userRequested = await checkRequested(reviewrequest)

  if (!userRequested) {
    reviewrequests
      .addReviewRequest(reviewrequest)
      .then(data => res.json(data))
      .catch(e => {
        console.error(
          'Error trying to create Review Request with data:',
          JSON.stringify(reviewrequest)
        )
        console.error(e)
        res.status(
          500,
          'Something went wrong trying to publish this Review Request'
        )
      })
  }
})

// checks if user already requested a review for current preprint
const checkRequested = reviewrequest =>
  new Promise(resolve => {
    return reviewrequests.getReviewRequests(reviewrequest).then(requests => {
      requests.forEach(request => {
        if (request.author_id == reviewrequest.author_id) {
          resolve(true)
        }
      })
      resolve(false)
    })
  })

module.exports = router