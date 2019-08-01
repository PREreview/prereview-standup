module.exports = {
	addUser, getUser, getOrAddUser
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

function getOrAddUser (user) {
	return db('users')
    .where({ orcid: user.orcid })
    .then(results => {
      if (results.length < 1) {
        // create new user
				return addUser(user)
      } else {
        return results[0]
      }
    })
}