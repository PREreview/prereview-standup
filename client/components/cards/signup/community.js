var html = require('choo/html')
var css = require('sheetify')

module.exports = (state, emit) => {
  return html`
    <div class="flex flex-column justify-start">
      ${components.map(c => c.func(state, emit, c.opts))}
    </div>
  `
}

function buttonSwitch (state, emit, opts) {
  var btnclasses = 'pa3 ba br2 b--black-10 link dim'
  var selectedclasses = 'bg-red white b'
  var left = html`<div class="${btnclasses} ${selectedclasses}">${opts.l.content}</div>`

  left.onclick = e => {
    emit('pushState', '/agree-to-coc')
  }

  return html`
  <div class="flex flex-column items-center noselect measure">
    <h1 class="pt0 mt0">Welcome to PREreview</h1>
    <h2>Before you can use PREreview you must read and agree to abide by the community guidelines and code of conduct.</h2>
    <div class="flex flex-row justify-start pointer mw-50">
      ${left}
    </div>
  </div>
  `
}