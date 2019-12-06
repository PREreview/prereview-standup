module.exports = createTable

var db = require('../..')

function createTable () {
  return db.schema.dropTableIfExists('reviewrequests').then(function () {
    return db.schema.createTable('reviewrequests', table => {
      table.increments('id').primary()
      table.string('prereview_id').notNullable().references('prereviews.prereview_id').index()
      table.integer('author_id').notNullable().references('users.user_id').index()
      table.timestamp('date_created').defaultTo(db.fn.now())
    })
  })
}
