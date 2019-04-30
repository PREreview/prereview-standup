var html = require('choo/html')
var button = require('../button')

module.exports = function component(state, emit, opts) {
  var s = state.style.classes

  return html`

  <div class="flex flex-column w-100 h5 ${s.center}">
    <h3>${state.user.firstName} ${state.user.lastName}</h3>
  </div>
  
  `
}