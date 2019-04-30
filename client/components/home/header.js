var html = require('choo/html')

// var button = require('../button')

module.exports = header

function header (state, emit) {
  var s = state.style.classes

  return html`
  
  <div class="header w-100 ${s.col} ${s.center} white pa5 flex flex-row justify-center items-center">
    <button class="white f4 link dim ma2 pa3 bg-red bw0">find a preprint to review</div>
    <div class="dark-gray f5 ma2">or</div>
    <button class="white ma2 link dim f4 pa3 bg-red bw0">request a review</div>
  </div>
  
  `
}