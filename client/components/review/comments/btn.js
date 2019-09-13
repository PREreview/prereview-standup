var html = require('choo/html')
var icon = require('../../utils/icon')

module.exports = function commentsBtn (state, emit, review, expand) {
  var n = review.comments.length
  var el = html`
    <div class="flex flex-row nowrap items-center b">
<span class="mr2">${n} comment${n === 1 ? null : 's'}</span> ${icon('message-square')}
    </div>
  `

  if (state.user || n > 0) {
    el.classList.add('link', 'dim', 'pointer')
    el.onclick = expand
  }

  return el
}