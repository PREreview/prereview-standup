var html = require('choo/html')
var css = require('sheetify')

module.exports = (state, emit) => {
  return html`
    <div class="flex flex-column justify-start">
      ${agreeButton(state, emit)}
    </div>
  `
}

function agreeButton (state, emit, opts) {
  var left = html`<div class="pa3 ba br2 b--black-10 link dim bg-red white b">Agree</div>`

  left.onclick = e => {
    emit('user:accept-coc')
  }

  return html`
  <div class="flex flex-column items-center noselect measure">
    <h2>Before you can use PREreview you must read and agree to abide by <a href="/docs/code_of_conduct" target="_blank">code of conduct</a>.</h2>
    <div class="flex flex-row justify-start pointer mw-50">
      ${left}
    </div>
  </div>
  `
}