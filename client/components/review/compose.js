var html = require('choo/html')
var css = require('sheetify')

var Editor = require('../editor')

var btnclasses = "flex flex-row justify-center content-center items-center v-mid bn h2 f5 white link dim outline-0 pa2 pointer br2 dtc v-mid b f6 noselect"

module.exports = function view (state, emit, preprint) {
  var editor = choo.state.cache(Editor, `editor-${preprint.id.replace('/', '-')}`)

  var publisher = html`<div class="red i b">${preprint.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.map(a => a.fullName).join(', ')}</h2>`

  var submit = html`
    <div class="${btnclasses} bg-red">Publish now</div>
  `

  var templatebtn = gettemplatebtn(state, emit)

  var editorel = html`
  
  <div class="flex flex-column h-100 w-100 ph2 pv0">
    <div class="flex flex-column lh-copy pa3">
      ${publisher}
      <a class="black link" href="https://doi.org/${preprint.id.replace('doi/', '')}" target="_blank">${title}</a>
      ${authors}
      <p>
        <b>Before you begin:</b> please make sure you've read our <a class="link dim red" target="_blank" href="/docs/code_of_conduct">code of conduct</a>.
        You might also find our <a class="link dim red" target="_blank" href="/docs/resources">PREreview guidelines</a> useful.
      </p>
    </div>
    ${editor.render()}
    <div class="flex flex-row justify-between pv2">
      ${templatebtn}
      <div class="flex flex-row">
        <div class="${btnclasses} bg-dark-gray mr2">Invite collaborators</div>
        ${submit}
        </div>
      </div>
    </div>
  </div>
  
  `

  submit.onclick = () => {
    emit('prereview:start-submission', {
      type: 'prereview',
      status: 'submitting',
      preprint: preprint,
      prereview: editor.contents,
      author: state.user
    })
  }

  return editorel
}
