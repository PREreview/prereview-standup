const db = require('../..')
const EmailService = require('../../../services/EmailService')

const afterPreReviewInsert = async (preReview) => {
  await db('preprints').where('id', '=', preReview.preprint_id).increment('n_prereviews', 1)
  await EmailService.sendNewPreReviewEmail({ preprint_id: preReview.preprint_id })
}

module.exports = {
  afterPreReviewInsert
}
