var html = require('choo/html')

var nav = require('../components/nav')
var header = require('../components/home/header')
var filterbox = require('../components/home/filterbox')
var preprintlist = require('../components/home/preprintlist')

var TITLE = 'PREreview2 | find'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var resultstr = getResultString(state, emit)

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray">
      ${nav(state, emit)}
      ${header(state, emit)}
      <div class="w-70 flex flex-row">
        <div class="content fl w-100 pa2 f7 lh-copy">
          <div class="actions flex flex-row justify-between pv0" style="position: relative;">
            <div class="flex items-center ttu red tracked f6 b mr3">
              ${resultstr}
            </div>
            ${pagingbuttons(state, emit)}
            ${filterbox(state, emit)}
          </div>
          <div class="articles">
            ${preprintlist(state, emit)}
          </div>
        </div>
      </div>
    </body>
  `
}

function getResultString (state, emit) {
  var querystring
  var resultstring

  if (state.searchQuery) {
    querystring = state.searchResults.query && state.searchResults.query.string

    // the results are from a user search
    if (!state.searchResults.total) {
      resultstring = 'No results found'
    } else {
      var currentPage = state.searchResults.currentpage
      var totalPages = state.searchResults.totalpages
      var showingResults = state.searchResults.results.length
      var totalResults = state.searchResults.total

      resultstring = `Page ${currentPage} of ${totalPages} (${showingResults} of ${totalResults} total results)`
    }
  } else {
    // the results are the default view
    resultstring = '20 most recently published'
  }

  var querydiv = querystring ?
    html`<div class="flex flex-row">Query: "<span class="ttn">${querystring}</span>"</div>` :
    null

  return html`
  <div class="flex flex-column">
    ${querydiv}
    <div class="flex flex-row">${resultstring}</div>
  </div>
  `
}

function pagingbuttons (state, emit) {
  var btnclasses = 'h2 pa2 ba br2 b--black-10 link dim bg-white dark-gray'
  var leftclasses = 'br--left'
  var rightclasses = 'br--right'
  var left = html`<div class="${btnclasses} ${leftclasses}">Prev</div>`
  var right = html`<div class="${btnclasses} ${rightclasses}">Next</div>`

  left.onclick = () => emit('preprint-search:result-page', 'prev')
  right.onclick = () => emit('preprint-search:result-page', 'next')

  return html`
    <div class="flex flex-row justify-center items-center pointer w-100 h2" style="position: absolute;">
      ${left}
      ${right}
    </div>
  `
}