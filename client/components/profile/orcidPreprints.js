var html = require('choo/html')
var css = require('sheetify')

var container = css`
  :host:hover {
    cursor: pointer;
  }
`

var title = css`
  :host {
    color: black;
    font-size: 14px;
  }
`

var journalTitle = css`
  :host {
    font-size: 12px;
    color: grey;
  }
`

module.exports = function(state, emit) {
  const orcidPreprints = state.user.orcidPreprints
  if (!orcidPreprints || orcidPreprints.length === 0) {
    return html`
      <div class="pa3 lh-copy tc">
        <p>
          We don't know about any preprints authored by you. Let us know about
          preprints you've written by adding them to
          <a href="https://orcid.org/my-orcid" target="_blank"
            >your ORCID profile</a
          >.
        </p>
      </div>
    `
  }

  return orcidPreprints.map(p => {
    var preprintTemplate = html`
      <div class="${container}">
        <p class="${title}">${p.title}</p>
        <p class="${journalTitle}">${p.journal_title}</p>
        <hr />
      </div>
    `

    if (p.url) {
      preprintTemplate.onclick = () => window.open(p.url, '_blank');
    }

    return preprintTemplate
  })
}
