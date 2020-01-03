var db = require('../..')

var { getUserReviews } = require('../prereviews')

function addUser(user) {
  return db('users').insert({
    orcid: user.orcid,
    name: user.name,
    profile: JSON.stringify(user.profile),
    token: JSON.stringify(user.token)
  })
}

function updateUser(user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update(user)
}

function getUser(user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .then(getUserReviews)
}

function getUserById(userid) {
  return db('users')
    .where({ user_id: userid })
    .first()
    .then(getUserReviews)
}

function getOrAddUser(user) {
  return db('users')
    .where({ orcid: user.orcid })
    .then(results => {
      if (results.length < 1) {
        // create new user
        return addUser(user).then(user => {
          user.firstvisit = true
          return user
        })
      } else {
        delete user.profile
        return updateUser(user).then(user => {
          user.firstvisit = false
          return user
        })
      }
    })
}

function makeUserPrivate(user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      is_private: true,
      privacy_setup: true
    })
}

function makeUserPublic(user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      is_private: false,
      privacy_setup: true
    })
}

function acceptCoC(user) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      coc_accepted: true
    })
}

function updateProfilePic(user, img) {
  return db('users')
    .where({ orcid: user.orcid })
    .first()
    .update({
      profile: {
        pic: img
      }
    })
}

module.exports = {
  addUser,
  getUser,
  getUserById,
  getOrAddUser,
  makeUserPrivate,
  makeUserPublic,
  acceptCoC,
  getUserReviews,
  updateProfilePic
}
