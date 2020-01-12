module.exports = {
  insertReviewRequest,
  getReviewRequests,
  getReviewRequestsWithUsers
}

const db = require('../..')

async function insertReviewRequest (reviewRequest) {
  return db('reviewrequests').insert(reviewRequest)
}

// Return Request review data from DB
async function getReviewRequests ({ preprint_id }) {
  return db('reviewrequests').where({ preprint_id: preprint_id })
}

// Return Request review data from DB
async function getReviewRequestsWithUsers ({ preprint_id }) {
  return db('reviewrequests').leftJoin('users', {'users.user_id': 'reviewrequests.author_id'}).where({ preprint_id: preprint_id })
}
