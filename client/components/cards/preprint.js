var html = require('choo/html')

module.exports = preprint

function preprint (state, emit, p) {
  var d = p.data || p

  var gotoreviews = () => emit('pushState', `/reviews/${d.doi}`)

  var title = html`<div class="link dim" style="cursor: pointer;">${d.title}</div>`
  title.onclick = gotoreviews

  var showreviews = html`
    <div class="mr2 dark-gray link dim" style="cursor: pointer;">${p.reviews} reviews</div>
  `
  showreviews.onclick = gotoreviews

  var addreview = html`
    <div class="ml2 red link dim" style="cursor: pointer;">write a PREreview</div>
  `
  addreview.onclick = () => emit('pushState', `/reviews/${d.doi}/new`)

  var reqreview = html`
  <div class="ml2 mr2 red link dim" style="cursor: pointer;">request feedback</div>
`
  reqreview.onclick = () => emit('pushState', `/reviews/${d.doi}/request`)

  return html`
  
  <div class="flex flex-column article w-100 bb b--black-10 pa2 pb3 mb3 lh-copy">
    <div class="flex flex-row w-100 justify-between mv3">
      <div class="topic">
        ${d.tags && d.tags.join(', ')}
      </div>
      <div class="topic">
        doi:<a class="link dim dark-gray" href="https://doi.org/${d.doi}">${d.doi}</doi>
      </div>
    </div>

    <div class="flex flex-column items-start w-100">
      <div>
        <h3 class="fw5 f5 ma0 lh-copy pb1 tl">${title}</h3>
        <div class="f6 fw3 i lh-copy tl">
          ${d.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ')}
        </div>
      </div>
    </div>
    
    <div class="footer flex justify-between mv3">
      <div class="left f6 fw3">
        Preprint published 7th December, 2018. First reviewed on 18 Jan, 2019
      </div>
      <div class="flex flex-row right f6 fw3"> 
        ${showreviews} | ${reqreview} | ${addreview}
      </div>
    </div>
  </div>
  
  `
}