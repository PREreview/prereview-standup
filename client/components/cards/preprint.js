var html = require('choo/html')
var css = require('sheetify')

var GRID = require('../../grid')

var plusIcon = css`
  :host {
    width: 28px;
  }

  :host:hover {
    filter: invert(51%) sepia(92%) saturate(6183%) hue-rotate(343deg) brightness(102%) contrast(101%);
  }
`

function preprint (state, emit, p) {
  var iconPrereviews = html`
    <button class="pa0" style="line-height: 32px">
      <img class="${plusIcon}" src="../../assets/images/add_prereview_icon.svg">
    </button>
  `

  var iconPrerequests = html`
    <button class="pa0" style="line-height: 32px">
      <img class="${plusIcon}" src="../../assets/images/add_prereview_icon.svg">
    </button>
  `

  iconPrereviews.onclick = () => gotoreviews()

  iconPrerequests.onclick = () => {
    emit('add-modal:toggle')
    emit('add-modal:set-data', d)
  }

  var d = p.data || p

  if (d.publisher === 'Neuroscience') d.publisher = 'bioRxiv'
  // TODO remove
  if (!d.date_published) d.date_published = new Date(d.pubDate)

  var gotoreviews = () => emit('pushState', `/preprints/${d.id}`)

  var title = html`<div class="link pointer">${d.title}</div>`
  title.onclick = gotoreviews

  var prereviewsInfo = html`
    <button class="flex flex-row pl0 pr0">
      <p class="ma0 pa0 red dtc v-mid b mr1">${d.n_prereviews}</p>
      <p class="ma0 pa0 dark-gray"> PREreviews </p>
    </button>
  `
  prereviewsInfo.onclick = gotoreviews

  var n_prereviews = html`
      <div class="nowrap bg-white br3 flex flex-row items-center link noselect pointer mr2">
        ${iconPrereviews}
        ${prereviewsInfo}
      </div>
    `

  var showPreReviews = html`
    <div class="mr2 dark-gray link pointer">${n_prereviews}</div>
  `

  var preRequestsInfo = html`
    <button class="flex flex-row pl0 pr0">
      <p class="ma0 pa0 red dtc v-mid b mr1">${d.n_requests}</p>
      <p class="ma0 pa0 dark-gray"> Requests </p>
    </button>
  `

  preRequestsInfo.onclick = gotoreviews

  var showPreRequests = html`
    <div class="nowrap bg-white br3 flex flex-row items-center link noselect pointer mr2">
      ${iconPrerequests}
      ${preRequestsInfo}
    </div>
  `

  var addreview = null
  var addRequestReview = null

  if (state.user) {
    addreview = html`
      <div class="ph2 pv1 nowrap dim bg-white flex flex-row items-center link noselect pointer">
        <p class="ma0 pa0 red dtc v-mid b f6">Add PREreview</p>
      </div>
    `

    addreview.onclick = () => emit('pushState', `/preprints/${d.id}/new`)

    addRequestReview = html`
      <button class="nowrap dim bg-red flex flex-row br4 items-center link noselect pointer">
        <p class="ma0 pa0 white dtc v-mid f6">Add PREreview | Request PREreview </p>
      </button>
    `

    addRequestReview.onclick = () => {
      emit('add-modal:toggle')
      emit('add-modal:set-data', d)
    }
  }

  var pubdate = `Published on ${formatDate(d.date_published)}`
  var controlBtns = 'flex justify-between mv3'

  if(state.dimensions.width < GRID.MD) {
    controlBtns = 'mv3'
  }

  return html`
    <div class="flex flex-column w-100 bb b--black-10 pa2 pb2 mb3 lh-copy">
      <div class="flex flex-row w-100 justify-between mv3 fw6">
        <div class="red i">${d.publisher}</div>
        <div class="i">${pubdate}</div>
      </div>

      <h3 class="fw6 f4 ma0 lh-copy pb1 tl">${title}</h3>

      <div class="f5 fw1 i">
        ${d.authors.list.join(', ')}
      </div>

      <div class="mt4">
        <div class=${controlBtns} style="margin: auto 0;">
          <div class="flex">
            ${showPreReviews}
            ${showPreRequests}
          </div>

          <div class="flex">
            ${addRequestReview}
          </div>
        </div>
      </div>
    </div>
  `
}

// format date from 2019-03-13T03:29:22.099Z to 2019-03-13
const formatDate = date => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;
  return [year, month, day].join('-');
}

module.exports = preprint
