var html = require('choo/html')
var icon = require('../../utils/icon')

// TODO remove if left unused
module.exports = function plauditsBtn (state, emit, review) {
  var n = review.plaudits

  return html`
    <div class="flex flex-row b">
      ${icon('clap', { size: '30px' })} <span class="ml2">${n} plaudit${n === 1 ? null : 's'}</span>
    </div>
  `
}
