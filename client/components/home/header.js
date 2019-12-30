var html = require('choo/html')
var input = require('../form/typeahead')

module.exports = header

function header (state, emit) {
  var searchInputMobile = 'mt2 flex flex-column items-center bg-white dark-gray w-90 f4'
  var searchInputDesktop = 'mt2 flex flex-column items-center bg-white dark-gray w-70 f4'

  var searchopts = {
    id: 'main-search-input',
    entries: [],
    container: {
      class: state.dimensions.width > 700 ? searchInputDesktop : searchInputMobile
    },
    input: {
      class: 'flex bg-white dark-gray b--dark-gray ba br-pill pa3 pl4 w-100',
      placeholder: 'Search preprints with PREreviews or requests for review by DOI, arXiv ID or title'
    },
    onsearch: val => emit('preprint-search:query', val),
    onresults: results => emit('preprint-search:results', results)
  }

  var s = state.style.classes
  var search = input(state, emit, searchopts)

  return html`
    <div style=${state.dimensions.width > 700 ? null : "text-align: center;"} class="header w-100 ${s.col} ${s.center} flex flex-column pt4 pb4 justify-center items-center dark-gray">
      <h2>A platform for the crowdsourcing of preprint reviews.</h2>
      ${search}
    </div>
  `
}