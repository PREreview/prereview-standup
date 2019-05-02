var html = require('choo/html')
var css = require('sheetify')

var barstyle = css`

:host {
  z-index: 99;
  /* height: 50px; */
}

`

module.exports = function(state, emit, opts) {
  var s = state.style.classes

  var notlogged = () => html`

  <a class="link dim white-90 tc" href="/login">Log in / register</a>
  
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
    <div class="flex flex-row white" style="cursor: pointer;">
      <a href="/docs/code_of_conduct" class="link dim white-90 tc flex flex-row items-center justify-center ml4">
        Code of Conduct
      </a>
      <a href="/docs/team" class="link dim white-90 tc flex flex-row items-center justify-center ml4">
        Team 
      </a>
      <a href="/docs/about" class="link dim white-90 tc flex flex-row items-center justify-center ml4 mr4">
        About
      </a>
      ${name}
      ${logout}
    </div>
  `


    return el
  }

  var userpart = state.user ? logged() : notlogged()

  var logo = html`
    <div class="${s.col} ${s.center} ml3" style="cursor: pointer;">
      <img class="ma0 pa0" src="/assets/images/logo@2x.png" style="height: 40px;">
    </div>
  `

  logo.onclick = () => emit('pushState', '/')

  return html`
  
  <div class="h3 fl w-100 bg-dark-gray bb flex flex-row justify-between ph2 ${barstyle}">
    ${logo}
    <div class="login pa3 fr white flex ${s.center}">
      ${userpart}
    </div>
  </div>
  
  `
}