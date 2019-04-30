var html = require('choo/html')

var nav = require('../components/nav')
var userSummary = require('../components/cards/profile')

var filterbox = require('../components/profile/filterbox')
var preprintlist = require('../components/profile/preprintlist')

var TITLE = 'PREreview2 | profile'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  if (!state.user) {
    return html`
      <body class="flex flex-column w-100 justify-center items-center space-around">
        ${nav(state, emit)}
        <div class="w-60 flex flex-row">
          <div class="w-100 ${state.style.classes.col} ${state.style.classes.center}">
            <h2>Oops! You must <a href="/login">log in</a> to view your profile.</h2>
          </div>
        </div>
      </body>
    `
  }

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}
      <div class="w-60 flex flex-row">
        <div class="content fl w-100 pa2 mt4 f7 lh-copy">
          <div class="actions flex justify-between pv3">
            <div class="ttu tracked">
              Your preprints
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
