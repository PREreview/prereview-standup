var html = require('choo/html')

var button = require('../button')

module.exports = header

function header (state, emit) {
  var s = state.style.classes

  return html`
  
  <div class="header w-100 ${s.col} ${s.center} white">
    <div class="f3 mb4">PREreview: putting the 'peer' back into peer review</div>
    ${button(state, emit, { label: 'Submit a preprint', onclick: () => emit('pushState', '/submit') })}
  </div>
  
  `
}