// var debounce = require('lodash/debounce')
var lunr = require('lunr')

module.exports = async function (state, emitter) {
  state.searched = false
  state.searchResults = Object.values(state.preprints).slice(0, 22)
  state.search = {
    idx: await loadlunr(),
    entriesbyid: await loadentries()
  }

  emitter.on('DOMContentLoaded', async function () {
    emitter.on('preprint-search:results', results => {
      state.searched = true
      state.searchResults = results
      emitter.emit('render')
    })
  })
}

async function loadlunr () {
  var rawdata = await fetch('/assets/idx.json.gz')
  var data = await rawdata.json()
  return lunr.Index.load(data)
}

async function loadentries () {
  var rawdata = await fetch('/assets/alldata.json.gz')
  var data = await rawdata.json()
  return
}
