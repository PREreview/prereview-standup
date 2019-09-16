var html = require('choo/html')
var raw = require('choo/html/raw')

var composer = require('./compose')
var button = require('../button')

module.exports = function view (state, emit, opts) {
  return subroute(state, emit, opts)
}

function subroute (state, emit, opts) {
  if (state.href.endsWith('/new')) {
    // composing
    return writereview(state, emit, opts)
  } else if (state.href.endsWith('/request')) {
    // requesting
    return requestreview(state, emit, opts)
  } else if (state.href.endsWith('/submitted')) {
    return submitted(state, emit, opts)
  } else {
    // reading
    return readreviews(state, emit, opts)
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

function writereview (state, emit, opts) {
  return composer(state, emit, opts)
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

function readreviews (state, emit, opts) {
  if (!opts.reviews) opts.reviews = []
  if (!opts.requests) opts.requests = []

  var el = html`
  
  <div class="flex flex-column w-100 h-100 pa2 items-start overflow-y-scroll overflow-x-hidden">
    ${opts.pdfblocked ? null : meta(state, emit, opts)}
    <div class="flex flex-row w-100 justify-between items-center pa3">
      <div class="pr2 f4 fw5 nowrap">${opts.reviews.length} reviews</h2>
      ${addreview(state, emit, opts)}
    </div>
    ${opts.reviews.map(r => require('./display')(state, emit, r))}
  </div>
  
  `

  return el
}

function addreview (state, emit, opts) {
  if (!state.user) {
    var login = button(state, emit, { label: 'Log in to review this preprint' })
    login.onclick = () => emit('pushState', '/login-redirect')
    return html`<div class="flex flex-row w-100 justify-end">${login}</div>`
  }

  var write = button(state, emit, {
    label: 'Review this preprint',
    classes: 'ml2 bg-red white'
  })
  write.onclick = () => emit('pushState', `/preprints/${opts.identifiertype}/${opts.identifier}/new`)

  return write
}

function meta (state, emit, preprint) {
  var publisher = html`<div class="red i b">${preprint.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.map(a => a.fullName).join(', ')}</h2>`
  var abstract = raw(`<p class="mt1">${preprint.abstract}</p>`)
  return html`
    <div class="flex flex-column lh-copy pa3">
      ${publisher}
      <a class="black link" href="https://${preprint.identifiertype}.org/${preprint.identifier}" target="_blank">${title}</a>
      ${authors}
    </div>
  `
}
