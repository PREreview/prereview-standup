var html = require('choo/html')
var stylise = require('../../lib/stylise')

var getStyle = opts => {
  return stylise({
    'min-width': `${opts.size || '80px'}`,
    'height': `${opts.size || '80px'}`,
    'background-color': opts.backgroundColor || '#333',
    '-webkit-mask': `url(/assets/images/${opts.name}.svg) center / contain no-repeat`,
    'margin-top': '-2px'
  })
}

module.exports = function svg(state, emit, opts) {
  return html`<div class="flex ${opts.classes}" style="${getStyle(opts)}"></div>`
}