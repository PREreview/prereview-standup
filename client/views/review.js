var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')

var mainstyle = css`

:host {
  height: calc(100vh - 127px);
}

`

var reviews = require('../fake/reviews')

var lastdoi

module.exports = function view (state, emit) {
  var doiparts = state.href.split('/preprints/doi/')[1].split('/').slice(0, 2)
  var doi = `${doiparts[0]}/${doiparts[1]}`

  var left = html`<div class="flex flex-column w-50"></div>`
  var right = html`<div class="flex flex-column w-50"></div>`

  var el = html`
  
  <body class="vh-100 w-100 overflow-hidden">
    ${nav(state, emit)}
    <div class="w-100 flex flex-row ${mainstyle}">
      ${left}
      ${right}
    </div>
  </body>
  
  `

  fetchAndLoad()

  function fetchAndLoad () {
    if (lastdoi && lastdoi.doi === doi) return populatepanes(lastdoi.data)
  
    fetch(`/data/preprints/doi/${doi}`).then(
      res => res.json()
    ).then(
      doidata => {
        lastdoi = { doi: doi, data: doidata }
        populatepanes(doidata)
      }
    )
  }

  function populatepanes (doidata) {
    console.log('DOI data returned', doidata)
    doidata.reviews = reviews()
    left.appendChild(require('../components/preprint/viewer')(state, emit, doidata))
    right.appendChild(require('../components/review/pane')(state, emit, doidata))
  }

  return el
}
