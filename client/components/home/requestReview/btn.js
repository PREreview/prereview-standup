var html = require('choo/html')
var css = require('sheetify')

var requestReview = css`
  :host {
    border-radius: 5px;
    font-weight: 400;
    padding-left: 5px;
    border: 0;
    height: 32px;
    width: 150px;
    font-size: 100%;
    color: white;
    cursor: pointer;
    background-color: #ff3333;
  }

  :host:hover {
    transition: all 0.1s;
    background-colio: #ff5b5b;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  }
`

module.exports = function(state, emit) {
  return html`
    <div class="flex flex-row w-70 justify-end">
      ${addRequestBtn(state, emit)}
    </div>
  `
}

function addRequestBtn(state, emit) {
  var requestReviewBtn = html`
    <button class="${requestReview}"> Request Review </span>
  `

  requestReviewBtn.onclick = () => emit('requestreview-modal:toggle')

  return html`
    <div>${requestReviewBtn}</div>
  `
}
