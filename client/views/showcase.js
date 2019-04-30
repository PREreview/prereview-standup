var html = require('choo/html')
var button = require('../components/button')

module.exports = function (state, emit) {
  var s = state.style.classes

  var make = (component, opts) => {
    return component(state, emit, opts)
  }

  return html`
  
  <body class="w-100 lh-copy">
    <div class="${s.col}">
      <div class="${s.row} w-100">
        <div class="f3 w-20">
          <h2>plain button</h2>
        </div>
        <div class="${s.row} ${s.center} w-80">
          ${make(button, { label: 'button label', classes: s.secondary })}
        </div>
      </div>
    </div>
  </body>
  
  `
}