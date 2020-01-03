var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')

var TITLE = 'PREreview 2 - PREreview published'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var submit = html`
    <div class="ph3 pv3 nowrap dim dt bg-red br3 link pointer noselect">
      <span class="white dtc v-mid b">Go to your profile</a>
    </div>
  `

  submit.onclick = () => emit('pushState', '/profile')

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray sans-serif">
      ${nav(state, emit)}

      <div class="w-100 flex flex-column items-center">
        <div class="flex flex-column items-center w-70 tc">
          <img style="width: 200px;" src="/assets/images/loader.svg" />
          <h1>Your PREreview has been published.</h1>

          ${submit}
        </div>
      </div>
    </body>
  `
}
