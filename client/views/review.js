var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')

var mainstyle = css`

:host {
  height: calc(100vh - 127px);
}

`

var blockedpublishers = [
  'biorxiv',
  'medrxiv'
]

var reviews = require('../fake/reviews')

var lastid

module.exports = function view (state, emit) {
  var id = state.href.split('/preprints/')[1].replace(/\/new$/, '')

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
    if (lastid && lastid.id === id) {
      return populatepanes(lastid.data)
    }

    fetch(`/data/preprints/${id}`).then(
      res => res.json()
    ).then(
      preprint => {
        if (preprint.publisher === 'Neuroscience') preprint.publisher = 'bioRxiv'
        preprint.pdfblocked = blockedpublishers.indexOf(preprint.publisher.toLowerCase()) > -1
        lastid = { id: id, data: preprint }
        populatepanes(preprint)
      }
    )
  }

  function populatepanes (preprint) {
    // preprint.reviews = reviews()
    left.appendChild(require('../components/preprint/viewer')(state, emit, preprint))
    right.appendChild(require('../components/review/pane')(state, emit, preprint))
  }

  return el
}
