const EmailService = require('../../../services/EmailService')

const onUserInsert = async (user) => {
  const { profile: { email } = {} } = user

  if (email && email.address) {
    await EmailService.sendWelcomeEmail({ email })
  }
}

const onEmailVerification = async (user) => {
  const { profile: { email } = {} } = user

  if (email && email.address) {
    await EmailService.sendWelcomeEmail({ email })
  }
}

module.exports = {
  onUserInsert,
  onEmailVerification
}
