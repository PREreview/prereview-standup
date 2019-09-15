var debounce = require('lodash/debounce')

module.exports = function (state, emitter) {
  state.searched = false
  state.searchResults = Object.values(state.preprints).slice(0, 22)
  state.search = {}

  emitter.on('DOMContentLoaded', async function () {
    state.search = {
      results: []
    }

    emitter.on('preprint-search:query', query => {
      var search = debounce(runsearch, 200)

      search(query)

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
          results => {
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
        )
      }
    })

    emitter.on('preprint-search:results', results => {
      state.searched = true
      state.searchResults = results
      emitter.emit('render')
    })
  })
}
