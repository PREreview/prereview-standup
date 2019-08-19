module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.dropTableIfExists('preprints').then(function(exists) {
		// if (!exists) {
			return db.schema.createTable('preprints', table => {
				table.increments('id').primary()
				table.string('doi')
				table.text('title')
				table.text('abstract')
				table.string('source')
				table.string('publisher')
				table.json('authors')
				table.date('date_created')
				table.date('date_published')
				table.date('date_indexed')
				table.text('authorstring')
				table.index(['doi'], 'doiindex')
			})
		// 	}
	})
}