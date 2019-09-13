var html = require('choo/html')
var css = require('sheetify')

var contentStyle = css`

:host p {
  margin-top: 0;
}

:host {
  /* max-height: 200px; */
  max-height: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
}

`

module.exports = function view (state, emit, review) {
  var comments = getComments(state, emit, review)
  var expand = () => {
    comments.classList.remove('dn')
    comments.classList.add('flex')
  }
  
  return html`
    
  <div class="flex flex-column w-100 pv3 ph4 f4 mid-gray lh-copy">
    <div class="flex flex-row w-100 mb4">
      <div class="flex flex-column">
        <div class="b dark-gray fw5">${review.author.firstName} ${review.author.lastName}</div>
        <div>${review.created.toDateString()}</div>
      </div>
    </div>
    <div class="flex flex-column lhview-copy w-100 pb2 mb2">
      ${review.content}
    </div>
    <div class="flex flex-row lh-copy w-100 justify-between">
      ${plauditsBtn(state, emit, review)}
      ${commentsBtn(state, emit, review, expand)}
    </div>
    ${comments}
  </div>
  
  `
}

function plauditsBtn (state, emit, review) {
  return html`
    <div class="flex flex-row">
      ${review.plaudits} plaudits
    </div>
  `
}

function commentsBtn (state, emit, review, expand) {
  var el = html`
    <div class="b">
      ${review.comments.length} comments
    </div>
  `

  if (state.user || review.comments.length > 1) {
    el.classList.add('link', 'dim', 'pointer')
    el.onclick = () => expand
  }

  return el
}

function getComments (state, emit, review) {
  return html`
    <div class="flex flex-column lh-copy w-100 bt bl bw1 b--light-gray justify-between dn">
      ${review.comments.map(c => comment(state, emit, c))}
    </div>
  `
}

function comment (state, emit, c) {
  return html`
    <div class="flex-column w-100 pa3 f4 mid-gray lh-copy">
      <div class="flex flex-row justify-between w-100 mb2">
        <div class="b dark-gray fw5">${c.author.firstName} ${c.author.lastName}</div>
        <div>${c.created.toDateString()}</div>
      </div>
      <div class="flex flex-column lhview-copy w-100 pb2 mb2">
        ${c.content}
      </div>
    </div>
  `
}