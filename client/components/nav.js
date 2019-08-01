var html = require('choo/html')
var css = require('sheetify')

var barstyle = css`

:host {
  z-index: 99;
}

`

module.exports = function(state, emit, opts) {
  var s = state.style.classes

  var notlogged = () => html`

  <div class="ph3 pv3 flex flex-row items-center nowrap dim bg-dark-gray br-pill mr3">
   <a class="link white dib v-mid b" href="/login">Sign in </a>
  </div>
  `

  var logged = () => {
    var logout = html`
      <a href="/logout" class="link dim white-90 tc flex flex-row items-center justify-center ml4">
        Log out
      </a>
    `

    var name = html`
      <div class="ml4 link dim white-90 tc flex flex-row items-center justify-center">
        <img src="${state.user.picture.thumbnail}" class="br-100 h2 w2 dib mr2" title="your profile picture">
        ${state.user.name}
      </div>
    `
    name.onclick = () => emit('pushState', '/profile')  

    var el = html`
    <div class="flex flex-row items-center justify-center white" style="cursor: pointer;">
      ${name}
      ${logout}
    </div>
  `

    return el
  }

  var userpart = state.user ? logged() : notlogged()

  var rightpart = html`
  
  <div class="flex flex-row justify-end items-center fr fw1 content-stretch">
    <a href="/docs/code_of_conduct" class="link dim black-90 tc flex flex-row items-center justify-center ml4">
      About
    </a>
    <a href="/docs/team" class="link dim black-90 tc flex flex-row items-center justify-center ml4">
      Browse 
    </a>
    <a href="/docs/about" class="link dim black-90 tc flex flex-row items-center justify-center ml4">
      Blog
    </a>
      <a href="/docs/about" class="link dim black-90 tc flex flex-row items-center justify-center ml4 mr4">
      Community
    </a>
    ${userpart}
  </div>

  `


  var logo = html`
    <div class="justify-start ml3" style="cursor: pointer;">
      <img class="h-100 ma0 pa0" src="/assets/images/logo_horizontal_tx.png">
    </div>
  `

  logo.onclick = () => emit('pushState', '/')

  return html`
  
  <div class="h4 fl w-100 bg-white bb flex flex-row justify-between sans-serif ${barstyle}">
    ${logo}
    ${rightpart}
  </div>
  
  `
}