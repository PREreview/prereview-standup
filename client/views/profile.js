var html = require('choo/html')

var nav = require('../components/Navigation')
var userSummary = require('../components/cards/profile')
var button = require('../components/button')
var input = require('../components/form/input')
var preprint = require('../components/cards/preprint')

var sortBy = require('lodash/sortBy')

var TITLE = 'PREreview profile'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (!state.user.loggedIn) {
    return html`
      <body class="flex flex-column w-100 justify-center items-center space-around">
        ${nav(state, emit)}
        <div class="w-60 flex flex-row">
          <div class="w-100 ${state.style.classes.col} ${state.style.classes.center}">
            <h2>Oops! You must <a href="/login">log in</a> to view your profile.</h2>
          </div>
        </div>
      </body>
    `
  }

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}
      <div class="w-60 flex flex-row">
        <div class="content fl w-100 pa2 mt4 f7 lh-copy">
          <div class="actions flex justify-between pv3">
            <div class="ttu tracked">
              Your preprints
            </div>
            ${filterbox(state, emit)}
          </div>
          <div class="articles">
            ${preprints(state, emit)}
          </div>
        </div>
      </div>
    </body>
  `
}

function filterbox (state, emit) {
  var btn_date = button(state, emit, { label: 'most recent', classes: 'ml1', secondary: true })
  btn_date.onclick = () => emit('sort', { scope: 'main', sort: 'date' })

  var btn_reviews = button(state, emit, { label: 'most reviews', classes: 'ml1', secondary: true })
  btn_date.onclick = () => emit('sort', { scope: 'reviews', sort: 'date' })

  var search = input(state, emit, { type: 'search', placeholder: 'filter' })
  search.onsubmit = () => { console.log('search submit', search.value)}

  return html`
  
  <div class="flex flex-row tc justify-end items-center">
    Sort by: ${btn_date} ${btn_reviews}
    <div class="ml1">
    ${search}
    </div>
  </div>
  
  `
}

function sortByDate (p) { return p.pubDate }

function sortByReviews (p) { return p.reviews ? p.reviews.length : 0 }

function preprints (state, emit) {
  var preprints = state.getpreprints(state.filters.main.filter)

  var sortFn = state.filters.main.sort === 'date' ? sortByDate : sortByReviews
  var sorted = sortBy(preprints, sortFn)

  return sorted.map(p => preprint(state, emit, p))
}