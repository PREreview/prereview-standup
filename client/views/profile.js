var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var nav = require('../components/nav')

var TITLE = 'PREreview2 | profile'

var biostyle = css`

:host > p {
  margin: 0;
}

`

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
        ${firstvisitcards(state, emit)}
        ${usercontent(state, emit)}
      </div>
    </body>
  `
}

function profilecard (state, emit) {
  var gravatartxt = state.user.profile.pic ?
    null :
    html`You can choose your profile picture by registering your email on <a href="https://gravatar.com">Gravatar</a>.`

  return html`
    <div class="w-100 center bg-white br3 pa3 pa4-ns">
      <div class="tc">
        <img src="${state.user.profile.pic + '&s=128' || '/assets/illustrations/avatar.png'}" class="br-100 h4 w4 dib" title="your picture">
        ${gravatartxt}
        <h2 class="mb1 fw4">${state.user.name}</h2>
        <h3 class="mt1 f5 fw3 mv0">
          ORCID <img src="/assets/images/orcid_16x16.gif" alt="ORCID ID icon" /> <a class="link dim dark-red code" href="https://orcid.org/${state.user.orcid}" target="_blank">${state.user.orcid}</a>
        </h3>
      </div>
    </div>
  `
}

function firstvisitcards (state, emit) {
  var el

  if (!state.user.coc_accepted) {
    el = require('../components/cards/signup/code-of-conduct')(state, emit)
  } else if (!state.user.privacy_setup) {
    el = require('../components/cards/signup/identity-choice')(state, emit)
  } else {
    el = start(state)
  }
  return html`
    
  <div class="flex flex-column justfy-center items-center pb4 bb b--black-20">
    ${el}
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
            <div class="b">Biography</div>
            <div class="ml2 pl2 lh-copy ${biostyle}">${raw(state.user.profile.biography || 'not yet filled in')}</div>
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
        <div class="flex flex-column">
          <div class="ttu tracked">
            <h2 class="mt0 tc fw4">Your PREreviews</h2>
          </div>
          <div class="pa3 lh-copy tc">
            <p>You haven't written any PREreviews yet.</p>
          </div>
        </div>
        <div class="flex flex-column mt3 pt4 bt b--black-20">
          <div class="ttu tracked">
            <h2 class="mt0 tc fw4">Your preprints</h2>
          </div>
          <div class="pa3 lh-copy tc">
            <p>We don't know about any preprints authored by you. Let us know about preprints you've written by adding them to <a href="https://orcid.org/my-orcid" target="_blank">your ORCID profile</a>.</p>
          </div>
        </div>
      </div>
    </div>
  `
}

function start (state) {
  if (!state.user.coc_accepted || !state.user.privacy_setup) return html`
  <div class="flex flex-row justify-center">
    <p>Once you have completed your signup you can start PREreviewing</p>
  </div>
  `

  return html`
  <div class="flex flex-row justify-center">
    <div class="ph3 pv3 nowrap dim dt bg-red br3 mr3 link noselect">
      <a class="white dtc v-mid b" href="/find">Start PREreviewing</a>
    </div>
  </div>
  `
}