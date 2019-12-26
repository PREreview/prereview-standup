var html = require('choo/html')
var css = require('sheetify')

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
    <div class="ph2 pv1 nowrap dim bg-white bt br bb bl b--red br3 flex flex-row items-center link noselect pointer mr2">
      <p class="ma0 pa0 red dtc v-mid b f6">${d.n_requests} | Request PREreview</p>
    </div>
  `

  requestReviewBtn.onclick = () => {
    emit('add-modal:toggle')
    emit('add-modal:set-data', d)
  }

  var addreview = null

  if (state.user) {
    addreview = html`
      <div class="ph2 pv1 nowrap dim bg-white bt br bb bl b--red br3 flex flex-row items-center link noselect pointer">
        <p class="ma0 pa0 red dtc v-mid b f6">Write PREreview</p>
      </div>
    `
    addreview.onclick = () => emit('pushState', `/preprints/${d.id}/new`)
  }

  var pubdate = `Published on ${formatDate(d.date_published)}`

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

      <div class="mv2">
        ${showreviews}
      </div>

      <div class="flex justify-start mv3">
        ${requestReviewBtn}
        ${addreview}
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
