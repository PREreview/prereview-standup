var html = require('choo/html')

var nav = require('../components/nav')
var header = require('../components/home/header')
var filterbox = require('../components/home/filterbox')
var preprintlist = require('../components/home/preprintlist')

var TITLE = 'PREreview2 | home'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var nresults = state.searchResults.length
  var resultstr = state.searched ?
    (nresults ? `${nresults} results` : 'no results') :
    (`20 most recentely reviewed`)

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray">
      ${nav(state, emit)}
      ${header(state, emit)}
      <div class="w-70 flex flex-row">
        <div class="content fl w-100 pa2 f7 lh-copy">
          <div class="actions flex justify-between pv3">
            <div class="flex items-center ttu red tracked f6 b mr3">
              ${resultstr}
            </div>
            ${filterbox(state, emit)}
          </div>
          <div class="articles">
            ${preprintlist(state, emit)}
          </div>
        </div>
      </div>
    </body>
  `
}
