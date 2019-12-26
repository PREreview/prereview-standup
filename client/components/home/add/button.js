var html = require('choo/html')

module.exports = function(state, emit) {
  var addBtn = html`
      <div class="nowrap dim bg-red br4 flex flex-row items-center link noselect pointer mr2">
        <p class="ma0 pa0 white dtc v-mid b f6">Add Review | Request Review< /p>
      </div>
    `

  addBtn.onclick = () => emit('add-modal:toggle')

  return addBtn
}
