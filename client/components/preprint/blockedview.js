var html = require('choo/html')
var raw = require('choo/html/raw')

module.exports = (state, emit, preprint) => {
  var publisher = html`<div class="red i b">${preprint.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.join(', ')}</h2>`
  var abstract = raw(`<p class="mt1">${preprint.abstract}</p>`)

  var site = preprint.id.split('/')[0]
  var identifier = preprint.id.replace(site + '/', '')

  var contentel = html`
    <div class="flex flex-column w-100 justify-start lh-copy pa3">
      ${publisher}
      <a class="black link" href="https://${site}.org/${identifier}" target="_blank">${title}</a>
      ${authors}
      <h3 class="mb1">Abstract</h3>
      ${abstract}
      <p class="b">
        You can access the <a href="https://${site}.org/${identifier}" target="_blank">full text of this preprint</a> at the preprint server's website.
      </p>
    </div>
  `

  return html`
  <div class="flex flex-column h-100 w-100" style="overflow-y: auto;">
    ${contentel}
  </div>
  `
}
