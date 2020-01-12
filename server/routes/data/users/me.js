const express = require('express')
const fs = require('fs')
const uuid = require('uuid')
const formidableMiddleware = require('express-formidable')

const user = require('../../../db/tables/users')
const prereview = require('../../../db/tables/prereviews')

const router = express.Router()
const EmailService = require('../../../services/EmailService')

// Serves the current user's own data to the client app
// only works if the user is logged in - otherwise req.user is null
router.get('/me', function (req, res) {
  if (req.user) {
    prereview.getUserReviews(req.user).then(
      userWithReviews => {
        res.json(userWithReviews)
      }
    )
  } else {
    res.status(401)
    res.json({})
  }
})

// Current user sets their account to private
// so that their real name and ORCID are hidden
router.post('/me/become_private', function (req, res) {
  if (req.user) {
    user.makeUserPrivate(req.user).then(res.json(req.user))
  } else {
    res.status(401)
    res.json({})
  }
})

// Current user sets their account to public
// so that their real name and ORCID are shown
router.post('/me/become_public', function (req, res) {
  if (req.user) {
    user.makeUserPublic(req.user).then(res.json(req.user))
  } else {
    res.status(401)
    res.json({})
  }
})

// Current user accepts the Code of Conduct -
// without this the user is not allowed to create content
router.post('/me/accept_coc', function (req, res) {
  if (req.user) {
    user.acceptCoC(req.user).then(res.json(req.user))
  } else {
    res.status(401)
    res.json({})
  }
})

// Update profile picture
router.post('/me/updateProfilePic', formidableMiddleware(), function (req, res) {
  var imagePath = req.files.avatar.path
  var fileType = req.files.avatar.type

  var file = fs.readFileSync(imagePath, 'base64')
  var base64 = `data:${fileType};base64,${file}`

  if (req.user) {
    user.updateProfilePic(req.user, base64).then(() => {
      const { profile } = req.user
      // return updated user
      res.json({
        ...req.user,
        profile: {
          ...profile,
          pic: base64
        }
      })
    })
  } else {
    res.status(401)
    res.json({})
  }
})

// Serves the current user's own data to the client app
// only works if the user is logged in - otherwise req.user is null
router.get('/confirm-email', async function (req, res) {
  const token = req.query.token
  await user.setEmailTokenAsVerified(token)
  res.redirect('/profile')
})

// Update personal email
router.post('/me/updatePersonalEmail', async function (req, res) {
  const { emailAddress } = req.body
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!emailRegex.test(emailAddress)) {
    res.status(401, 'Not a valid email address')
    return res.json({})
  }

  if (req.user) {

    const { user: { profile: { email: { address: currentEmailAddress } = {} } } } = req

    // do not update the email if it's the same
    if (currentEmailAddress === emailAddress || !emailAddress) {
      return res.json(req.user)
    }

    const email = {
      address: emailAddress,
      verified: false,
      token: uuid() // TODO actually generate a token
    }

    await user.updateEmail(req.user, email)

    EmailService.sendVerificationEmail({ ...req.user, email })

    const { profile } = req.user
    // return updated user
    res.json({
      ...req.user,
      profile: {
        ...profile,
        email
      }
    })
  } else {
    res.status(401)
    res.json({})
  }
})

// Update personal email
router.post('/me/updateEmailPreferences', function (req, res) {
  const { isReceivingEmails, isEmailPrivate } = req.body

  if (req.user) {
    user.updateEmailPreferences(
      req.user,
      {
        isReceivingEmails,
        isEmailPrivate
      }
    ).then(() => {
      const { profile } = req.user

      // return updated user
      res.json({
        ...req.user,
        profile: {
          ...profile,
          isReceivingEmails,
          isEmailPrivate
        }
      })
    })
  } else {
    res.status(401)
    res.json({})
  }
})

module.exports = router
