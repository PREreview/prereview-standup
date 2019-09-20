var html = require('choo/html')
var css = require('sheetify')
var icon = require('./utils/icon')

var barstyle = css`

:host {
  z-index: 99;
}

`

module.exports = function(state, emit, opts) {
  var s = state.style.classes

  var logo = html`
    <div class="justify-start" style="cursor: pointer;">
      <img class="ml2-m ma0-l pa0" style="width: auto;" src="/assets/images/logo_horizontal_tx.png">
    </div>
  `

  logo.onclick = () => emit('pushState', '/')

  var findbtn = () => {
    if (state.href === '/find') {
      return null
    }

    var find = html`
      <div class="ml2-m ph3 pv3 flex flex-row items-center nowrap dim bg-dark-gray br-pill mr3 link pointer noselect">
        ${icon('search', { backgroundColor: 'white' })}
        <div class="dn-s dn-m">
          <div class="ma0 ml2 pa0 white dib v-mid">Find preprints to review</div>
        </div>
      </div>
    `
    find.onclick = () => emit('pushState', '/find')

    return find
  }

  var leftpart = html`

  <div class="flex flex-row justify-start items-center fl fw1 nowrap">
    ${logo}
    ${findbtn()}
  </div>

  `

  var notlogged = () => {

    var login = html`

    <div class="ph3 pv3 flex flex-row items-center nowrap dim bg-dark-gray br-pill mr3 link pointer noselect">
      <p class="ma0 pa0 white dib v-mid b">Log in</p>
    </div>

    `
    login.onclick = () => window.location = '/login-redirect'  

    return login
  }


  var logged = () => {
    var profile = html`
      <div class="ph3 pv3 flex flex-row items-center nowrap dim bg-dark-gray br-pill mr3 link pointer noselect">
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
  
  <div class="flex flex-row justify-end items-center fr fw1 content-stretch nowrap">
    <a href="https://forms.gle/Yk8fAQqmtvQKmst68" target="_blank" class="link dim black-90 tc flex flex-row items-center justify-center ml4">
        Give feedback
      </a>
    <a href="/docs/about" class="link dim black-90 tc flex flex-row items-center justify-center ml4">
      About
    </a>
    <a href="/docs/code_of_conduct" class="link dim black-90 tc flex flex-row items-center justify-center ml4">
      Code of Conduct 
    </a>
    <a href="https://blog.prereview.org" target="_blank" class="link dim black-90 tc flex flex-row items-center justify-center ml4">
      Blog
    </a>
    <a href="/docs/resources" class="link dim black-90 tc flex flex-row items-center justify-center ml4 mr4">
      Resources
    </a>
    ${userpart}
  </div>

  `

  return html`
  
  <div class="h4 fl w-100 bg-white bb flex flex-row justify-between sans-serif ${barstyle}">
    ${leftpart}
    ${rightpart}
  </div>
  
  `
}