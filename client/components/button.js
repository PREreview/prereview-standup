var html = require('choo/html')

// opts: { classes, label, onclick }
module.exports = function button(state, emit, opts) {
  var s = state.style.classes

  var el = html`
  
  <button class="${opts.secondary ? s.secondaryButton : s.button} ${opts.classes}">${opts.label}</button>
  
  `

  el.onclick = opts.onclick
  return el
}