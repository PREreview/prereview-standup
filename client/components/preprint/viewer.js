var html = require('choo/html')
var viewer = require('../pdf')

var loaded = false

module.exports = function (state, emit, pdfurl) {
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

  var pdfURI = `https://preprint-proxy.prereview.org/${pdfurl}`

  var viewercontainer = html`<iframe class="w-100 h-100 bn" src="/pdfviewer/web/viewer.html?file=${pdfURI}"></div>`

  var container = html`

  <div class="flex flex-column w-100 h-100 justify-center items-center content-center relative">
    ${loading}
    ${viewercontainer}
  </div>
  
  `

  setTimeout(loadingdone, loaded ? 1 : 3000)
  loaded = true

  return container
}