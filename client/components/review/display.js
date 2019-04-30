var html = require('choo/html')
var css = require('sheetify')

var sample = require('lodash/sample')

var getn = () => sample([1, 2, 3, 4, 5, 6, 7, 8, 9])

var contentStyle = css`

:host p {
  margin-top: 0;
}

:host {
  /* max-height: 200px; */
  max-height: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
}

`

module.exports = function view (state, emit, review) {
  
  return html`
    
  <div class="flex flex-column w-100 pv3 ph4 f4 mid-gray lh-copy">
    <div class="flex flex-row w-100 mb4">
      <div class="flex flex-column">
        <div class="b dark-gray">${review.author.firstName} ${review.author.lastName}</div>
        <div>${review.created.toDateString()}</div>
      </div>
    </div>
    <div class="flex flex-column lh-copy w-100 pb2 mb2">
      ${review.content}
    </div>
    <div class="flex flex-row lh-copy w-100 pb3 bb bw2 b--light-gray justify-between">
      <div class="flex flex-row">
        ${require('../utils/svg')(state, emit, { size: '30px', name: 'thumbs-up', classes: 'mr2'})} ${getn()}
      </div>
      <div class="underline">${getn()} comments</div>
    </div>
  </div>
  
  `
}
