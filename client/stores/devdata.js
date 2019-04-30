module.exports = store

var preprintdata = require('../assets/data/preprint_seed_data.json')
var reviewdata = require('../assets/data/review_seed_data.json')

var lunr = require('lunr')

var ppidx = lunr(function () {
  this.field('title')
  this.ref('doi')

  preprintdata.forEach(p => {
    this.add(p)
  })
})

var lunr = require('lunr')

function store(state, emitter) {
  state.preprints = {}
  state.reviews = reviewdata
  state.preprintIndex = ppidx

  preprintdata.forEach(p => {
    state.preprints[p.doi] = p
  })

  state.getpreprints = query => {
    if (query) {
      return ppidx.search(query).map(r => state.preprints[r.ref])
    } else {
      return Object.values(state.preprints)
    }
  }

  emitter.on('DOMContentLoaded', function () { })
}
