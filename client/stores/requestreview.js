var debounce = require('lodash/debounce')

module.exports = async (state, emitter) => {
  state.requestreview = {
    modalVisible: false,
    searchQuery: null,
    searchResult: null
  }

  var search = debounce(runsearch, 400)

  // toggle modal visibility
  function toggleModal() {
    state.requestreview.modalVisible = !state.requestreview.modalVisible
    state.requestreview.searchResult = null
    state.requestreview.searchQuery = null

    emitter.emit('render')
  }

  // search for preprint in DB by preprint id
  function findPreprints(preprint_id) {
    state.requestreview.searchQuery = preprint_id

    search(preprint_id)
  }

  // modal search function for DOI and arXiv preprints
  function runsearch(preprint_id) {
    // fetch for DOIs in DB
    fetch(`/data/preprints/doi/${preprint_id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(results => results.json())
      .then(data => {
        // check if DOI was found else search for arXiv
        if (data) {
          return handleSearchResponse(data)
        } else {
          // search for arXivs in DB
          return fetch(`/data/preprints/arxiv/${preprint_id}`, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(data => data.json())
            .then(handleSearchResponse)
        }
      })
      .catch(console.log)
  }

  // set search data into state
  function setData(data) {
    state.requestreview.searchResult = data
    state.requestreview.searchQuery = data.id

    emitter.emit('render')
  }

  // add request in DB
  function addRequest(requestreview) {
    fetch('/data/reviewrequests/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestreview)
    })
      .then(res => res.json())
      .catch(console.log)

    emitter.emit('requestreview-modal:toggle')
    emitter.emit('render')
  }

  function handleSearchResponse(response) {
    response.date_created = new Date(response.date_created)
    response.date_published = new Date(response.date_published)
    response.date_indexed = new Date(response.date_indexed)
    response.authors = response.authors.list

    state.requestreview.searchResult = response

    emitter.emit('render')
  }

  emitter.on('DOMContentLoaded', function() {
    emitter.on('requestreview-modal:toggle', toggleModal)
    emitter.on('requestreview-search:query', findPreprints)
    emitter.on('requestreview-modal:set-data', setData)
    emitter.on('requestreview-modal:add-request', addRequest)
  })
}
