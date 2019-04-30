var html = require('choo/html')
var css = require('sheetify')

var Nav = require('../components/Navigation')

var Quill = require('quill')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

var mainstyle = css`

:host {
  height: calc(100vh - 50px);
}

`

var reviews = require('../fake/reviews')(3)

// const TITLE = 'PREreview - reviews'
var examplePDF = 'https://www.biorxiv.org/content/biorxiv/early/2018/11/08/465872.full.pdf'

module.exports = function view (state, emit) {
  return html`
  
  <body>
    ${require('../components/Navigation')(state, emit)}
    <div class="w-100 flex flex-row ${mainstyle}">
      <div class="flex-column w-50">${require('../components/preprint/viewer')(state, emit, examplePDF)}</div>
      <div class="flex flex-column w-50">${require('../components/review/pane')(state, emit, reviews)}</div>
    </div>
  </body>
  
  `
}
