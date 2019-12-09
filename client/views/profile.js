var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')
var profile = require('../components/profile')

var Setup = require('../components/profile/firstvisit')

var TITLE = 'PREreview2 | profile'

var mainstyle = css`
  :host {
    min-height: calc(100vh - 127px);
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var userid = state.href.split('/users/')[1]

  if (userid) {
    // viewing a specific user's profile
    return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}
      <div class="flex flex-column w-70 ${mainstyle} justify-center items-center">
        ${profile.otheruser(state, emit, fetch(`/data/users/${userid}`).then(res => res.json()))}
      </div>
    </body>
    `
  } else if (!state.user) {
    // trying to view their own profile but not logged in
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
        ${profile.myprofilecard(state, emit)}
        ${state.cache(Setup, `setup-user-${state.user.orcid}`).render(state)}
        ${profile.usercontent(state, emit)}
      </div>
    </body>
  `
}
