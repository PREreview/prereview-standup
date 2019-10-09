module.exports = {
  addComment, getPrereviewComments
}

var db = require('../..')

function addComment (comment) {
  return db('comments').insert(comment)
}

function getPrereviewComments (prereview) {
  if (prereview && prereview.prereview_id) {
    return db('comments')
      .where({ prereview_id: prereview.prereview_id })
      .then(
        comments => {
          prereview.comments = comments
          return Promise.resolve(prereview)
        }
      )
  } else {
    return Promise.resolve(null)
  }
}
