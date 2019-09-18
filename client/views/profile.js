var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var nav = require('../components/nav')
var icon = require('../components/utils/icon')
var profile = require('../components/profile')

var TITLE = 'PREreview2 | profile'

var biostyle = css`

:host > p {
  margin: 0;
}

`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var userid = state.href.split('/profile/')[1]

  if (userid) {
    // viewing a specific user's profile
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
        ${profile.firstvisitcards(state, emit)}
        ${profile.usercontent(state, emit)}
      </div>
    </body>
  `
}
