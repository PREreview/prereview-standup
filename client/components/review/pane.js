var html = require('choo/html')
var css = require('sheetify')

var composer = require('./compose')
var display = require('./display')

module.exports = function view (state, emit, reviews) {
  return html`
  
  <div class="flex flex-column w-100 h-100 pa2 items-start overflow-y-scroll overflow-x-hidden">
    ${addreview(state, emit)}
    <h2 class="ph4">${reviews.length} reviews</h2>
    ${reviews.map(r => require('./display')(state, emit, r))}
  </div>
  
  `
}

var collapsed = css`

:host {
  height: 0;
}

`

var expanded = css`

:host {
  height: auto;
}

`

function addreview (state, emit) {
  var s = state.style.classes

  var collapser = html`
  
  <div class="w-100"></div>
  
  `

  var collapsee = html`
  
  <div class="w-100 ${collapsed}"></div>
  
  `

  collapser.onclick = () => {
    collapsee.classNames = collapsee.classNames
  }

  return html`
  
  <div class="w-100 ${s.col}">
    ${collapser}
    ${collapsee}
  </div>
  
  `
}