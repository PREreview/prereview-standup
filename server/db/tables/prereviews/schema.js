module.exports = createTable

var db = require('../..')

function createTable () {
  return db.schema.dropTableIfExists('prereviews').then(function () {
    return db.schema.createTable('prereviews', table => {
      table.increments('prereview_id').primary()
      table.string('preprint_id').notNullable().references('preprints.id').index()
      table.string('doi').nullable()
      table.text('content').notNullable()
      table.integer('author_id').notNullable().references('users.user_id').index()
      table.timestamp('date_created').defaultTo(db.fn.now())
      table.boolean('is_hidden')
      table.index('doi', 'doiindex')
    })
  })
}
