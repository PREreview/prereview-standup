var html = require('choo/html')

module.exports = preprint

function preprint (state, emit, p) {
  var d = p.data || p

  var gotoreviews = () => emit('pushState', `/prereviews/${d.doi}`)

  var title = html`<div class="link dim" style="cursor: pointer;">${d.title}</div>`
  title.onclick = gotoreviews

  var showreviews = html`
    <div class="mr2 dark-gray link dim f6" style="cursor: pointer;">${p.reviews} reviews</div>
  `
  showreviews.onclick = gotoreviews

  var addreview = html`
    <div class="ph3 pv2 nowrap dim bg-red br3 flex flex-row items-center link noselect pointer">
      <p class="ma0 pa0 white dtc v-mid b f6">Write a PREreview</p>
    </div>
  `
  addreview.onclick = () => emit('pushState', `/prereviews/${d.doi}/new`)

  return html`
  
  <div class="flex flex-column article w-100 bb b--black-10 pa2 pb3 mb3 lh-copy">
    <div class="flex flex-row w-100 justify-start mv3 fw6">
      <div class="red i">
        ${d.sources.publisher}
      </div>
      <div class="red ttu">
        ${d.tags && `: ${d.tags.join(', ')}`}
      </div>
    </div>

    <div class="flex flex-column items-start w-100">
      <div>
        <h3 class="fw6 f4 ma0 lh-copy pb1 tl">${title}</h3>
        <div class="f5 fw1 i">
          ${d.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ')}
        </div>
      </div>
    </div>
    
    <div class="footer flex justify-between mv3">
      <div class="flex flex-row items-center flex-wrap left f6 fw3">
        Preprint published 7th December, 2018. First reviewed on 18 Jan, 2019
      </div>
      <div class="flex flex-row items-center flex-nowrap right f6 fw3"> 
        ${showreviews} ${addreview}
      </div>
    </div>
  </div>
  
  `
}