module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.hasTable('prereviews').then(function(exists) {
		if (!exists) {
			return db.schema.createTable('prereviews', table => {
				table.increments()
				table.timestamps()
				table.json('data').nullable()
			})
		}
	})
}