var html = require('choo/html')
var raw = require('choo/html/raw')

var composer = require('./compose')
var button = require('../button')

module.exports = function view (state, emit, opts) {
  var hrefparts = state.href.split('/')
  var uuid = hrefparts[hrefparts.length - 1]

  var el = html`
  <div class="flex flex-column w-100 h-100 pa2 items-start overflow-y-scroll overflow-x-hidden">
    ${opts.pdfblocked ? null : meta(state, emit, opts)}
    <div class="flex flex-row w-100 justify-start items-center pa3">
      <div class="pr2 f4 fw5 nowrap">Review in progress</h2>
    </div>
  </div>
  `

  fetchReview(uuid)

  function addView (data) {
    var view = require('./display')(state, emit, data.review)
    el.appendChild(view)
  }

  function fetchReview (uuid) {
    fetch(`/data/prereviews/share/${uuid}`).then(
      res => res.json()
    ).then(
      addView
    )
  }

  return el
}

function meta (state, emit, preprint) {
  var publisher = html`<div class="red i b">${preprint.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.join(', ')}</h2>`
  var abstract = raw(`<p class="mt1">${preprint.abstract}</p>`)
  return html`
    <div class="flex flex-column lh-copy pa3">
      ${publisher}
      <a class="black link" href="https://${preprint.identifier_type}.org/${preprint.identifier}" target="_blank">${title}</a>
      ${authors}
    </div>
  `
}
