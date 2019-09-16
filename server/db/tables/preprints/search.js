var db = require('../../')

var PAGESIZE = 20

module.exports = searchPreprints

// if query is null, the result is the most recently
// indexed preprints
function searchPreprints (query) {
  query = query || {}
  var currentpage = (query.page || 1)

  var chain = db('preprints')

  if (query.string) {
    chain = chain.whereRaw(
      'document @@ plainto_tsquery(?)',
      query.string
    )
  }

  var total = chain.clone().clearSelect().count('* as total').first()

  var chain = chain
    .orderBy('date_published', 'desc')
    .limit(PAGESIZE)
    .offset((currentpage - 1) * PAGESIZE)

  return Promise.all([
    total, chain
  ]).then(
    ([totalResult, chainResult]) => {
      return Promise.resolve({
        query: query,
        total: totalResult.total,
        results: chainResult.map(cleanResult),
        currentpage: currentpage,
        totalpages: Math.ceil(totalResult.total / PAGESIZE)
      })
    }
  )
}

function cleanResult (r) {
  ['document', 'authorstring'].forEach(key => { delete r[key] })
  return r
}
