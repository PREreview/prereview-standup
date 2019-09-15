var debounce = require('lodash/debounce')

module.exports = function (state, emitter) {
  state.searched = false
  state.searchResults = []
  state.search = {}

  var search = debounce(runsearch, 400)

  emitter.on('DOMContentLoaded', async function () {
    emitter.on('preprint-search:query', query => {
      search.cancel()
      search(query)
    })

    emitter.on('preprint-search:results', results => {
      state.searched = true
      state.searchResults = results
      emitter.emit('render')
    })
  })

  function runsearch (query) {
    fetch('/data/preprints/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: {
          string: query
        }
      })
    }).then(
      results => results.json()
    ).then(
      parseresults
    )
  }

  function parseresults (results) {
    results.forEach(
      r => {
        r.date_created = new Date(r.date_created)
        r.date_published = new Date(r.date_published)
        r.date_indexed = new Date(r.date_indexed)
        r.authors = r.authors.list
      }
    )
    state.search.results = results
    emitter.emit('preprint-search:results', results)
  }
}
