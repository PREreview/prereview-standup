var html = require('choo/html')
var viewer = require('../pdf')

var loaded = false

module.exports = function (state, emit, pdfurl) {
  var loading = html`
    <div class="flex flex-column w-100 h-100 bg-white justify-center items-center" style="z-index: 9999;">
      <p>
        loading preprint...
      </p>
      ${require('../utils/loading')()}
    </div>
  `

  function loadingdone () {
    loading.remove()
  }

  var viewercontainer = html`<div class="w-100 h-100"></div>`

  function loadPDF () {
    var viewerel = viewer({
      pdfurl: pdfurl,
      height: viewercontainer.height,
      width: viewercontainer.width
    })

    viewercontainer.appendChild(viewerel)
  }

  var container = html`

  <div class="flex flex-column w-100 h-100 justify-center items-center content-center">
    ${loading}
    ${viewercontainer}
  </div>
  
  `

  setTimeout(loadingdone, loaded ? 1 : 3000)
  setTimeout(loadPDF, 20)
  loaded = true

  return container
}