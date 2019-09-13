var html = require('choo/html')

module.exports = function comment (state, emit, c) {
  return html`
    <div class="flex-column w-100 pa3 f4 mid-gray lh-copy bt bl bw1 b--light-gray">
      <div class="flex flex-row justify-between w-100 mb2">
        <div class="b dark-gray fw5">${c.author.firstName} ${c.author.lastName}</div>
        <div>${c.created.toLocaleString({ dateStyle: 'full', timeStyle: 'medium' })}</div>
      </div>
      <div class="flex flex-column lhview-copy w-100 pb2 mb2">
        ${c.content}
      </div>
    </div>
  `
}
