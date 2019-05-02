var html = require('choo/html')
var css = require('sheetify')

var anime = require('animejs')

var composer = require('./compose')
var display = require('./display')
var button = require('../button')

module.exports = function view (state, emit, reviews) {
  return html`
  
  <div class="flex flex-column w-100 h-100 pa2 items-start overflow-y-scroll overflow-x-hidden">
    ${addreview(state, emit)}
    <h2 class="ph4">${reviews.length} reviews</h2>
    ${reviews.map(r => require('./display')(state, emit, r))}
  </div>
  
  `
}

function addreview (state, emit) {
  if (!state.user) {
    var login = button(state, emit, { label: 'login to review this preprint' })
    login.onclick = () => { window.location = '/login' }
    return html`<div class="flex flex-row w-100 justify-end items-end">${login}</div>`
  }
  var s = state.style.classes

  var collapser = button(state, emit, {
    label: 'write a prereview',
    class: 'ml2'
  })
  var requester = button(state, emit, {
    label: 'request feedback',
    class: 'ml2'
  })

  var collapsee = html`
    <div class="w-100" style="height: 0;">

    </div>
  `

  var collapsed = true

  collapser.onclick = () => {
    if (collapsed) {
      collapsed = false

      anime({
        targets: collapsee,
        css: {
          height: 'auto',
        },
        easing: 'easeInOutExpo'
      });
    }
  }

  return html`
  
  <div class="w-100 ${s.col} items-end">
    <div class="flex flex-row">${requester}${collapser}</div>
    ${collapsee}
  </div>
  
  `
}