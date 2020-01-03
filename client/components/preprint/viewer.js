var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

var blockedview = require('./blockedview')
var pdfUrl = require('../../lib/preprints/pdf-url')
var sanitizeID = require('../../lib/sanitize-id')

module.exports = function (state, emit, preprint) {
  // by using the preprint identifier in the cache key
  // we automatically get one viewer per preprint
  var elid = sanitizeID(preprint.id)
  return state.cache(PreprintViewer, `preprint-viewer-${elid}`).render(state, emit, preprint)
}

class PreprintViewer extends Nanocomponent {
  constructor () {
    super()
  }

  createElement (state, emit, preprint) {
    this.preprint = preprint
    this.loading = html`
      <div class="flex flex-column absolute w-100 h-100 bg-white justify-center items-center" style="z-index: 9999;">
        <p>
          loading preprint...
        </p>
        ${require('../utils/loading')()}
      </div>
    `

    this.viewercontainer = preprint.pdfblocked
      ? blockedview(state, emit, preprint)
      : html`<iframe class="w-100 h-100 bn"></div>`

    var container = html`
      <div class="flex flex-column w-100 h-100 justify-center items-center content-center relative">
        ${this.loading}
        ${this.viewercontainer}
      </div>
    `

    if (this.preprint.pdfblocked) {
      setTimeout(this.loadingdone.bind(this), 300)
    } else {
      this.loadPreprintIntoIframe()
    }

    return container
  }

  loadPreprintIntoIframe () {
    console.log('preprint url loading')
    
    pdfUrl(this.preprint).then(
      docurl => {
        console.log('got preprint url:', docurl)
        var corsurl = `https://preprint-proxy.prereview.org/${docurl}`
        this.viewercontainer.setAttribute('src', `/pdfviewer/web/viewer.html?file=${corsurl}`)
        setTimeout(this.loadingdone.bind(this), 3000)
      }
    )
  }

  loadingdone () {
    this.loading.remove()
  }

  update () {
    return false
  }
}
