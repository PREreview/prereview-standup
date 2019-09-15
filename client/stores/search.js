module.exports = function (state, emitter) {
  state.searched = false
  state.searchResults = Object.values(state.preprints).slice(0, 22)
  state.search = {}

  emitter.on('DOMContentLoaded', async function () {
    state.search = {
      results: []
    }

    emitter.on('preprint-search:query', query => {
      fetch('/data/preprints/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      }).then(
        results => results.json()
      ).then(
        results => state.search.results = results
      )
    })

    emitter.on('preprint-search:results', results => {
      state.searched = true
      state.searchResults = results
      emitter.emit('render')
    })
  })
}
