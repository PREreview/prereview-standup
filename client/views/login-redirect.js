var html = require('choo/html')

var nav = require('../components/nav')

var TITLE = 'PREreview 2 - ORCID redirect'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var gotoorcid = html`
  
  <div class="ph3 pv3 nowrap dim dt bg-red br3 link pointer noselect">
    <span class="white dtc v-mid b">Sign in with ORCID</a>
  </div>

  `

  gotoorcid.onclick = () => { window.location = 'login' }
    
  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray sans-serif">
      ${nav(state, emit)}
      <div class="w-100 flex flex-column items-center">
        <div class="flex flex-column items-center w-70">
          <img class="w-20" style="max-width: 200px;" src="/assets/images/loader.svg" />
          <h1>To log in to PREreview you will need an ORCID ID.</h1>
          <h2 class="fw2">Click below to sign in with your ORCID account, or create one if you don't have one.</h2>
          ${gotoorcid}
        </div>
      </div>
    </body>
  `
}
