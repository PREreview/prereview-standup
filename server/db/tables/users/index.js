module.exports = {
	addUser, getUser, getUserById, getOrAddUser
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

function getUser (user) {
	return db('users')
		.where({ orcid: user.orcid })
		.first()
}

function getUserById (userid) {
	return db('users')
		.where({ id: userid })
		.first()
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
        return results[0]
      }
    })
}