var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var composeComment = require('./comments/compose')
var comment = require('./comments/comment')
var commentsBtn = require('./comments/btn')
var plaudit = require('../../lib/plaudit')

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
  const comments = getComments(state, emit, review)
  const expand = () => {
    console.log('expanding comments')
    comments.classList.remove('dn')
    comments.classList.add('flex')
  }

  plaudit.addDOItoHead(review.doi)

  const author = html`<div class="b dark-gray fw4"></div>`

  fetch(`/data/users/${review.author_id}`).then(res => res.json()).then(
    authordata => {
      var authorinner = html`<a href="/users/${authordata.user_id}">${authordata.name}</a>`
      author.appendChild(authorinner)
    }
  )

  return html`
    
  <div class="flex flex-column w-100 pa4 f4 mid-gray lh-copy bt bw1 b--light-gray ">
    <div class="flex flex-row w-100 mb2">
      <div class="flex flex-row w-100 justify-between items-center">
        ${author}

        <div>
          <small>
          <b>${new Date(review.date_created).toLocaleString({ dateStyle: 'medium' })}</b>
          <div>${review.doi ? html`<a href="https://doi.org/${review.doi}"><img src="https://sandbox.zenodo.org/badge/DOI/${review.doi}.svg" alt="DOI"></a>` : ''}</div>
          </div>
          </small>
        </div>
      </div>
    </div>
    <div class="flex flex-column lhview-copy w-100 pb2 mb2">
      ${raw(review.content)}
    </div>
    <div class="flex flex-row lh-copy w-100 justify-between pb2 mb2">
      <script async src="https://prereview-review.plaudit.pub/embed/endorsements.js" data-embedder-id="prereview" ></script>
    </div>
    <div class="flex flex-row lh-copy w-100 justify-between pb2 mb2">
      ${commentsBtn(state, emit, review, expand)}
    </div>
    ${comments}
  </div>
  
  `
}

function getComments (state, emit, review) {
  if (!review.comments) review.comments = []

  return html`
    <div class="flex-column lh-copy w-100 justify-between dn">
      ${state.user && composeComment(state, emit, review)}
      ${review.comments.map(c => comment(state, emit, c))}
    </div>
  `
}
