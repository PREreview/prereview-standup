var html = require('choo/html')

var button = require('../button')

module.exports = function (opts) {
  return filterbox
  
  function filterbox (state, emit) {
    var filterbydate = state.filters.main.sort === 'date'

    var btn_date = button(state, emit, {
      label: 'most recent',
      classes: `ml1 f6 ${filterbydate ? 'bg-light-red' : 'bg-dark-gray'} white`,
      secondary: true
    })
    btn_date.onclick = () => emit('sort', { scope: 'main', sort: 'date' })

    var btn_reviews = button(state, emit, {
      label: 'most reviews',
      classes: `ml2 f6 ${!filterbydate ? 'bg-light-red' : 'bgdark-gray'} white`,
      secondary: true
    })
    btn_reviews.onclick = () => emit('sort', { scope: 'main', sort: 'reviews' })

    return html`
      <div class="flex flex-row tc justify-between items-center">
        ${btn_date} ${btn_reviews}
      </div>
    `
  }
}