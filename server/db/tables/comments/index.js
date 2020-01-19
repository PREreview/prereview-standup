module.exports = {
  addComment,
  getPreReviewComments
}

const db = require('../..')

function addComment (comment) {
  return db('comments').insert(comment)
}

async function getPreReviewComments (preReview) {
  if (!preReview || !preReview.prereview_id) {
    return preReview
  }

  preReview.comments = await db('comments')
    .where({
      prereview_id: preReview.prereview_id
    })
    .join('users', {'comments.author_id': 'users.user_id'})

  return preReview
}
