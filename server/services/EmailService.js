const db = require('../db')
const sendgridConfig = (() => {
  try {
    return require('../../config/sendgrid')
  } catch (error) {
    console.error('No sendgrid configuration found | not sending emails')
  }
})()

const sgMail = require('@sendgrid/mail')
const { getReviewRequestsWithUsers } = require('../../server/db/tables/reviewrequests')

const {
  // sendgrid api key
  apiKey,
  // email address to use as sender
  supportAddress,
  // template ids created on sendgrid
  templateIds = {}
} = sendgridConfig || {}

sgMail.setApiKey(apiKey)

// sgMail.setSubstitutionWrappers('{{', '}}');

class EmailService {
  static async sendEmail (emailOptions) {
    if (apiKey) {
      return await sgMail.send(emailOptions)
    } else {
      console.error('No sendgrid configuration found | not sending email', emailOptions)
    }
  }

  static async sendWelcomeEmail ({ email }) {
    const { address } = email

    const emailOptions = {
      to: address,
      from: supportAddress,
      templateId: templateIds.WELCOME_EMAIL
    }

    return EmailService.sendEmail(emailOptions).then(res => {
      //
    }).catch(error => {
      console.error('WELCOME EMAIL RELATED ERROR:', error)
    })
  }

  static async sendVerificationEmail ({ email, name }) {
    const { address, token } = email
    const verifyEmailLink = `${process.env.APP_ROOT_URI}/data/users/confirm-email?token=${token}`

    const emailOptions = {
      to: address,
      from: supportAddress,
      templateId: templateIds.VERIFY_EMAIL,
      dynamic_template_data: {
        verifyEmailLink,
        name
      }
    }

    return EmailService.sendEmail(emailOptions).then(res => {
      //
    }).catch(error => {
      console.error('VERIFICATION EMAIL RELATED ERROR:', error)
    })
  }

  static async sendNewPreReviewEmails ({ preprint_id, preReview }) {
    const results = await getReviewRequestsWithUsers({ preprint_id })

    const preReviewAuthor = await db('users')
      .where({ user_id: preReview.author_id })
      .first()

    const preprint = await db('preprints')
      .where({ id: preprint_id })
      .first()

    const {
      name: preReviewAuthorName,
      user_id: preReviewUserId
    } = preReviewAuthor
    const preReviewAuthorLink = `${process.env.APP_ROOT_URI}/users/${preReviewUserId}`
    const { title: prePrintTitle } = preprint
    const prePrintLink = `${process.env.APP_ROOT_URI}/preprints/${preprint_id}`

    results.forEach(result => {
      const { profile } = result
      const { isReceivingEmails = false, email: { address, verified = false } = {} } = profile || {}

      if (isReceivingEmails && address && verified) {
        const emailOptions = {
          to: address,
          from: supportAddress,
          templateId: templateIds.NEW_PRE_REVIEW_EMAIL,
          dynamic_template_data: {
            preReviewAuthorName,
            preReviewAuthorLink,
            prePrintTitle,
            prePrintLink
          }
        }

        return EmailService.sendEmail(emailOptions).then(res => {
          //
        }).catch(error => {
          console.error('NEW PRE REVIEW EMAIL RELATED ERROR:', error)
        })
      }
    })
  }
}

module.exports = EmailService
