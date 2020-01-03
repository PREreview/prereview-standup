var html = require('choo/html')
var css = require('sheetify')

var codeOfConductContainer = css`
  :host {
    padding: 35px;
    border: 1px solid black;
    border-radius: 5px;
    -webkit-box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.38);
    -moz-box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.38);
    box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.38);
  }
`

var agreeBtnContainer = css`
  :host {
    padding-left: 16px;
    padding-right: 16px;
    height: 32px;
    line-height: 30px;
    margin-top: 5px;
    font-size: 15px;
  }
`

module.exports = (state, emit) => {
  return html`
    <div class="flex flex-column justify-start">
      ${agreeButton(state, emit)}
    </div>
  `
}

function agreeButton(state, emit, opts) {
  var agree = html`
    <button class="ba br4 b--black-10 link dim bg-red white ${agreeBtnContainer}">
      Agree
    </button>
  `

  agree.onclick = e => {
    emit('user:accept-coc')
  }

  return html`
    <div class="flex flex-column items-center noselect measure ${codeOfConductContainer}">
      <h1 class="pt0 ma0">Welcome to PREreview</h1>

      <p>
        To continue, please read and agree to abide by our community
        <a href="/docs/code_of_conduct" target="_blank">code of conduct</a>.
      </p>

      <div class="flex flex-row justify-start pointer mw-50">
        ${agree}
      </div>
    </div>
  `
}
