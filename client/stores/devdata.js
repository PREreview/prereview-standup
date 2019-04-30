module.exports = store

var preprintdata = require('../assets/data/preprint_seed_data.json')
var reviewdata = require('../assets/data/review_seed_data.json')

function store(state, emitter) {
  state.preprints = {}
  state.reviews = reviewdata

  preprintdata.forEach(p => {
    state.preprints[p.doi] = p
  })

  emitter.on('DOMContentLoaded', function () { })
}
