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

  <div class="flex flex-row">
    <a class="white" href="/login">Log in / register</a>
  </div>
  
  `

  var logged = () => {
    var logout = html`<div class="link dim white-90 tc flex flex-row items-center justify-center">log out</div>`
    logout.onclick = () => emit('pushState', '/logout')

    var name = html`
      <div class="ml4 link dim white-90 tc flex flex-row items-center justify-center">
        <img src="/assets/images/profile.png" class="mr2 h2" />
        ${state.user.name}
      </div>
    `
    name.onclick = () => emit('pushState', '/profile')  

    var el = html`
    <div class="flex flex-row white" style="cursor: pointer;">
      ${logout}
      ${name}
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