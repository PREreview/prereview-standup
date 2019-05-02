var html = require('choo/html')
var input = require('../form/typeahead')

module.exports = header

// <div class="header w-100 ${s.col} ${s.center} white pa5 flex flex-row justify-center items-center">
//   <button class="white f4 link dim ma2 pa3 bg-red bw0">find a preprint to review</button>
//   <div class="dark-gray f5 ma2">or</div>
//   <button class="white ma2 link dim f4 pa3 bg-red bw0">request a review</button>
// </div>

function header (state, emit) {
  var top = state.user ? null : html`
    <a href="/login" class="mb5 flex justify-center content-center items-center v-mid bn ph3 white h3 f4 bg-light-red link dim br1 outline-0">join the community</button>
  `

  var searchopts = {
    id: 'main-search-input',
    entries: Object.values(state.preprints),
    container: {
      class: 'flex flex-column bg-white dark-gray w-50'
    },
    input: {
      class: 'flex bg-white dark-gray b--dark-gray ba br-pill pa3 pl4 w-100',
      placeholder: 'search preprints by DOI, URL, title authors...'
    },
    onresults: results => emit('preprint-search:results', results)
  }
  
  var s = state.style.classes
  var search = input(state, emit, searchopts)

  return html`
  
  <div class="header w-100 ${s.col} ${s.center} flex flex-column pa5 pb2 justify-center items-center dark-gray">
    <h2 class="lh-title f2 fw4 mb5">PREreview: help us change the <i>who</i>, <i>when</i>, and <i>how</i> of peer review.</h2>
    ${top}
    ${search}
  </div>
  
  `
}