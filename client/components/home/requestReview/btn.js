var html = require("choo/html");
var button = require("../../button");

module.exports = function(state, emit) {
  return html`
    <div class="flex flex-row w-70 justify-end">
      ${addRequestBtn(state, emit)}
    </div>
  `;
};

function addRequestBtn(state, emit) {
  var requestReviewBtn = button(state, emit, {
    label: "Request Review",
    classes: "ml2 bg-red white"
  });

  requestReviewBtn.onclick = () => emit("requestreview-modal:toggle");

  return html`
    <div>${requestReviewBtn}</div>
  `;
}