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
  var el = html`<div class="flex flex-row white" style="cursor: pointer;">${state.user.name}</div>`
    el.onclick = () => emit('pushState', '/profile')
    return el
  }

  var userpart = state.user ? logged() : notlogged()

  var logo = html`
    <div class="${s.col} ${s.center}" style="cursor: pointer;">
      <img class="ma0 pa0" src="/assets/images/logo@2x.png" style="height: 40px;">
    </div>
  `

  logo.onclick = () => emit('pushState', '/')

  return html`
  
  <div class="h3 fl w-100 bg-mid-gray bb flex flex-row justify-between ph2 ${barstyle}">
    ${logo}
    <div class="login pa3 fr white flex ${s.center}">
      ${userpart}
    </div>
  </div>
  
  `
}