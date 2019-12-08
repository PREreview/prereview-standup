var db = require('../../')
var fixPublisher = require('./fixPublisher')
var { getReviewRequests } = require('../reviewrequests/')
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
    chain = chain.whereRaw('document @@ plainto_tsquery(?)', query.string)
  }

  var total = chain.clone().clearSelect().count('* as total').first()

  var chain = chain
    .orderBy(sortBy)
    .limit(PAGESIZE)
    .offset((currentpage - 1) * PAGESIZE)

  return Promise.all([total, chain])
    .then(async ([totalResult, chainResults]) => {
      for (let i = 0; i < chainResults.length; i++) {
        await fixPublisher(chainResults[i])
        await getReviewRequests({ preprint_id: chainResults[i].id }).then(
          n_requests => (chainResults[i].n_requests = n_requests.length)
        )
      }
      return { totalResult, chainResults }
    })
    .then(({ totalResult, chainResults }) =>
      Promise.resolve({
        query: query,
        total: totalResult.total,
        results: chainResults.map(cleanResult),
        currentpage: currentpage,
        totalpages: Math.ceil(totalResult.total / PAGESIZE)
      })
    )
    .catch(console.log)
}

function cleanResult (r) {
  ['document', 'authorstring'].forEach(key => { delete r[key] })
  return r
}