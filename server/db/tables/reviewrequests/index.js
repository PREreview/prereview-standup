module.exports = {
  addReviewRequest,
  getReviewRequests
}

var db = require('../..')

function addReviewRequest(reviewRequest) {
  return db('reviewrequests').insert(reviewRequest)
}

// Return Request review data from DB
function getReviewRequests(reviewrequest) {
  if (reviewrequest) {
    return db('reviewrequests')
      .where({ preprint_id: reviewrequest.preprint_id })
      .then(reviewrequests => Promise.resolve(reviewrequests))
  } else {
    return Promise.resolve(null)
  }
}
