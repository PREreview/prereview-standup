const html = require('choo/html')
const css = require('sheetify')

const nav = require('../components/nav')
const profile = require('../components/profile')
const Setup = require('../components/profile/firstVisit')
const MyProfileCard = require('../components/profile/myProfileCard')
const GRID = require('../grid')

const TITLE = 'PREreview2 | profile'

const mainstyle = css`
  :host {
    min-height: calc(100vh - 127px);
  }
`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  const userId = state.href.split('/users/')[1]
  let otherUserContainer = `flex flex-column ${mainstyle} justify-center items-center`
  let profileContainer = `flex flex-column`

  if (state.dimensions.width < GRID.LG) {
    otherUserContainer = `${otherUserContainer} w-90`
    profileContainer = `${profileContainer} w-90`
  } else {
    otherUserContainer = `${otherUserContainer} w-70`
    profileContainer = `${profileContainer} w-70`
  }

  // Don't render anything if we're still fetching data
  // This will avoid having flashing of content on the profile page
  if (!state.contentloaded) {
    return html`<div></div>`
  }

  if (userId) {
    // viewing a specific user's profile
    return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      <div class=${otherUserContainer}>
        ${profile.otheruser(state, emit, fetch(`/data/users/${userId}`).then(res => res.json()))}
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
          <h3 class="fw4">Oops! You must <a href="/login-redirect" class="link dim dark-red">log in</a> to view your profile.</h4>
        </div>
      </div>
    </body>
    `
  }

  const firstVisit = html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}

      <div class="flex flex-column w-70">
        ${state.cache(Setup, `setup-user-${state.user.orcid}`).render(state)}
      </div>
    </body>
  `

  if (!state.user.coc_accepted || !state.user.privacy_setup) return firstVisit

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around">
      ${nav(state, emit)}

      <div class=${profileContainer}>
        ${state.cache(MyProfileCard, `profile-card`).render(state)}
        ${profile.usercontent(state, emit)}
      </div>
    </body>
  `
}
