var html = require('choo/html')

var nav = require('../components/nav')
var header = require('../components/home/header')
var filterbox = require('../components/home/filterbox')
var preprintlist = require('../components/home/preprintlist')
var addButton = require('../components/home/add/button')
var addModal = require('../components/home/add/modal')

var TITLE = 'PREreview2 | find'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var mobileWidth = "w-90"
  var desktopWidth = "w-70"

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray">
      ${addModal(state, emit)}
      ${nav(state, emit)}
      ${header(state, emit)}

      <div class=${state.dimensions.width > 1000 ? desktopWidth : mobileWidth}>
        <div class="flex flex-row w-100 justify-end">
          ${addButton(state, emit)}
          ${filterbox(state, emit)}
        </div>

        <div class="flex flex-column w-100 ">
            ${preprintlist(state, emit)}
            ${getResultString(state, emit)}
            ${pagingbuttons(state, emit)}
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

  var querydiv = querystring
  ? html`<div class="flex flex-row">Query: "<span class="ttn">${querystring}</span>"</div>`
    : null

  return html`
    <div class="flex items-center ttu red tracked f6 b">
      <div class="flex flex-column">
        ${querydiv}
        <div class="flex flex-row">${resultstring}</div>
      </div>
    </div
  `
}

function pagingbuttons (state, emit) {
  var btnclasses = 'h2 pa2 ba br2 b--black-10 link dim bg-white dark-gray'
  var left = html`<div class="${btnclasses} br--left"> Prev </div>`
  var right = html`<div class="${btnclasses} br--right"> Next </div>`

  left.onclick = () => emit('preprint-search:result-page', 'prev')
  right.onclick = () => emit('preprint-search:result-page', 'next')

  return html`
    <div class="flex flex-row justify-center items-center pointer w-100 h2 mb4">
      ${left}
      ${right}
    </div>
  `
}
