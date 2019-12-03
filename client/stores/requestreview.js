var debounce = require('lodash/debounce')

module.exports = async (state, emitter) => {
  state.requestreview = {
    modalVisible: false,
    searchQuery: null,
    searchResult: null
  }

  var search = debounce(runsearch, 400)

  function toggleModal() {
    // clear();
    state.requestreview.modalVisible = !state.requestreview.modalVisible
    emitter.emit('render')
  }

  function findPreprints(querystring) {
    // clear();

    state.requestreview.searchQuery = querystring

    search(querystring)
  }

  function runsearch(querystring) {
    fetch(`/data/preprints/doi/${querystring}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(results => results.json())
      .then(handleSearchResponse)
  }

  function setData(data) {
    state.requestreview.searchResult = data
    state.requestreview.searchQuery = data.id

    emitter.emit('render')
  }

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
      .catch(err => console.log(err))

    // clear();
    emitter.emit('requestreview-modal:toggle')
    emitter.emit('render')
  }

  // function clear() {
  //   state.requestreview.searchQuery = null;
  //   state.requestreview.searchResult = null;
  // }

  function handleSearchResponse(response, query) {
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
