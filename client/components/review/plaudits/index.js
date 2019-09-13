var html = require('choo/html')

module.exports = function plauditsBtn (state, emit, review) {
  return html`
    <div class="flex flex-row b">
      ${review.plaudits} plaudits
    </div>
  `
}
