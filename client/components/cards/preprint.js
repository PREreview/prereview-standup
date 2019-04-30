var html = require('choo/html')

module.exports = preprint

function preprint (state, emit, p) {
  var d = p.data
  var showreviews = html`
    <div class="mr2" style="cursor: pointer;">${d.reviews} Reviews</div>
  `
  showreviews.onclick = () => emit('pushState', `/reviews/${d.doi}`)

  var addreview = html`
    <div class="ml2" style="cursor: pointer;">Review this preprint</div>
  `
  addreview.onclick = () => emit('pushState', `/reviews/${d.doi}`)

  return html`
  
  <div class="article w-100 bb b--black-10 pa2 pb3 mb3">
    <div class="topic w-100 pv1">
      ${d.tags && d.tags.join(', ')}
    </div>

    <div class="title w-100" >
      <h3><a href="/reviews/${d.doi}">${d.title}</a></h3>
      <p class="">
        ${d.authors.map(a => `${a.firstName} ${a.lastName}`).join(', ')}
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