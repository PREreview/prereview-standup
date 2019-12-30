var html = require('choo/html')
var css = require('sheetify')

var GRID = require('../../grid')

var plusIcon = css`
  :host {
    width: 24px
  }

  :host:hover {
    filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%);
  }
`


function preprint (state, emit, p) {
  var iconPrereviews = html`<img class="${plusIcon}" src="../../assets/images/add_prereview_icon.svg">`
  var iconPrerequests = html`<img class="${plusIcon}" src="../../assets/images/add_prereview_icon.svg">`

  iconPrereviews.onclick = () => {
    emit('add-modal:toggle')
    emit('add-modal:set-data', d)
  }

  iconPrerequests.onclick = () => {
    emit('add-modal:toggle')
    emit('add-modal:set-data', d)
  }

  var d = p.data || p

  if (d.publisher === 'Neuroscience') d.publisher = 'bioRxiv'
  // TODO remove
  if (!d.date_published) d.date_published = new Date(d.pubDate)

  var gotoreviews = () => emit('pushState', `/preprints/${d.id}`)

  var title = html`<div class="link" style="cursor: pointer;">${d.title}</div>`
  title.onclick = gotoreviews

  var prereviews = html`
    <div class="flex flex-row">
      <p class="ma0 pa0 red dtc v-mid b mr1">${d.n_prereviews}</p>
      <p class="ma0 pa0 dark-gray"> PREreviews </p>
    </div>
  `
  prereviews.onclick = gotoreviews

  var nreviews = d.n_prereviews === 0 ?
    html`
      <div class="nowrap bg-white br3 flex flex-row items-center link noselect pointer mr2">
        No PREreviews yet
      </div>
    `
    :
    html`
    <div class="nowrap bg-white br3 flex flex-row items-center link noselect pointer mr2">
      ${iconPrereviews}
      ${prereviews}
    </div>
  `

  var showreviews = html`
    <div class="mr2 dark-gray link" style="cursor: pointer; line-height:31px;">${nreviews}</div>
  `

  var requests = html`
    <div class="flex flex-row">
      <p class="ma0 pa0 red dtc v-mid b mr1">${d.n_requests}</p>
      <p class="ma0 pa0 dark-gray"> Request PREreview </p>
    </div>
  `
  requests.onclick = gotoreviews

  var requestReviewBtn = html`
    <div class="nowrap bg-white br3 flex flex-row items-center link noselect pointer mr2">
      ${iconPrerequests}
      ${requests}
    </div>
  `

  // requestReviewBtn.onclick = () => {
  //   emit('add-modal:toggle')
  //   emit('add-modal:set-data', d)
  // }

  var addreview = null
  var addRequestReview = null

  if (state.user) {
    addreview = html`
      <div class="ph2 pv1 nowrap dim bg-white bt br bb bl b--red br3 flex flex-row items-center link noselect pointer">
        <p class="ma0 pa0 red dtc v-mid b f6">Write PREreview</p>
      </div>
    `
    addreview.onclick = () => emit('pushState', `/preprints/${d.id}/new`)

    addRequestReview = html`
      <div class="nowrap dim bg-red bt br bb bl b--red br3 flex flex-row items-center link noselect pointer" style="padding-left: 16px; padding-right: 16px; height: 32px; border-radius: 16px;">
        <p class="ma0 pa0 white dtc v-mid f6">Write PREreview | Request PREreview </p>
      </div>
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

      <div class=${controlBtns}>
        <div class="flex">
          ${showreviews}
          ${requestReviewBtn}
        </div>

        <div class="flex">
          ${addRequestReview}
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
