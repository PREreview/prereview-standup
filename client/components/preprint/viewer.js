var html = require('choo/html')

var loaded = false

module.exports = function (state, emit, doidata) {
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

  var pubdate = new Date(Date.parse(doidata.date_published))
  var pubyear = pubdate.getFullYear()
  var pubmonth = ("0" + (pubdate.getMonth() + 1)).slice(-2)
  var pubday = ("0" + pubdate.getDate()).slice(-2)
  var doipart = doidata.identifier.split('/')[1]
  var pdfurl = `https://www.biorxiv.org/content/biorxiv/early/${pubyear}/${pubmonth}/${pubday}/${doipart}.full-text.pdf`

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