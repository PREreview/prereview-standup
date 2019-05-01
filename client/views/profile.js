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
            <h2>Oops! You must <a href="/login" class="link dim dark-red">log in</a> to view your profile.</h2>
          </div>
        </div>
      </body>
    `
  }

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}
      <div class="w-60 flex flex-column">
        <div class="flex flex-row justify-around items-around content fl w-100 pa2 mt4 f7 lh-copy">
          <div class="pa3">
            <div class="ttu tracked">
              <h2>Your reviews</h2>
            </div>
            <p>You don't have any reviews yet.</p>
            <p>Get started by reading <a href="/docs/reviewing-guide" class="link dim dark-red">our reviewing guide</a>, or <a href="/" class="link dim dark-red">find a preprint</a> to review.</p>
          </div>
          <div class="pa3">
            <div class="ttu tracked">
              <h2>Your preprints</h2>
            </div>
            <p>We don't know about any preprints authored by you.</p>
            <p>Works added to <a href="https://orcid.org/my-orcid" class="link dim dark-red">your ORCiD record</a> will show here.</p>
          </div>
        </div>
        <div class="flex flex-column content fl w-100 pa2 mt4 f7 lh-copy">
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
