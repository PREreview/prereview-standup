module.exports = store

var preprintdata = require('../assets/data/preprint_seed_data.json')
var reviewdata = require('../assets/data/review_seed_data.json')

var random = require('lodash/random')
var fakedoiprefix = random(10000, 99999)
var fakedoi = () => `10.${fakedoiprefix}/${random(100000, 500000)}`

function store(state, emitter) {
  state.preprints = {}
  state.reviews = {}

  preprintdata.forEach(p => {
    p.reviews = []
    state.preprints[p.doi] = p
  })

  reviewdata.forEach(r => {
    var doi = fakedoi()

    r.doi = doi
    state.reviews[doi] = r
    state.preprints[r.preprint].reviews.push(doi)
  })

  emitter.on('DOMContentLoaded', function () { })
}
