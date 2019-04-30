var html = require('choo/html')

module.exports = preprint

function preprint (state, emit, p) {
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
      <div class="right"> 
        <a class="" href="/reviews/${p.doi}">${p.reviews} Reviews</a> |
        <a class="ml2" href="/reviews/${p.doi}">Review this preprint</a>
      </div>
    </div>
  </div>
  
  `
}