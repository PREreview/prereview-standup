const db = require('../..')
const EmailService = require('../../../services/EmailService')

const afterPreReviewInsert = async (preReview) => {
  await db('preprints').where('id', '=', preReview.preprint_id).increment('n_prereviews', 1)

  try {
    await EmailService.sendNewPreReviewEmails({
      preprint_id: preReview.preprint_id,
      preReview: preReview
    })
  } catch (error) {
    console.error('Error while sending new pre review emails', error)
  }
}

module.exports = {
  afterPreReviewInsert
}
