var html = require('choo/html')
var css = require('sheetify')

var icon = require('./utils/icon')
var GRID = require('../grid')

var barstyle = css`
  :host {
    z-index: 99;
    height: 80px;
  }
`

var logoImg = css`
  :host {
    width: auto;
    height: 48px;
    padding: 16px 16px 16px 24px;
  }
`

var giveFeedbackBtn = css`
  :host {
    position: fixed;
    padding: 8px 24px 8px 8px;
    right: 0;
    bottom: 40px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    font-size: 13px;
    line-height: 1.25em;
  }

  :host:hover {
    text-decoration: underline;
  }
`

var fitContent = css`
  :host {
    width: fit-content
  }
`

module.exports = function (state, emit, opts) {
  var findContainer = 'ph3 flex flex-row items-center nowrap dim bg-dark-gray br-pill link pointer'
  var buttonItem = 'link dim black-90 tc flex'
  var buttonsContainer = 'flex flex-row items-center justify-end'
  var navContainer = `fl w-100 bg-white bb flex flex-row justify-between sans-serif ${barstyle}`
  var logo
  var loggedInBtns

  if(state.dimensions.width < GRID.LG) {
    logo = html`<img class="${logoImg} pointer" src="/assets/images/prereview_logo_icon_colour.svg">`
  } else {
    logo = html`<img class="${logoImg} pointer" src="/assets/images/prereview_logo_h_colour_cropped.svg">`
  }

  if(state.dimensions.width < GRID.MD) {
    findContainer = `${findContainer} w-100`
    buttonsContainer = 'flex flex-column justify-start'
    loggedInBtns = 'flex flex-column white'
  } else {
    loggedInBtns = 'flex flex-row items-center justify-center white'
  }

  logo.onclick = () => emit('pushState', '/')

  var leftpart = html`
    <div class="flex flex-row justify-between items-center">
      ${logo}
    </div>
  `

  var notlogged = () => {
    var login = html`
      <div class="ph3 flex flex-row items-center bg-dark-gray br-pill link pointer" style="height: 32px; margin-right: 24px;">
        <p class="ma0 pa0 white dib v-mid b">Log in</p>
      </div>
    `
    login.onclick = () => window.location = '/login-redirect'

    return login
  }

  var logged = () => {
    var profile = html`
      <div class="ph3 flex flex-row items-center bg-dark-gray br-pill link pointer ${fitContent}" style="height: 32px; margin-right: 24px;">
        <p class="ma0 pa0 white dib v-mid b">${state.user.name}</p>
      </div>
    `
    profile.onclick = () => emit('pushState', '/profile')

    var el = html`
      <div class=${loggedInBtns}>
        <a href="/logout" class="link dim black-90 tc flex mr4" style="padding-top: 8px; padding-bottom: 8px; margin-left: 16px; margin-right: 16px;">
          Log out
        </a>
        ${profile}
      </div>
    `

    return el
  }

  var userpart = state.user ? logged() : notlogged()

  var menuButton = state.dimensions.width < GRID.MD ? html`
    <button class="hamburger" type="button" style="margin-top: 18px; margin-right: 24px;">
      <div style="width: 35px; height: 5px; background-color: black; margin: 6px 0"></div>
      <div style="width: 35px; height: 5px; background-color: black; margin: 6px 0"></div>
      <div style="width: 35px; height: 5px; background-color: black; margin: 6px 0"></div>
    </button>
  ` : html`
    <div></div>
  `

  menuButton.onclick = () => emit('navigation-mnu:toggle')

  var giveFeedback = html`
    <a href="https://forms.gle/Yk8fAQqmtvQKmst68" target="_blank" class="${giveFeedbackBtn} white bg-red">
      Give
      <br>
      Feedback
    </a>
  `

  var rightpart = html`
    <div class=${buttonsContainer}>
      <a href="https://content.prereview.org/about" target="_blank" class="${buttonItem} pt1 pb1 ml2 mr2">
        About
      </a>

      <a href="https://content.prereview.org/coc" target="_blank" class="${buttonItem} pt1 pb1 ml2 mr2">
        Code of Conduct
      </a>

      <a href="https://content.prereview.org/resources" target="_blank" class="${buttonItem} pt1 pb1 ml2 mr2">
        Blog
      </a>

      <a href="https://content.prereview.org/resources" target="_blank" class="${buttonItem} pt1 pb1 ml2 mr2">
        Resources
      </a>

      ${userpart}
    </div>
  `

  if(state.dimensions.width < GRID.MD) {
    if(state.appdata.toggleMenuButton){
      return html`
        <div class="flex flex-column w-100 bb pb3">
          <div class="flex flex-row justify-between">
            ${leftpart}
            ${menuButton}
            ${giveFeedback}
          </div>

          ${rightpart}
        </div>
      `
    } else {
      return html`
        <div class="flex flex-column w-100 bb">
          <div class="flex flex-row justify-between">
            ${leftpart}
            ${menuButton}
            ${giveFeedback}
          </div>
        </div>
      `
    }
  }

  return html`
    <div class=${navContainer}>
      ${leftpart}
      ${rightpart}
      ${giveFeedback}
    </div>
  `
}
