const db = require('../..')

const { getPreReviewComments } = require('../comments')
const { afterPreReviewInsert } = require('./hooks')

async function addPrereview (preReview) {
  const insertResult = await db('prereviews').insert(preReview)

  try {
    await afterPreReviewInsert(preReview)
  } catch (error) {
    console.log('PreReview insert', error)
  }

  return insertResult
}

function getPrereview (prereview) {
  return db('prereviews')
    .where({ prereview_id: prereview.prereview_id })
    .first()
}

async function getPreprintReviews (prePrint) {
  if (!prePrint || !prePrint.id) {
    return prePrint
  }

  const preReviews = await db('prereviews').where({
    preprint_id: prePrint.id
  })

  prePrint.prereviews = await Promise.all(preReviews.filter(p => !p.is_hidden).map(getPreReviewComments))

  return prePrint
}

async function getUserReviews (user) {
  if (!user || !user.user_id) {
    return user
  }

  let preReviews = await db('prereviews')
    .where({ author_id: user.user_id })

  user.prereviews = await Promise.all(preReviews.filter(p => !p.is_hidden).map(addPrePrintToPreReview))

  return user
}

async function addPrePrintToPreReview (preReview) {
  if (!preReview || !preReview.preprint_id) {
    return preReview
  }

  preReview.preprint = await db('preprints')
    .where({ id: preReview.preprint_id })
    .first()

  return preReview
}

module.exports = {
  addPrereview,
  getPrereview,
  getPreprintReviews,
  getUserReviews
}
