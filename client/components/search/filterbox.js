var html = require('choo/html')
var css = require('sheetify')

var selectstyle = css`

:host {
  outline: none;
  display: block;
  font-weight: 300;
  color: black;
  line-height: 1.3;
  padding: .6em 1.4em .5em .8em;
  width: 150px;
  box-sizing: border-box;
  margin: 0;
  border: 0;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: .5em;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #d5d4d4;
}

:host::-ms-expand {
  display: none;
}

:host:hover {
  border-color: #888;
}

:host:focus {
  border-color: #aaa;
  box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
  box-shadow: 0 0 0 3px -moz-mac-focusring;
  color: white; 
  outline: none;
}

:host option {
  font-weight:normal;
}

`

var button = require('../button')

module.exports = function (opts) {
  return filterbox
  
  function filterbox (state, emit) {
    var filterbydate = state.filters.main.sort === 'date'

    var recent = html`
      <option value="1">Most recent</option>
    `

    var popular = html`
      <option value="2">Most popular</option>
    `

    var select = html`
  
    <select class="fr ${selectstyle}">
      <option value="0">Sort by...</option>
      ${recent}
      ${popular}
    </select>
    
    `

    recent.onclick = () => emit('sort', { scope: 'main', sort: 'date' })
    popular.onclick = () => emit('sort', { scope: 'main', sort: 'reviews' })

    return select
  }
}