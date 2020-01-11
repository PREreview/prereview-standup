var html = require('choo/html')
var GRID = require('../../../grid')

module.exports = function(state, emit) {
  var btnStyle = "padding-left: 16px; padding-right: 16px; height: 32px; border-radius: 16px; border: 0; font-size: 15px; width: fit-content;"

  if(state.dimensions.width < GRID.SM) {
    btnStyle = `${btnStyle} margin-bottom: 32px;`
  }

  var addBtn = html`
      <button class="nowrap dim bg-red br4 flex white flex-row items-center link noselect pointer mr2" style=${btnStyle}>
        Add PREreview | Request PREreview
      </button>
    `

  addBtn.onclick = () => emit('add-modal:toggle')

  return addBtn
}
