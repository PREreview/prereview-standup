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
            <h3 class="fw4">Oops! You must <a href="/login" class="link dim dark-red">log in</a> to view your profile.</h4>
          </div>
        </div>
      </body>
    `
  }

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}
      <div class="flex flex-column w-70">
        ${profilecard(state, emit)}
        ${usercontent(state, emit)}
      </div>
    </body>
  `
}

function profilecard (state, emit) {
  return html`
    <div class="w-100 center bg-white br3 pa3 pa4-ns mv3">
      <div class="tc">
        <img src="${state.user.picture}" class="br-100 h4 w4 dib" title="your picture">
        <h2 class="mb1 fw4">${state.user.name}</h2>
        <h3 class="mt1 f5 fw3">ORCiD: <a class="link dim dark-red code" href="https://orcid.org/${state.user.orcid}" target="_blank">${state.user.orcid}</a></h3>
      </div>
    </div>
  `
}

function usercontent (state, emit) {
  return html`
    <div class="w-100 flex flex-row justify-center mt1">
      <div class="content fl f6 lh-copy w-50 pa3 br b--black-20">
        <div class="ttu tracked">
          <h2 class="mt0 tc fw4">Your Profile</h2>
        </div>
        <div class="flex flex-column pa4">
          <div class="flex flex-row justify-between">
            <div class="b">Current position</div>
            <div class="">Unknown</div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="b">PREreviews</div>
            <div class="">None yet</div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="b">Community appreciation</div>
            <div class="">None yet</div>
          </div>
        </div>
      </div>
      <div class="flex flex-column content fl f6 lh-copy w-50 pa3">
        <div class="ttu tracked">
          <h2 class="mt0 tc fw4">Your PREreviews</h2>
        </div>
        <div class="pa3 lh-copy tc">
          <p>You haven't written any PREreviews yet.</p>
        </div>
        <div class="flex flex-row justify-center">
          <div class="ph3 pv3 nowrap dim dt bg-red br3 mr3">
            <a class="link white dtc v-mid b" href="/find">Start PREreviewing</a>
          </div>
        </div>
      </div>
    </div>
  `
}