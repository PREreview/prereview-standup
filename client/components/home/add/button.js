var html = require('choo/html')

module.exports = function(state, emit) {
  var addBtn = html`
      <div class="nowrap dim bg-red br4 flex flex-row items-center link noselect pointer mr2" style="padding-left: 16px; padding-right: 16px; height: 32px; border-radius: 16px;">
        <p class="ma0 pa0 ph2 white dtc v-mid" style="font-size:100%">Add PREreview | Request PREreview< /p>
      </div>
    `

  addBtn.onclick = () => emit('add-modal:toggle')

  return addBtn
}
