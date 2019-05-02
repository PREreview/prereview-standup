var html = require('choo/html')

var loaded = false

module.exports = function (state, emit, pdfurl) {
  var loading = html`
    <div class="flex flex-column w-100 h-100 bg-white justify-center items-center">
      <p>
        loading preprint...
      </p>
      ${require('../utils/loading')()}
    </div>
  `

  function loadingdone () {
    loading.remove()
  }

  var iframe = html`
  
  <iframe
    id="viewer"
    class="w-100 h-100"
    src="https://docs.google.com/gview?url=${pdfurl}&embedded=true"
    frameborder="0"
  >
  </iframe>
  
  `

  var container = html`

  <div class="flex flex-column w-100 h-100 justify-center items-center content-center">
    ${loading}
    ${iframe}
  </div>
  
  `

  setTimeout(loadingdone, loaded ? 1 : 3000)
  loaded = true

  return container
}