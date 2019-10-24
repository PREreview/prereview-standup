var preprint = require('../cards/preprint')

var sortBy = require('lodash/sortBy')

function sortByDate (p) { return p.pubDate }
function sortByReviews (p) { return p.reviews }

module.exports = makepreprintlist

function makepreprintlist (opts) {
  return preprintlist

  function preprintlist (state, emit) {
    var preprints = state.searchResults ? state.searchResults.results : []

    if (preprints.length === 0) {
      return opts.noresultstxt || 'no results found - please try a different search :)'
    }

    return preprints.map(p => preprint(state, emit, p))
  }
}
