var html = require('choo/html')
var css = require('sheetify')
var requestReviewModal = require('../home/requestReview/modal')

var requestReview = css`
  :host {
    background-color: transparent;
    border-radius: 5px;
    padding: 0 6px 0 2px;
    font-weight: 400px;
    padding: 3px 8px 3px 8px;
    height: 24px;
    border: 0;
  }

  :host > span {
    color: red;
    font-weight: bold;
    font-size: 13px;
  }

  :host:hover {
    color: white;
    cursor: pointer;
    transition: all 0.1s;
    background-color: #ff3333;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  }

  :host:hover > span {
    color: white;
  }
`

function preprint (state, emit, p) {
  var d = p.data || p
  if (d.publisher === 'Neuroscience') d.publisher = 'bioRxiv'
  // TODO remove
  if (!d.date_published) d.date_published = new Date(d.pubDate)

  var gotoreviews = () => emit('pushState', `/preprints/${d.id}`)

  var title = html`<div class="link dim" style="cursor: pointer;">${d.title}</div>`
  title.onclick = gotoreviews

  var nreviews = d.n_prereviews === 0 ? 'No PREreviews yet' : `${d.n_prereviews} PREreviews`
  var showreviews = html`
  <div class="mr2 dark-gray link dim f6" style="cursor: pointer;">${nreviews}</div>
  `
  showreviews.onclick = gotoreviews

  var requestReviewBtn = html`
    <button class="${requestReview}">
      <span>${d.n_requests}</span> Add request
    </button>
  `

  requestReviewBtn.onclick = () => {
    emit('requestreview-modal:toggle')
    emit('requestreview-modal:set-data', d)
  }

  var addreview = null

  if (state.user) {
    addreview = html`
      <div class="ph3 pv2 nowrap dim bg-red br3 flex flex-row items-center link noselect pointer">
        <p class="ma0 pa0 white dtc v-mid b f6">Write a PREreview</p>
      </div>
    `
    addreview.onclick = () => emit('pushState', `/preprints/${d.id}/new`)
  }

  var pubdate = `Preprint published ${d.date_published.toLocaleDateString({ dateStyle: 'full' })}.`

  return html`
    <div class="flex flex-column article w-100 bb b--black-10 pa2 pb3 mb3 lh-copy">
      ${requestReviewModal(state, emit)}
      <div class="flex flex-row w-100 justify-start mv3 fw6">
        <div class="red i">
          ${d.publisher}
        </div>
        <div class="red ttu">
          ${d.tags && `: ${d.tags.join(', ')}`}
        </div>
      </div>

      <div class="flex flex-column items-start w-100">
        <div>
          <h3 class="fw6 f4 ma0 lh-copy pb1 tl">${title}</h3>
          <div class="f5 fw1 i">
            ${d.authors.list.map(a => a.fullName).join(', ')}
          </div>
        </div>
      </div>

      <div class="footer flex justify-between mv3">
        <div class="flex flex-row items-center flex-wrap left f6 fw3">
          ${pubdate}
        </div>
        <div class="flex flex-row items-center flex-nowrap right f6 fw3">
          ${showreviews}
          ${addreview}
        </div>
      </div>

      <div class="footer flex justify-star mv3">
        ${requestReviewBtn}
      </div>
    </div>
  `
}

module.exports = preprint
