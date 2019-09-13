var html = require('choo/html')

module.exports = function commentsBtn (state, emit, review, expand) {
  var el = html`
    <div class="b">
      ${review.comments.length} comments
    </div>
  `

  if (state.user || review.comments.length > 0) {
    el.classList.add('link', 'dim', 'pointer')
    el.onclick = expand
  }

  return el
}