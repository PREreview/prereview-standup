var html = require('choo/html')

var button = require('../button')
var input = require('../form/typeahead')

module.exports = function (opts) {
  return filterbox
  
  function filterbox (state, emit) {
    var filterbydate = state.filters.main.sort === 'date'

    var btn_date = button(state, emit, {
      label: 'most recent',
      classes: `ml1 f6 ${filterbydate ? 'bg-light-red' : 'bg-mid-gray'} white`,
      secondary: true
    })
    btn_date.onclick = () => emit('sort', { scope: 'main', sort: 'date' })

    var btn_reviews = button(state, emit, {
      label: 'most reviews',
      classes: `ml2 f6 ${!filterbydate ? 'bg-light-red' : 'bg-mid-gray'} white`,
      secondary: true
    })
    btn_reviews.onclick = () => emit('sort', { scope: 'main', sort: 'reviews' })

    var searchopts = {
      id: 'main-search-input',
      entries: Object.values(state.preprints),
      container: {
        class: 'bg-white dark-gray'
      },
      input: {
        class: 'bg-white dark-gray b--dark-gray ba pa2',
        placeholder: 'filter preprints'
      },
      onresults: results => emit('preprint-search:results', results)
    }
    var search = input(state, emit, searchopts)

    return html`
      <div class="flex flex-row tc justify-between items-center">
        <div class="flex flex-row mh3" style="flex-grow: 1;">
          ${search}
        </div>
        Sort by: ${btn_date} ${btn_reviews}
      </div>
    `
  }
}