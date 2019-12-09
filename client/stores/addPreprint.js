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
    // search for DOIs on web
    const foundDoi = await fetchDoi(pub_id)

    if (foundDoi) {
      var authorstring = ''
      var authors = {
        list: {
          list: []
        }
      }

      for (var i = 0; i < foundDoi.author.length; i++) {
        foundDoi.author[
          i
        ].fullName = `${foundDoi.author[i].given} ${foundDoi.author[i].family}`
        authors.list.list.push(foundDoi.author[i])
        authorstring.concat(foundDoi.author[i].fullName)
      }

      var preprint = {
        id: `doi/${foundDoi.DOI}`,
        title: foundDoi.title[0],
        abstract: foundDoi.abstract,
        source: foundDoi.source,
        publisher: foundDoi.publisher,
        authors,
        date_created: foundDoi.created['date-time'],
        date_published: foundDoi.deposited['date-time'],
        date_indexed: foundDoi.indexed['date-time'],
        authorstring,
        license: foundDoi.license ? foundDoi.license : null,
        n_prereviews: 0,
        document: null
      }

      handleSearchResponse(preprint)
    } else {
      // search for arXivs on web
      const foundArXiv = await fetchArXiv(pub_id)
    }
  }

  // fetch publications by DOI on web
  const fetchDoi = pub_id =>
    new Promise(resolve =>
      fetch(`https://api.crossref.org/works/${pub_id}`)
        .then(response => response.json())
        .then(data => resolve(data.message))
        .catch(err => resolve(null))
    )

  // fetch publications by arXiv on web
  const fetchArXiv = pub_id =>
    new Promise(resolve =>
      fetch(`https://api.altmetric.com/v1/arxiv/${pub_id}`, { mode: 'no-cors' })
        .then(results => console.log('results.json', results))
        .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
        .then(data => console.log('data', data))
        .catch(e => resolve(false))
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
