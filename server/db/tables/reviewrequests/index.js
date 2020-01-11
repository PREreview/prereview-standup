module.exports = {
  insertReviewRequest,
  getReviewRequests
}

const db = require('../..')

async function insertReviewRequest (reviewRequest) {
  return db('reviewrequests').insert(reviewRequest)
}

// Return Request review data from DB
async function getReviewRequests ({ preprint_id }) {
  return db('reviewrequests').where({ preprint_id: preprint_id })
}
