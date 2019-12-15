var debounce = require('lodash/debounce')

module.exports = async (state, emitter) => {
  state.addPreprint = {
    modalVisible: false,
    searchResult: null
  }

  var search = debounce(runsearch, 400)

  // toggle modal visibility
  function toggleModal() {
    state.addPreprint.modalVisible = !state.addPreprint.modalVisible
    state.addPreprint.searchResult = null

    emitter.emit('render')
  }

  // search for preprint in DB by preprint id
  function findPreprints(pub_id) {
    search(pub_id)
  }

  // modal search function for DOI and arXiv preprints
  async function runsearch(pub_id) {
    // search for preprint on web by Id
    const foundPreprint = await fetchPreprintData(pub_id)

    if (foundPreprint) handleSearchResponse(foundPreprint)
  }

  // fetch publications by DOI on web
  const fetchPreprintData = pub_id =>
    new Promise(resolve =>
      fetch(`/data/preprints/getMetadata`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          publicationId: pub_id
        }
      })
        .then(response => resolve(response.json()))
        .catch(err => {
          console.log('err', err)
          resolve(null)
        })
    )

  // insert preprint DB
  function insertPreprint(preprint) {
    fetch('data/preprints/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preprint)
    })
      .then(res => res.json())
      .then(response => {
        if (response && response.preprintAlredyExists) {
          alert('The preprint you are trying to add already exists!')
        }
      })
      .catch(console.log)

    emitter.emit('addPreprint-modal:toggle')
    emitter.emit('render')
  }

  function handleSearchResponse(response) {
    state.addPreprint.searchResult = response
    emitter.emit('render')
  }

  emitter.on('DOMContentLoaded', function() {
    emitter.on('addPreprint-modal:toggle', toggleModal)
    emitter.on('addPreprint-search:query', findPreprints)
    emitter.on('addPreprint-modal:add-preprint', insertPreprint)
  })
}
