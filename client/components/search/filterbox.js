var html = require('choo/html')
var css = require('sheetify')

var selectstyle = css`
  :host {
    display: block;
    font-size: 15px;
    font-family: sans-serif;
    font-weight: 400;
    color: black;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 16px;
    background-color: #FFF;
    height: 32px;
    border: 0;
    transition: 0.2s all;
    border: 1px solid black;
  }

  :host::-ms-expand {
    display: none;
  }

  :host:hover {
    border-color: #FF3333
  }

  :host option {
    font-weight: normal;
  }

  :host > img {
    width: 10px;
    margin-left: 5px;
  }
`

var ddstyle = css`
  :host {
    position: absolute; top: 35px; left: 0; width: auto;
  }
`

module.exports = function (opts) {
  return filterBtn
}


function filterBtn (state, emit) {
  var sortBtn = html`
    <button style="display: block; font-size: 15px; height: 32px;" class="${selectstyle} pointer">
      ${state.sort.desc}
      <img style="width: 10px; margin-left: 5px;" src="data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"/>
    </button>
  `

  var sortDropdown = html`
    <div id="search-sort-dd" style="position: absolute; top: 35px; left: 0; width: auto;" class="bg-white flex-column dark-gray nowrap ${ddstyle} dn">
    </div>
  `

  var sorts = [
    { by: 'date', desc: 'Most recent' },
    { by: 'reviews', desc: 'Most reviewed' },
    { by: 'n_requests', desc: 'Most requested' }
  ]

  sortBtn.onclick = e => {
    e.stopPropagation()
    var dd = document.querySelector('#search-sort-dd')
    dd.classList.toggle('dn')
    dd.classList.toggle('flex')
    return false
  }

  sorts.forEach(sort => {
    var option = html`<div class="flex flex-row items-center bg-white h2 pointer ba b--black-10 pa3">${sort.desc}</div>`
    option.onclick = () => {
      emit('sort', sort)
      var dd = document.querySelector('#search-sort-dd')
      dd.classList.remove('flex')
      dd.classList.add('dn')
    }
    sortDropdown.appendChild(option)
  })

  return html`
    <div class="flex flex-row" style="position: relative;">
      ${sortBtn}
      ${sortDropdown}
    </div>
  `
}
