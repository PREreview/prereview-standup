var html = require('choo/html')
var css = require('sheetify')


module.exports = function component(state, emit, opts) {
  var radio = entry => {
    var input = html`<input name="${opts.name}" type="radio" id="${entry.id}" ${entry.checked ? 'checked' : ''} />`

    return {
      label: entry.label,
      id: entry.id,
      input: input,
      el: html`

      <div class="ma2">
        <label for="${entry.id}" class="pa0 ma0 lh-copy f6 pointer">
          ${input}
          <span class="pl2">${entry.label}</span>
        </label>
      </div>

      `
    }
  }
  var choices = opts.choices.map(radio)

  var getAnswer = () => {
    var chosen = choices.find(choice => choice.input.checked)
    if (!chosen) {
      return
    }
    return chosen.id
  }

  var el = html`
  
  <div class="${state && state.style ? state.style.choose : null}">
    ${choices.map(c => c.el)}
  </div>

  `
  
  return { el, getAnswer }
}