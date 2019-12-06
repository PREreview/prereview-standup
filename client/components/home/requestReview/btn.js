var html = require('choo/html')
var css = require('sheetify')

var requestReview = css`
  :host {
    border-radius: 5px;
    font-weight: 600;
    padding-left: 5px;
    border: 0;
    height: 32px;
    width: 150px;
    font-size: 100%;
    color: white;
    cursor: pointer;
    background-color: #ff3333;
    margin-right: 7px;
    margin-bottom: 18px;
  }

  :host:hover {
    transition: all 0.1s;
    background-colio: #ff5b5b;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  }
`

module.exports = function(state, emit) {
  var requestReviewBtn = html`
  <button class="${requestReview}"> Request Review </span>
`

  requestReviewBtn.onclick = () => emit('requestreview-modal:toggle')

  return html`
    <div class="flex flex-row w-70 justify-end">
      ${requestReviewBtn}
    </div>
  `
}
