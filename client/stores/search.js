// var debounce = require('lodash/debounce')
var lunr = require('lunr')

module.exports = function (state, emitter) {
  state.searched = false
  state.searchResults = Object.values(state.preprints).slice(0, 22)
  state.search = {}

  // fetch('/assets/idx.json').then(
  //   res => res.json()
  // ).then(
  //   data => { state.search.idx = lunr.Index.load(data) }
  // ).catch(e => {
  //   console.error('lunr index loading failed', e)
  // })

  // fetch('/assets/alldata.json').then(
  //   res => res.json()
  // ).then(
  //   data => { state.search.lookup = data }
  // ).catch(e => {
  //   console.error('lunr index loading failed', e)
  // })

  emitter.on('DOMContentLoaded', async function () {
    emitter.on('preprint-search:results', results => {
      state.searched = true
      state.searchResults = results
      emitter.emit('render')
    })
  })
}
