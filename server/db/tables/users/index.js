module.exports = users

var db = require('../')

function createTable () {
	return db.schema.dropTableIfExists('users')
	  .then(() => {
			return db.schema.createTable('users', table => {
				table.increments()
				table.timestamps()
				table.json('data').nullable()
		  })
	  })
}

function addUser (user) {
	return db('users').insert({
		data: JSON.stringify(user),
		created_at : new Date(),
		updated_at: new Date()
	})
}

function getUser (user) {
	return db('users')
		.where({ orcid: user.orcid })
		.first()
}

function createOrUpdateUser (user) {
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