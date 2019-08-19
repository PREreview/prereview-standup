module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.dropTableIfExists('prereviews').then(function() {
		return db.schema.createTable('prereviews', table => {
			table.increments('id').primary()
			table.string('doi')
			table.text('content')
			table.string('author_id')
			table.date('date_created')
			table.index('doi', 'doiindex')
		})
	})
}