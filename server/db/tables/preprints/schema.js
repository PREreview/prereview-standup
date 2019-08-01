module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.hasTable('preprints').then(function(exists) {
		if (!exists) {
			return db.schema.createTable('preprints', table => {
				table.increments()
				table.timestamps()
				table.json('data').nullable()
			})
		}
	})
}