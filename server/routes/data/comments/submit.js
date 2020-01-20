const comments = require('../../../db/tables/comments')

const express = require('express')
const router = express.Router()

// Submits a new comment
router.post('/submit', async function (req, res, next) {
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  const comment = {
    prereview_id: req.body.prereview_id,
    author_id: req.user.user_id,
    content: req.body.content
  }

  await comments.addComment(comment);
})

module.exports = router
