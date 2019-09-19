var html = require('choo/html')
var raw = require('choo/html/raw')
var pdfUrl = require('../../lib/preprints/pdf-url')

var loaded = false

module.exports = function (state, emit, preprint) {
  var loading = html`

  <div class="flex flex-column absolute w-100 h-100 bg-white justify-center items-center" style="z-index: 9999;">
    <p>
      loading preprint...
    </p>
    ${require('../utils/loading')()}
  </div>
  
  `

  function loadingdone () {
    loading.remove()
  }

  var viewercontainer = preprint.pdfblocked ?
    blockedview(preprint) :
    html`<iframe class="w-100 h-100 bn"></div>`
   

  loadPreprintIntoIframe(preprint, viewercontainer, loadingdone)

  var container = html`

  <div class="flex flex-column w-100 h-100 justify-center items-center content-center relative">
    ${loading}
    ${viewercontainer}
  </div>
  
  `

  loaded = true

  return container
}

function blockedview (preprint) {
  var publisher = html`<div class="red i b">${preprint.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.list.map(a => a.fullName).join(', ')}</h2>`
  var abstract = raw(`<p class="mt1">${preprint.abstract}</p>`)

  var site = preprint.id.split('/')[0]
  var identifier = preprint.id.replace(site + '/', '')

  return html`
    <div class="flex flex-column h-100 justify-start lh-copy pa3">
      ${publisher}
      <a class="black link" href="https://${site}.org/${identifier}" target="_blank">${title}</a>
      ${authors}
      <h3 class="mb1">Abstract</h3>
      ${abstract}
      <h2>
        Unfortunately we cannot display the PDF of this preprint.
        You can access the preprint <a href="https://${site}.org/${identifier}" target="_blank">at the publisher's website</a>.
      </h2>
    </div>
  `
}

function loadPreprintIntoIframe (preprint, container, loadingdone) {
  console.log('preprint url loading')
  pdfUrl(preprint).then(
    docurl => {
      console.log('got preprint url:', docurl)
      var corsurl = `https://preprint-proxy.prereview.org/${docurl}`
      container.setAttribute('src', `/pdfviewer/web/viewer.html?file=${corsurl}`)
      setTimeout(loadingdone, 3000)
    }
  )
}