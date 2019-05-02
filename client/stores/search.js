// var debounce = require('lodash/debounce')

module.exports = function (state, emitter) {
  state.searched = false
  state.searchResults = Object.values(state.preprints).slice(0, 22)

  emitter.on('DOMContentLoaded', async function () {
    emitter.on('preprint-search:results', results => {
      state.searched = true
      state.searchResults = results
      emitter.emit('render')
    })
  })
}