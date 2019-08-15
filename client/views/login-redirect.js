var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')
var header = require('../components/home/header')
var filterbox = require('../components/home/filterbox')
var preprintlist = require('../components/home/preprintlist')

var TITLE = 'PREreview 2 - ORCID redirect'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  setTimeout(() => { window.location = 'login' }, 5000)
    
  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray sans-serif">
      ${nav(state, emit)}
      <div class="w-100 flex flex-column items-center" />
        <div class="flex flex-column items-center w-70">
          <h1>We're redirecting you to ORCID to log in.</h1>
          <h2 class="fw2">ORCID is the identity service for academics.</h2>
          <img class="" src="/assets/images/loader.png" />
          <div class="lh-copy">
            <p>You will be redirected to ORCID in a few seconds.</p>
            <p>If you already have an ORCID account, just log in and you'll be redirected back to PREreview.</p>
            <p>If you don't yet have an ORCID, you'll need to create an account there. Once you've created the account you should be redirected back to PREreview.</p>
          </div>
        </div>
      </div>
    </body>
  `
}
