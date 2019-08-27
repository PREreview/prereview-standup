var html = require('choo/html')
var css = require('sheetify')

var anime = require('animejs')

var composer = require('./compose')
var display = require('./display')
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
    <div class="flex flex-column w-100 h-100 pa2 items-start overflow-y-scroll overflow-x-hidden">
      <h2 class="ph4 fw5">Request a review</h2>
      <p class="lh-copy">Please confirm you want to request a review of this preprint:/p>
      <button>confirm request</button>
    </div>
  `
}

function readreviews (state, emit, opts) {
  var title = html`<h1></h1>`
  var authors = html`<h2></h2>`

  var el = html`
  
  <div class="flex flex-column w-100 h-100 pa2 items-start overflow-y-scroll overflow-x-hidden">
    ${addreview(state, emit, opts)}
    ${title}
    ${authors}
    <div class="flex flex-row items-between mv4">
      <div class="ph4 f4 fw5">${opts.reviews.length} reviews</h2>
      <div class="ph4 f4 fw5">${opts.requests.length} review requests</h2>
    </div>
    ${opts.reviews.map(r => require('./display')(state, emit, r))}
  </div>
  
  `

  fetch(`/data/preprints/doi/${opts.doi}`).then(
    res => res.json()
  ).then(
    doidata => {
      console.log('DOI data returned', doidata)
      title.innerHTML = doidata.title
      authors.innerHTML = doidata.authors.list.map(a => a.fullName).join(', ')
    }
  )

  return el
}

function addreview (state, emit, opts) {
  if (!state.user) {
    var login = button(state, emit, { label: 'Log in to review this preprint' })
    login.onclick = () => { window.location = '/login-redirect' }
    return html`<div class="flex flex-row w-100 justify-end">${login}</div>`
  }
  var s = state.style.classes

  var write = button(state, emit, {
    label: 'Review this preprint',
    classes: 'ml2 bg-red white'
  })
  write.onclick = () => emit('pushState', './new')

  return html`
    <div class="w-100 ${s.col} items-end">
      <div class="flex flex-row">${write}</div>
    </div>
  `
}