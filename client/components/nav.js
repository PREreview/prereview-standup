var html = require('choo/html')
var css = require('sheetify')

var icon = require('./utils/icon')
var GRID = require('../grid')

var barstyle = css`
  :host {
    z-index: 99;
  }
`

var logoImg = css`
  :host {
    cursor: pointer;
    width: auto;
    height: 48px;
    padding: 16px 16px 16px 24px;
  }
`

var menuButtonItem = css`
  :host {
    width: 35px;
    height: 6px;
    background-color: black;
    margin: 7px 0;
  }
`

var menuContainer = css`
  :host {
    display: inline-block;
    cursor: pointer;
  }
`

var change = css`
  :host > menuButtonItem {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }
`;

module.exports = function (state, emit, opts) {
  var findContainer = 'ph3 flex flex-row items-center nowrap dim bg-dark-gray br-pill link pointer'
  var buttonItem = 'link dim black-90 tc flex flex-row items-center justify-center'
  var buttonsContainer = 'flex flex-row items-center justify-end'
  var navContainer
  var logo

  if(state.dimensions.width < GRID.LG) {
    logo = html`<img class=${logoImg} src="/assets/images/prereview_logo_icon_colour.svg">`
  } else {
    logo = html`<img class=${logoImg} src="/assets/images/logo_horizontal_tx.png">`
  }

  if(state.dimensions.width < GRID.XL) {
    findContainer = `${findContainer} w-100`
    buttonsContainer = `${buttonsContainer} justify-between`
    navContainer = `fl w-100 bg-white bb flex flex-column justify-start sans-serif ${barstyle}`
  } else {
    navContainer = `fl w-100 bg-white bb flex flex-row justify-between sans-serif ${barstyle}`
  }

  logo.onclick = () => emit('pushState', '/')

  var findbtn = () => {
    // if (state.href === '/find') {
    //   return null
    // }

    var find = html`
      <div class=${findContainer} style="height: 48px; margin-right: 24px;">
        ${icon('search', { backgroundColor: 'white' })}
          <div class="ml2 white dib v-mid">Find preprints to review</div>
      </div>
    `

    find.onclick = () => emit('pushState', '/find')

    return find
  }

  var leftpart = html`
    <div class="flex flex-row justify-between items-center">
      ${logo}
      ${findbtn()}
    </div>
  `

  var notlogged = () => {
    var login = html`
      <div class="ph3 flex flex-row items-center bg-dark-gray br-pill link pointer" style="height: 48px; margin-right: 24px;">
        <p class="ma0 pa0 white dib v-mid b">Log in</p>
      </div>
    `
    login.onclick = () => window.location = '/login-redirect'

    return login
  }

  var logged = () => {
    var profile = html`
      <div class="ph3 flex flex-row items-center bg-dark-gray br-pill link pointer" style="height: 48px; margin-right: 24px;">
        <p class="ma0 pa0 white dib v-mid b">${state.user.name}</p>
      </div>
    `
    profile.onclick = () => emit('pushState', '/profile')

    var el = html`
      <div class="flex flex-row items-center justify-center white">
        <a href="/logout" class="link dim black-90 tc flex flex-row items-center justify-center mr4">
          Log out
        </a>
        ${profile}
      </div>
    `

    return el
  }

  var userpart = state.user ? logged() : notlogged()

  var rightpart = html`
    <div class=${buttonsContainer}>
      <a href="https://forms.gle/Yk8fAQqmtvQKmst68" target="_blank" class="${buttonItem} red" style="margin-left: 16px; margin-right: 16px;">
        Give feedback
      </a>

      <a href="/docs/about" class="${buttonItem}" style="margin-left: 16px; margin-right: 16px;">
        About
      </a>

      <a href="/docs/code_of_conduct" class="${buttonItem}" style="margin-left: 16px; margin-right: 16px;">
        Code of Conduct
      </a>

      <a href="https://blog.prereview.org" target="_blank" class="${buttonItem}" style="margin-left: 16px; margin-right: 16px;">
        Blog
      </a>

      <a href="/docs/resources" class="${buttonItem}" style="margin-left: 16px; margin-right: 16px;">
        Resources
      </a>

      ${userpart}
    </div>
  `

  var menuButton = html`
    <button class="hamburger" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
  `


  return html`
    <div class=${navContainer}>
      ${leftpart}
      ${rightpart}
    </div>
  `
}
