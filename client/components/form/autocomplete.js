var html = require('choo/html')

module.exports = function tab(state, emit, opts) {
  return html`
  
  <div class="${state.style.classes.tab}">
    <div class="${state.style.classes.icon}">${opts.icon}</div>
    <div class="${state.style.classes.label}">${opts.label}</div>
  </div>

  `
}