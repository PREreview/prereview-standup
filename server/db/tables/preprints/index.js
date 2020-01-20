const db = require('../..')

const fixPublisher = require('./fixPublisher')
const { getPreprintReviews } = require('../prereviews')

function insertPreprint (preprint) {
  return db('preprints').insert(preprint)
}

function getBarePreprintById (preprintId) {
  return db('preprints')
    .where({ id: preprintId })
    .first()
}

function getPreprint (preprint) {
  return db('preprints')
    .where(preprint)
    .first()
    .then(fixPublisher)
    .then(getPreprintReviews)
}

function indexNewPreprints () {
  console.log('indexing new preprints')
  var tsvectorjoin = ' || \'  . \' || '
  var tsvectorfields = [
    'title',
    'abstract',
    'authorstring'
  ]
  var preventnull = fieldname => `coalesce(${fieldname},'')`
  var tsvectorinput = tsvectorfields.map(preventnull).join(tsvectorjoin)
  var fulltextquery = `to_tsvector(${tsvectorinput}) WHERE document is NULL;`

  return db.raw(`UPDATE "preprints" SET document = ${fulltextquery}`)
}

module.exports = {
  getPreprint,
  indexNewPreprints,
  insertPreprint,
  getBarePreprintById,
  searchPreprints: require('./search')
}
