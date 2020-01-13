const uuidv4 = require('uuid/v4')
const express = require('express')
const reviewRequestsTable = require('../../../db/tables/reviewrequests')

const router = express.Router()

// Submits a new review request
router.post('/submit', async function (req, res, next) {
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  const { preprint_id } = req.body
  const { user_id: author_id } = req.user

  const isAlreadyRequestedByUser = await getIsAlreadyRequestedByUser({ preprint_id, author_id })

  if (!isAlreadyRequestedByUser) {
    const reviewRequest = {
      id: uuidv4(),
      preprint_id,
      author_id,
      date_created: new Date()
    }

    try {
      const insertResult = await reviewRequestsTable.insertReviewRequest(reviewRequest)

      res.json(insertResult)
    } catch (error) {
      console.error(
        'Error trying to create PREreview Request with data:',
        JSON.stringify(reviewRequest)
      )
      console.error(error)
      res.status(
        500,
        'Something went wrong trying to publish this PREreview Request'
      )
    }
  } else {
    return res.json({ userAlreadyRequested: true })
  }
})

// checks if user already requested a review for current preprint
const getIsAlreadyRequestedByUser = async ({ preprint_id, author_id }) => {
  const requests = await reviewRequestsTable.getReviewRequests({ preprint_id })

  const existingRequest = requests.find(request => {
    return request.author_id === author_id
  })

  return !!existingRequest
}

module.exports = router
