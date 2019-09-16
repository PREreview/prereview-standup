module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.dropTableIfExists('prereviews').then(function() {
		return db.schema.createTable('prereviews', table => {
			table.increments('id').primary()
			table.integer('preprint_id').notNullable()
			table.string('doi').nullable()
			table.text('content').notNullable()
			table.integer('author_id').notNullable()
			table.timestamp('date_created').defaultTo(db.fn.now())
			table.index('doi', 'doiindex')
		})
	})
}