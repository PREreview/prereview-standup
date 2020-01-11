var Nanocomponent = require('nanocomponent')
var html = require('choo/html')

var composer = require('./compose')
var button = require('../button')
var sanitizeID = require('../../lib/sanitize-id')

module.exports = function view (state, emit, opts) {
  return subroute(state, emit, opts)
}

function subroute (state, emit, preprint) {
  if (state.href.endsWith('/new')) {
    // composing
    return writereview(state, emit, preprint)
  } else if (state.href.endsWith('/request')) {
    // requesting
    return requestreview(state, emit, preprint)
  } else if (state.href.endsWith('/submitted')) {
    return submitted(state, emit, preprint)
  } else {
    // reading
    return readreviews(state, emit, preprint)
  }
}

function submitted (state, emit, opts) {
  return html`
    <div class="flex flex-column w-100 h-100 pa4 items-center overflow-y-scroll overflow-x-hidden justify-center f4 tc">
      <p class="b">
        Thank you for PREreviewing!
      </p>
      <p>
        We're issuing your review a DOI. As soon as that's done, your review will be published.
      </p>
      <p>
        Head <a href="/" class="link dim mid-gray"> home</a> to find more preprints to review.
      </p>
    </div>
  `
}

function writereview (state, emit, preprint) {
  return composer(state, emit, preprint)
}

function requestreview () {
  return html`
    <div class="flex flex-column w-100 h-100 ph2 pv0 items-start overflow-y-scroll overflow-x-hidden">
      <h2 class="ph4 fw5">Request a review</h2>
      <p class="lh-copy">Please confirm you want to request a review of this preprint:/p>
      <button>confirm request</button>
    </div>
  `
}

function readreviews (state, emit, preprint) {
  // by using the preprint identifier in the cache key
  // we automatically get one viewer per preprint
  var elid = sanitizeID(preprint.id)
  return state.cache(Reviews, `preprint-freviews-${elid}`).render(state, emit, preprint)
}

class Reviews extends Nanocomponent {
  constructor () {
    super()
    this.created = Date.now()
  }

  createElement (state, emit, preprint) {
    if (!preprint.requests) preprint.requests = []

    var n = preprint.prereviews.length
    var n_requests = preprint.reviewRequests.length

    var el = html`
      <div class="flex flex-column w-100 h-100 pa2 items-start overflow-y-scroll overflow-x-hidden">
        ${preprint.pdfblocked ? null : meta(state, emit, preprint)}

        <div class="flex flex-row w-100 justify-between items-center pa3">
          <div class="pr2 f4 fw5 nowrap">${n_requests} requests</h2>
        </div>

        <div class="w-100 pa4 pt0">
          ${preprint.reviewRequests.map(r =>
              html`
                <div class="w-100 flex flex-row justify-between items-center">
                  <div class="b dark-gray fw4 f4">
                    <a href="/users/${r.author_id}">${r.authorName}</a>
                  </div>
                  <div class="f4 mid-gray">${new Date(r.date_created).toLocaleString({ dateStyle: 'medium' })}</div>
                </div>
              `
            )}
          </div>

        <div class="flex flex-row w-100 justify-between items-center pa3">
          <div class="pr2 f4 fw5 nowrap">${n} review${n === 1 ? '' : 's'}</h2>
          ${addreview(state, emit, preprint)}
        </div>

        ${preprint.prereviews.map(r => require('./display')(state, emit, r))}
      </div>
    `

    return el
  }

  update () {
    if (Date.now() - this.created > 60000) {
      // update once a minute
      return true
    }
    return false
  }
}

function addreview (state, emit, preprint) {
  if (!state.user) {
    var login = html`
      <button class="ml2 bg-red white br4">Log in to review this preprint </button>
    `
    login.onclick = () => emit('pushState', '/login-redirect')
    return html`<div class="flex flex-row w-100 justify-end">${login}</div>`
  }

  var write = html`
    <button class="ml2 bg-red white br4"> PREreview this preprint </button>
  `

  write.onclick = () => emit('pushState', `/preprints/${preprint.id}/new`)

  return write
}

function meta (state, emit, preprint) {
  var publisher = html`<div class="red i b">${preprint.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.join(', ')}</h2>`

  var type = preprint.id.split('/')[0]
  var isarxiv = type === 'arxiv'
  var maybeabs = isarxiv ? 'abs/' : ''
  var linkout = `https://${type}.org/${maybeabs}${preprint.id.replace(type + '/', '')}`

  return html`
    <div class="flex flex-column lh-copy pa3">
      ${publisher}
      <a class="black link" href="${linkout}" target="_blank">${title}</a>
      ${authors}
    </div>
  `
}