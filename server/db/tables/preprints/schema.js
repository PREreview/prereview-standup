module.exports = createTable

const db = require('../..')
const preprints = require('./index')

function createTable () {
  return db.schema.dropTableIfExists('preprints').then(function () {
    return db.schema.createTable('preprints', table => {
      table.string('id').primary()
      table.text('title')
      table.text('abstract')
      table.string('source')
      table.string('publisher')
      table.json('authors')
      table.date('date_created')
      table.date('date_published').index()
      table.date('date_indexed')
      table.text('authorstring')
      table.json('license')
      table.integer('n_prereviews').index()

      // fulltext index
      table.specificType('document', 'tsvector').index(null, 'gin')

      // default search index
      table.index(['n_prereviews', 'date_published'])
    })
  }).then(preprints.indexNewPreprints)
}
