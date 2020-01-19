const db = require('../..')

const { getUserReviews } = require('../prereviews')
const { onUserInsert, onEmailVerification } = require('./hooks')

async function insertUser (user) {
  const isInsertSuccessful = await db('users').insert({
    orcid: user.orcid,
    name: user.name,
    profile: JSON.stringify(user.profile),
    token: JSON.stringify(user.token)
  })

  if (isInsertSuccessful) {
    await onUserInsert(user)
  }

  return isInsertSuccessful
}

function updateUser (user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update(user)
}

function getOnlyUserById (userid) {
  return db('users')
    .where({ user_id: userid })
    .first()
}

function getUser (user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .then(getUserReviews)
}

function getUserById (userid) {
  return db('users')
    .where({ user_id: userid })
    .first()
    .then(getUserReviews)
}

async function upsertUser (user) {
  const [existingUser] = await db('users').where({ orcid: user.orcid })

  if (existingUser) {
    existingUser.profile = existingUser.profile || {}
    // extend profile

    user.profile = {
      ...user.profile,
      ...existingUser.profile,
    }

    await updateUser(user);
  } else {
    await insertUser(user);
  }
}

function makeUserPrivate (user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      is_private: true,
      privacy_setup: true
    })
}

function makeUserPublic (user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      is_private: false,
      privacy_setup: true
    })
}

function acceptCoC (user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      coc_accepted: true
    })
}

function updateProfilePic (user, img) {
  // TODO upload to external service or use another db field ?
  // cannot use jsonb_set because knex does not escape properly a buffer
  const { profile } = user
  Object.assign(profile, { pic: img })

  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({ profile })
}

function updateEmail (user, email) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      profile: db.raw(`jsonb_set(??, '{email}', ?)`, ['profile', email])
    })
}

async function setEmailTokenAsVerified (token) {
  const user = await db('users')
    .whereRaw(`profile->'email'->>'token' = ?`, token)
    .first()

  if (user) {
    const isUpdateSuccessful = await db('users')
      .where({ user_id: user.user_id })
      .first()
      .update({
        profile: db.raw(`jsonb_set(??, '{email, verified}', ?)`, ['profile', true])
      })

    await onEmailVerification(user)

    return isUpdateSuccessful
  }
}

function updateEmailPreferences (user, preferences) {
  const { isReceivingEmails, isEmailPrivate } = preferences

  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      profile: db.raw(`jsonb_set(jsonb_set(??, '{isReceivingEmails}', ?), '{isEmailPrivate}', ?)
        `, ['profile', isReceivingEmails, isEmailPrivate])
    })
}

module.exports = {
  insertUser,
  getUser,
  getUserById,
  upsertUser,
  makeUserPrivate,
  makeUserPublic,
  acceptCoC,
  getUserReviews,
  updateEmail,
  updateEmailPreferences,
  updateProfilePic,
  getOnlyUserById,
  setEmailTokenAsVerified
}
