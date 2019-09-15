var db = require('../../')

var PAGESIZE = 20

module.exports = searchPreprints

function searchPreprints (query) {
  var chain = db('preprints')

  if (query.string) {
    chain = chain.whereRaw(
      'document @@ to_tsquery(?)',
      query.string
    )
  }

  var chain = chain
    .orderBy('date_published', 'desc')
    .limit(PAGESIZE)
    .offset((query.page || 0) * PAGESIZE)
  
  console.log(chain.toSQL())

  return chain
}
