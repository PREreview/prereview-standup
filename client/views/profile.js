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
          <div class="w-100 h8 justify-center items-center pa6 ${state.style.classes.col} ${state.style.classes.center}">
            <h4>Oops! You must <a href="/login" class="link dim dark-red">log in</a> to view your profile.</h4>
          </div>
        </div>
      </body>
    `
  }

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}
      <div class="w-80 flex flex-column justify-center items-center mt4 f4">
        <h2 class="mb1 fw4">${state.user.name}</h2>
        <h3 class="mt1 code f5 fw3">ORCiD: <a class="link dim dark-red" href="https://orcid.org/${state.user.orcid}">${state.user.orcid}</a></h3>
      </div>
      <div class="w-80 flex flex-row justify-center">
        <div class="content fl mt4 f6 lh-copy w-40 pa3 ma3 ba">
          <div class="ttu tracked">
            <h2 class="mt0">Your reviews</h2>
          </div>
          <p>You don't have any reviews yet.</p>
          <p>Get started by reading <a href="/docs/reviewing-guide" class="link dim dark-red">our reviewing guide</a>, or <a href="/find" class="link dim dark-red">find a preprint</a> to review.</p>
        </div>
        <div class="content fl mt4 f6 lh-copy w-40 pa3 ma3 ba">
          <div class="ttu tracked">
            <h2 class="mt0">Your preprints</h2>
          </div>
          <p>We don't know about any preprints authored by you.</p>
          <p>Works added to <a href="https://orcid.org/my-orcid" class="link dim dark-red">your ORCiD record</a> will show here.</p>
        </div>
      </div>
    </body>
  `
}
