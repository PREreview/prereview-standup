// var debounce = require('lodash/debounce')

module.exports = function (state, emitter) {
  state.searchResults = Object.values(state.preprints).slice(0, 20)

  emitter.on('DOMContentLoaded', async function () {
    emitter.on('preprint-search:results', results => {
      state.searchResults = results
      emitter.emit('render')
    })
  })
}