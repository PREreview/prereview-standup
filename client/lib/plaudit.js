const html = require('choo/html')

module.exports = {
  script: html`<script async src="https://prereview-review.plaudit.pub/embed/endorsements.js" data-embedder-id="prereview" ></script>`,
  addDOItoHead: (DOI) => {
    let meta = document.getElementById('plauditDOI')

    if (!meta) {
      meta = document.createElement('meta')
      meta.id = 'plauditDOI'
      document.getElementsByTagName('head')[0].appendChild(meta)
    }

    meta.name = 'DC.Identifier'
    meta.content = DOI
  }
}
