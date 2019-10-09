var html = require('choo/html')
var stylise = require('../../lib/stylise')

module.exports = function icon (name, opts) {
  opts = opts || {}

  var style = stylise({
    'min-width': `${opts.size || '24px'}`,
    height: `${opts.size || '24px'}`,
    'background-color': opts.backgroundColor || '#555',
    '-webkit-mask': `url(/assets/feather/${name}.svg) center / contain no-repeat`,
    'margin-top': '-2px',
    'margin-left': '-2px'
  })

  return html`<div class="flex" style="${style}"></div>`
}
