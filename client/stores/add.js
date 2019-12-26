var debounce = require('lodash/debounce')

// Add Prereview || Request Review
module.exports = async (state, emitter) => {
  state.add = {
    modalVisible: false,
    searchResult: null,
    foundInDB: false,
    foundOnWeb: false
  }

  var search = debounce(runsearch, 400)

  // toggle modal visibility
  function toggleModal() {
    state.add.modalVisible = !state.add.modalVisible
    state.add.searchResult = null
    state.add.foundInDB = false
    state.add.foundOnWeb = false

    emitter.emit('render')
  }

  // search for preprint by preprint id
  function findPreprints(pub_id) {
    search(pub_id)
  }

  // modal search function for DOI and arXiv preprints
  async function runsearch(pub_id) {
    // search for preprint in DB by Id
    let foundPreprint = await fetchPreprintInDB(pub_id)

    // search for preprint on web by Id
    if(!foundPreprint) {
      foundPreprint = await fetchPreprintOnWeb(pub_id)
    }

    handleSearchResponse(foundPreprint)
  }

  // search for preprint in DB
  const fetchPreprintInDB = pub_id =>
    new Promise(resolve =>
      // fetch for DOIs in DB
      fetch(`/data/preprints/doi/${pub_id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(results => results.json())
        .then(data => {
          // check if DOI was found else search for arXiv
          if (data) {
            resolve(data)
          } else {
            // search for arXivs in DB
            return fetch(`/data/preprints/arxiv/${pub_id}`, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            })
              .then(data => data.json())
              .then(resolve)
          }
        })
        .catch(err => {
          console.log('err', err)
          resolve(null)
        })
    )

  // fetch publications by DOI on web
  const fetchPreprintOnWeb = pub_id =>
    new Promise(resolve =>
      fetch(`/data/preprints/getMetadata`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          publicationId: pub_id
        }
      })
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(err => {
          console.log('err', err)
          resolve(null)
        })
    )

  // insert preprint DB
  function insertPreprint(preprint) {
    fetch('/data/preprints/insert', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preprint)
    })
      .then(res => res.json())
      .then(response => {
        emitter.emit('render')
        if (response && response.preprintAlredyExists) {
          alert('The preprint you are trying to add already exists!')
        }
      })
      .catch(console.log)

    emitter.emit('add-modal:toggle')
    emitter.emit('render')
  }

  // add review request in DB
  function insertReviewRequest(requestreview) {
    fetch('/data/reviewrequests/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestreview)
    })
      .then(res => res.json())
      .then(response => {
        if (response && response.userAlreadyRequested) {
          alert('You already requested a review for this preprint!')
        }
      })
      .catch(console.log)

    emitter.emit('add-modal:toggle')
    emitter.emit('render')
  }

  // set search data into state
  function setData(data) {
    state.add.searchResult = data
    state.add.searchQuery = data.id

    emitter.emit('render')
  }

  function handleSearchResponse(response) {
    state.add.searchResult = response
    emitter.emit('render')
  }

  emitter.on('DOMContentLoaded', function() {
    emitter.on('add-modal:toggle', toggleModal)
    emitter.on('add-search:query', findPreprints)
    emitter.on('add-modal:set-data', setData)
    emitter.on('add-modal:insert-preprint', insertPreprint)
    emitter.on('add-modal:insert-request', insertReviewRequest)
  })
}
