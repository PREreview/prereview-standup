var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')

var TITLE = 'PREreview 2 - Submit PREreview'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var submit = html`
  
  <div class="ph3 pv3 nowrap dim dt bg-red br3 mr3 link pointer noselect">
    <span class="white dtc v-mid b">Submit PREreview</a>
  </div>

  `

  submit.onclick = () => emit('prereview:confirm-submission')
    
  return html`

  <body class="flex flex-column w-100 justify-center items-center space-around dark-gray sans-serif">
    ${nav(state, emit)}
    <div class="w-100 flex flex-column items-center">
      <div class="flex flex-column items-center w-70 measure">
        <img class="w-20" style="max-width: 200px;" src="/assets/images/loader.svg" />
        <h1>Your PREreview is ready to be submitted.</h1>
        <h2 class="fw2">Once you click submit your review will be assigned a DOI and permanently published.</h2>
        ${submit}
      </div>
    </div>
  </body>

  `
}
