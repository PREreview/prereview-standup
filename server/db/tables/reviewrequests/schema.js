module.exports = createTable

var db = require('../..')

function createTable () {
  return db.schema.dropTableIfExists('reviewrequests').then(function () {
    return db.schema.createTable('reviewrequests', table => {
      table.increments('id').primary()
      table.string('preprint_id').notNullable().references('preprints.id').index()
      table.integer('author_id').notNullable().references('users.user_id').index()
      table.timestamp('date_created').defaultTo(db.fn.now())
    })
  })
}
