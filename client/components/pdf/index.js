var pdfjsLib = require('pdfjs-dist')
pdfjsLib.GlobalWorkerOptions.workerSrc =
'/assets/pdf.worker.bundle.js'

module.exports = (state, emit, opts) => {
  var viewercanvas = html`
    <canvas id="prereview-pdf-viewer"></canvas>
  `

  var load = pdfjsLib.getDocument(opts.pdfurl)
  load.then(
    pdfdoc => pdfdoc.getPage(1)
  ).then(
    pdfpage => {
      var viewport = pdfPage.getViewport({ scale: 1.0 })

      viewercanvas.height = opts.height
      viewercanvas.width = opts.width
      var context = canvas.getContext('2d')
      var render = pdfpage.render({
        canvasContext: context,
        viewport: viewport 
      })
    }
  ).catch(
    e => {
      console.error('PDF loading failed', e)
    }
  )

  return viewercanvas
}
