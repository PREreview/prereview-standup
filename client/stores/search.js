var debounce = require('lodash/debounce')

module.exports = function (state, emitter) {
  state.searched = false
  state.searchResults = {
    total: 0,
    results: []
  }
  state.searchQuery = null

  var search = debounce(runsearch, 400)

  function updateAfterSort () {
    emitter.emit('preprint-search:result-page', state.searchQuery.page)
  }

  emitter.on('DOMContentLoaded', async function () {
    emitter.on('preprint-search:query', querystring => {
      search.cancel()
      var query = {
        string: querystring,
        sortBy: state.sort.by,
        page: 1
      }
      state.searchQuery = query
      search(query)
    })

    emitter.on('preprint-search:result-page', page => {
      state.searchQuery.sortBy = state.sort.by
      if (page === 'next') {
        state.searchQuery.page += 1
      } else if (page === 'prev') {
        state.searchQuery.page -= 1
      } else {
        state.searchQuery.page = page
      }

      search(state.searchQuery)
    })

    emitter.on('preprint-search:clear', results => {
      clear()
      emitter.emit('render')
    })

    emitter.on('preprint-search:latest', () => {
      clear()
      state.searchQuery = {
        string: null,
        sortBy: state.sort.by,
        page: 1
      }
      getLatest()
    })

    emitter.on('preprint-search:update-sort', updateAfterSort)

    emitter.emit('preprint-search:latest')
  })

  function clear () {
    state.searched = false
    state.searchQuery = null
    state.searchResults = {
      total: 0,
      results: []
    }
  }

  function runsearch (query) {
    fetch('/data/preprints/search', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    }).then(
      results => results.json()
    ).then(
      handleSearchResponse
    )
  }

  function getLatest () {
    fetch('/data/preprints/latest', {
      headers: {
        Accept: 'application/json'
      }
    }).then(
      results => results.json()
    ).then(
      handleSearchResponse
    )
  }

  function handleSearchResponse (response) {
    response.results.forEach(
      r => {
        r.date_created = new Date(r.date_created)
        r.date_published = new Date(r.date_published)
        r.date_indexed = new Date(r.date_indexed)
        r.authors = r.authors.list
      }
    )
    state.searchResults = response
    emitter.emit('render')
  }
}
