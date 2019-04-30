var html = require('choo/html')

var nav = require('../components/Navigation')
var header = require('../components/home/header')
var button = require('../components/button')
var input = require('../components/form/input')
var preprint = require('../components/cards/preprint')

var sample = require('lodash/sample')

var sortBy = require('lodash/sortBy')

var TITLE = 'prereview-standup - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}
      ${header(state, emit)}
      <div class="w-60 flex flex-row">
        <div class="content fl w-100 pa2 mt4 f7 lh-copy">
          <div class="actions flex justify-between pv3">
            <div class="ttu tracked">
              
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
  btn_reviews.onclick = () => emit('sort', { scope: 'main', sort: 'reviews' })

  var search = input(state, emit, { type: 'search', placeholder: 'search for preprints...' })
  search.onsubmit = () => {
    console.log('search submit', search.value)
    emit('sort', { scope: 'main', filter: search.value.toLowerCase().trim() })
  }

  return html`
  
  <div class="flex flex-row tc justify-end items-center">
    Sort by: ${btn_date} ${btn_reviews}
    <div class="ml3">
    ${search}
    </div>
  </div>
  
  `
}

function sortByDate (p) { return p.pubDate }

function sortByReviews (p) { return p.reviews }

function preprints (state, emit) {
  var preprints = state.getpreprints(state.filters.main.filter).map(p => {
    p.reviews = sample([1, 2, 3, 4, 5])
    return p
  })

  if (preprints.length === 0) {
    return 'no results found - please try a different search :)'
  }

  var sortFn = state.filters.main.sort === 'date' ? sortByDate : sortByReviews
  var sorted = sortBy(preprints, sortFn).reverse()

  return sorted.map(p => preprint(state, emit, p))
}