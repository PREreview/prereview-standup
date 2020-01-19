const sendgridConfig = (() => {
  try {
    return require('../../config/sendgrid')
  } catch (error) {
    console.error("No sendgrid configuration found | not sending emails")
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
    if(apiKey) {
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
      templateId: templateIds.WELCOME_EMAIL,
    }

    return EmailService.sendEmail(emailOptions).then(res => {
      //
    }).catch(error => {
      console.log('WELCOME EMAIL RELATED ERROR:', error)
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
      console.log('VERIFICATION EMAIL RELATED ERROR:', error)
    })
  }

  static async sendNewPreReviewEmail ({ preprint_id }) {
    const results = await getReviewRequestsWithUsers({ preprint_id })

    results.forEach(result => {
      const { user_id, name, preprint_id, profile } = result
      const { isReceivingEmails = false, emails } = profile || {}
      const [personalEmail] = emails || []

      if (isReceivingEmails && personalEmail) {
        // TODO send email ?
      }
    })
  }
}

module.exports = EmailService
