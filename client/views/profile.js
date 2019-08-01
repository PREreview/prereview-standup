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
      <p class="lh-copy measure center f6 black-70">
        Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Vitae congue mauris rhoncus aenean vel elit scelerisque.
      </p>
    </div>
  `
}

function usercontent (state, emit) {
  return html`
    <div class="w-100 flex flex-row justify-center mt1">
      <div class="content fl f6 lh-copy w-50 pa3 br b--black-20">
        <div class="ttu tracked">
          <h2 class="mt0 tc fw4">Your PREreviews</h2>
        </div>
        <div class="pa3 lh-copy tc">
          <p>You don't have any PREreviews yet.</p>
          <p>Get started by reading <a href="/docs/reviewing-guide" class="link dim dark-red">our reviewing guide</a>, or <a href="/find" class="link dim dark-red">find a preprint</a> to review.</p>
        </div>
      </div>
      <div class="content fl f6 lh-copy w-50 pa3">
        <div class="ttu tracked">
          <h2 class="mt0 tc fw4">Your preprints</h2>
        </div>
        <div class="pa3 lh-copy tc">
          <p>We don't know about any preprints authored by you.</p>
          <p>Works added to <a href="https://orcid.org/my-orcid" target="_blank" class="link dim dark-red">your ORCiD record</a> will show here.</p>
        </div>
      </div>
    </div>
  `
}