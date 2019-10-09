var html = require('choo/html')
var css = require('sheetify')

var selectstyle = css`

:host {
  display: block;
	font-size: 14px;
	font-family: sans-serif;
	font-weight: 400;
	color: #444;
	line-height: 1.3;
	padding: .6em 1.4em .5em .8em;
	width: auto;
	max-width: 30%; /* useful when width is set to anything other than 100% */
	box-sizing: border-box;
	margin: 0;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
  linear-gradient(to bottom, #d5d4d4 0%, #d5d4d4 100%);
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
  background-size: .65em auto, 100%;
}

:host::-ms-expand {
  display: none;
}

:host:hover {
  border-color: #ff3333;
}

:host:focus {
  border-color: #ff3333;
  color: black; 
  outline: none;
}

:host option {
  font-weight: normal;
}

`

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
