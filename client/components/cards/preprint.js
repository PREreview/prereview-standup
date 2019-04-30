var html = require('choo/html')

module.exports = preprint

function preprint (state, emit, p) {
  var showreviews = html`
    <div class="mr2">${p.reviews} Reviews</div>
  `
  showreviews.onclick = () => emit('pushState', `/reviews/${p.doi}`)

  var addreview = html`
    <div class="ml2">Review this preprint</div>
  `
  addreview.onclick = () => emit('pushState', `/reviews/${p.doi}`)

  return html`
  
  <div class="article w-100 bb b--black-10 pa2 pb3 mb3">
    <div class="topic w-100 pv1">
      ${p.tags && p.tags.join(', ')}
    </div>

    <div class="title w-100" >
      <h3><a href="/reviews/${p.doi}">${p.title}</a></h3>
      <p class="">
        ${p.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ')}
      </p>
    </div>
    
    <div class="footer flex justify-between pv1">
      <div class="left i">
        Submitted by anon on 18 Jan, 2019
      </div>
      <div class="flex flex-row right"> 
        ${showreviews} |
        ${addreview}
      </div>
    </div>
  </div>
  
  `
}