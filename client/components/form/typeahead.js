var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var lunr = require('lunr')
var debounce = require('lodash/debounce')

module.exports = function (state, emit, opts) {
  if (!opts.id) throw new Error('you must include opts.id to uniquely identify the element')
  return state.cache(TypeAhead, opts.id, opts).render(state)
}

class TypeAhead extends Nanocomponent {
  constructor (id, state, emit, opts) {
    super()
    this.opts = opts
    this.createIndex(opts)
  }

  createIndex (opts) {
    var self = this
    self.entriesbyid = {}

    self.index = lunr(function () {
      this.field('doi')
      this.field('authors')
      this.field('title')
      this.field('tags')
      this.field('authors')

      this.ref('doi')

      opts.entries.forEach(function (doc) {
        this.add(doc)
        self.entriesbyid[doc.doi] = doc
      }, this)
    })
  }

  createElement (state) {
    var divopts = this.opts.container || {}

    var container = html`
      <div ${divopts}>
        ${this.getInput(state)}
        ${this.getHelp()}
      </div>
    `

    return container
  }

  getHelp () {
    var examples = [
      'rapid flux',
      '+photosynhesis -maize',
      'tag:Neuroscience',
      'author:Kelly',
      'title:neuro*'
    ].map(eg => {
      var el = html`
        <div class="flex-row nowrap pa2 bg-light-gray br1 ba0 code ma1 link dim pointer">
          ${eg}
        </div>
      `
      el.onclick = () => {
        this.input.value = eg
      }

      return el
    })

    return html`
      <div class="flex flex-row flex-wrap pa3 tc">
        <div class="flex-row nowrap pa2 br1 ba0 ma1">
          try:
        </div>
        ${examples}
      </div>
    `
  }

  getInput (state) {
    var self = this
    var opts = this.opts.input || {}

    this.input = html`
      <input type="text" autofocus="autofocus" ${opts}></input>
    `

    this.input.addEventListener('input', inputValueUpdated)

    var search = debounce(runsearch, 200)

    function inputValueUpdated (e) {
      var val = e.srcElement.value.trim()
      search(val)
    }

    function runsearch (query) {
      var results = self.index.search(query)
      self.handleResults(results)
    }

    return this.input
  }

  handleResults (results) {
    var resultmap = results.map(r => {
      r.data = this.entriesbyid[r.ref]
      return r
    })
    this.opts.onresults(resultmap)
  }

  load () {
    // console.log('the typeahead component just loaded into the DOM')
  }

  // Implement conditional rendering
  update (state) {
    // console.log('the app is asking if the typeahead component wants to update')
    return false // do not update
  }
}

function group () {

}
