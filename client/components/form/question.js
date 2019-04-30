var html = require('choo/html')
var field = require('./')

module.exports = function question(state, emit, opts) {
  var fieldel = field[opts.field.type](state, emit, opts.field)

  var getAnswer = () => {
    return {
      question: opts.question,
      name: opts.field.name,
      answer: fieldel.getAnswer()
    }
  }

  var el = html`
  
  <div class="${state.style.classes.question} ba mv3 pa2">
    <fieldset name="${opts.name}" class="ba b--transparent ph0 pv0 mh0">
      <p class="pa0 ma0">${opts.question}</p>
      ${fieldel.el}
    </fieldset>
  </div>

  `

  return {
    el, getAnswer
  }
}