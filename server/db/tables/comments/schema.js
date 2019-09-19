module.exports = createTable

var db = require('../..')

function createTable () {
	return db.schema.dropTableIfExists('comments').then(function() {
		return db.schema.createTable('comments', table => {
			table.increments('comment_id').primary()
			table.integer('prereview_id').notNullable().references('prereviews.prereview_id').index()
			table.text('content').notNullable()
			table.integer('author_id').notNullable().references('users.user_id').index()
			table.timestamp('date_created').defaultTo(db.fn.now())
		})
	})
}