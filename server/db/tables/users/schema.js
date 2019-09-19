module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.dropTableIfExists('users').then(function(exists) {
		return db.schema.createTable('users', table => {
			table.increments('user_id').primary()
			table.timestamp('created_at').defaultTo(db.fn.now())
			
			// these are loaded from ORCID at first login (see /server/auth)
			// .profile and .token are also updated at each subsequent login
			table.string('orcid').unique().comment('Only one account per ORCID')
			table.string('name').comment('User real name taken from ORCID record')
			table.json('profile').nullable()
			table.json('token').nullable()

			// admin users must be defined by config (see /config)
			table.boolean('is_admin').defaultTo(false)

			// user must be private by default because once they are public, they can't
			// become private again (see /client/views/profile)
			table.boolean('is_private').defaultTo(true)

			// these track the initial setup each user must do to take part in the platform
			// (see /client/views/profile)
			table.boolean('coc_accepted').defaultTo(false)
			table.boolean('privacy_setup').defaultTo(false)
		})
	})
}
