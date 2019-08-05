module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.dropTableIfExists('users').then(function(exists) {
		// if (!exists) {
			return db.schema.createTable('users', table => {
				table.increments('id').primary()
				table.timestamp('created_at').defaultTo(db.fn.now())
				table.json('profile').nullable()
				table.json('token').nullable()
				table.string('orcid').unique().comment('Only one account per ORCID')
				table.string('name').comment('User real name taken from ORCID record')
				table.boolean('is_admin').defaultTo(false)
				table.boolean('is_private').defaultTo(false)
			})
		// }
	})
}
