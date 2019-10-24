var db = require('../../')
var fixPublisher = require('./fixPublisher')

var PAGESIZE = 20

module.exports = searchPreprints

// if query is null, the result is the most recently
// indexed preprints
function searchPreprints (query) {
  query = query || {}
  var currentpage = (query.page || 1)
  var sortBy = query.sortBy === 'date' ? 
    [ { column: 'date_published', order: 'desc' } ] :
    [ { column: 'n_prereviews', order: 'desc' }, { column: 'date_published', order: 'desc' } ]

  var chain = db('preprints')

  if (query.string) {
    chain = chain.whereRaw(
      'document @@ plainto_tsquery(?)',
      query.string
    )
  }

  var total = chain.clone().clearSelect().count('* as total').first()

  var chain = chain
    .orderBy(sortBy)
    .limit(PAGESIZE)
    .offset((currentpage - 1) * PAGESIZE)

  return Promise.all([
    total, chain
  ]).then(
    ([totalResult, chainResult]) => Promise.all(chainResult.map(fixPublisher)).then(
      results => Promise.resolve({
        query: query,
        total: totalResult.total,
        results: results.map(cleanResult),
        currentpage: currentpage,
        totalpages: Math.ceil(totalResult.total / PAGESIZE)
      })
    )
  )
}

// function getPreprintReviewCount (preprint) {
//   if (preprint && preprint.id) {
//     return db('prereviews')
//       .where({ preprint_id: preprint.id })
//       .count('* as n_prereviews')
//       .then(
//         counter => {
//           preprint.n_prereviews = parseInt(counter[0].n_prereviews)
//           return Promise.resolve(preprint)
//         }
//       )
//   } else {
//     return Promise.resolve(null)
//   }
// }

function cleanResult (r) {
  ['document', 'authorstring'].forEach(key => { delete r[key] })
  return r
}
