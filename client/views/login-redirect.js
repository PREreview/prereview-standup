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
          <img class="w-20" src="/assets/images/loader.svg" />
          <h1>We're redirecting you to ORCID to log in.</h1>
          <h2 class="fw2">ORCID is the identity service for academics.</h2>
          <h2 class="fw2">Sign up for an ORCID account if you don't have one yet, or log in if you do. You'll be brought right back to PREreview.</h2>
        </div>
      </div>
    </body>
  `
}
