var html = require('choo/html')
var input = require('../form/typeahead')

module.exports = header

function header (state, emit) {
  var searchopts = {
    id: 'main-search-input',
    entries: Object.values(state.preprints),
    container: {
      class: 'mt2 flex flex-column items-center bg-white dark-gray w-70 f4'
    },
    input: {
      class: 'flex bg-white dark-gray b--dark-gray ba br-pill pa3 pl4 w-100',
      placeholder: 'Search by title, DOI, author, etc...'
    },
    onresults: results => emit('preprint-search:results', results)
  }
  
  var s = state.style.classes
  var search = input(state, emit, searchopts)

  return html`
  
  <div class="header w-100 ${s.col} ${s.center} flex flex-column pa5 justify-center items-center dark-gray">
    <h2>Search preprints to read or review.</h2>
    ${search}
    <div class="mt6 w-100 bb"></div>
  </div>
  
  `
}