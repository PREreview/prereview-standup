var preprint = require('../cards/preprint')

var sample = require('lodash/sample')
var sortBy = require('lodash/sortBy')

function sortByDate (p) { return p.pubDate }
function sortByReviews (p) { return p.reviews }

module.exports = makepreprintlist

function makepreprintlist (opts) {
  return preprintlist
  
  function preprintlist (state, emit) {
    var preprints = state.searchResults.map(p => {
      p.reviews = sample([1, 2, 3, 4, 5])
      return p
    })
  
    if (preprints.length === 0) {
      return opts.noresultstxt || 'no results found - please try a different search :)'
    }
  
    var sortFn = state.filters.main.sort === 'date' ? sortByDate : sortByReviews
    var sorted = sortBy(preprints, sortFn).reverse()
  
    return sorted.map(p => preprint(state, emit, p))
  }
}
