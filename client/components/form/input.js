var html = require('choo/html')

const DEFAULT_TYPE = 'text'
const DEFAULT_CLASS = 'pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'

module.exports = function component (state, emit, opts) {
  return html`
  
  <input type="${opts.type || DEFAULT_TYPE}" class="${state.style.classes.input || DEFAULT_CLASS} ${opts.classes}" placeholder="${opts.placeholder}" />

  `
}
