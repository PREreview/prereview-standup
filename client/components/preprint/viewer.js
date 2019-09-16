var html = require('choo/html')
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

  var viewercontainer = html`<iframe class="w-100 h-100 bn"></div>`

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