module.exports = {
	addUser, getUser, getUserById, getOrAddUser, makeUserPrivate, makeUserPublic, acceptCoC
}

var db = require('../..')

function addUser (user) {
	return db('users').insert({
		orcid: user.orcid,
		name: user.name,
		profile: JSON.stringify(user.profile),
		token: JSON.stringify(user.token)
	})
}

function updateUser (user) {
	return db('users')
		.where({ orcid: user.orcid })
		.first()
		.update(user)
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

function getUserReviews (user) {
	if (user && user.user_id) {
		return db('prereviews')
			.where({ author_id: user.user_id })
			.then(
				prereviews => {
					user.prereviews = prereviews
					return Promise.resolve(user)
				}
			)
	} else {
		return Promise.resolve(null)
	}
}

function getOrAddUser (user) {
	return db('users')
    .where({ orcid: user.orcid })
    .then(results => {
      if (results.length < 1) {
        // create new user
				return addUser(user).then(
					user => {
						user.firstvisit = true
						return user
					}
				)
      } else {
				return updateUser(user).then(
					user => {
						user.firstvisit = false
						return user
					}
				)
      }
    })
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
