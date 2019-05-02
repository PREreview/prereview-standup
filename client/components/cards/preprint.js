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
    <div class="ml2 red link dim" style="cursor: pointer;">write a prereview</div>
  `
  addreview.onclick = gotoreviews

  var reqreview = html`
  <div class="ml2 mr2 red link dim" style="cursor: pointer;">request feedback</div>
`
  reqreview.onclick = gotoreviews

  return html`
  
  <div class="flex flex-column article w-100 bb b--black-10 pa2 pb3 mb3 lh-copy">
    <div class="flex flex-row w-100 justify-between">
      <div class="topic pv1">
        ${d.tags && d.tags.join(', ')}
      </div>
      <div class="topic pv1">
        doi:<a class="link dim dark-gray" href="https://doi.org/${d.doi}">${d.doi}</doi>
      </div>
    </div>

    <div class="title w-100" >
      <h3 class="fw5 f5 ma0 mt1 lh-title">${title}</h3>
      <div class="f6 fw3 i mb1">
        ${d.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ')}
      </div>
    </div>
    
    <div class="footer flex justify-between pt1 pb2">
      <div class="left f6 fw3">
        Submitted by anon on 18 Jan, 2019
      </div>
      <div class="flex flex-row right"> 
        ${showreviews} | ${reqreview} | ${addreview}
      </div>
    </div>
  </div>
  
  `
}