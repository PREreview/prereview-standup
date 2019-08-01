var html = require('choo/html')

var nav = require('../components/nav')
var header = require('../components/home/header')
var filterbox = require('../components/home/filterbox')
var preprintlist = require('../components/home/preprintlist')

var TITLE = 'PREreview 2'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var nresults = state.searchResults.length
  var resultstr = state.searched ?
    (nresults ? `${nresults} results` : 'no results') :
    (`20 most recentely reviewed`)

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray sans-serif">
      ${nav(state, emit)}
      <div class="w-100 flex flex-row pa5">
        <div class="content lh-copy w-50">
          <h1>Changing the who, when and how of scientific peer review</h1>
          <h2 class="fw2">Share, read, and review preprints</h2>
          <div class="ph5 h3 nowrap dim dt bg-red br3 mr3">
            <a class="link white dtc v-mid b" href="/login">Sign up</a>
          </div>
        </div>
      </div>
      <div class="w-100 flex flex-row pa5">
        <div class="flex flex-column items-center content lh-copy w-third">
          <h1>Post.</h1>
          <h2 class="fw2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <div class="ph3 h3 nowrap dim dt bg-red br3 mr3">
            <a class="link white dtc v-mid b" href="/login">Create an account</a>
          </div>
        </div>
        <div class="flex flex-column items-center content lh-copy w-third">
          <h1>Read.</h1>
          <h2 class="fw2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <div class="ph3 h3 nowrap dim dt bg-red br3 mr3">
            <a class="link white dtc v-mid b" href="/find">Browse preprints</a>
          </div>
        </div>
        <div class="flex flex-column items-center content lh-copy w-third">
          <h1>Engage.</h1>
          <h2 class="fw2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <div class="ph3 h3 nowrap dim dt bg-red br3 mr3">
            <a class="link white dtc v-mid b" href="/login">Get involved</a>
          </div>
        </div>
      </div>
    </body>
  `
}
