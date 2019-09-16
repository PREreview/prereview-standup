var html = require('choo/html')
var css = require('sheetify')

var template = require('../../lib/editor/templates/default')

var Quill = require('quill')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

var editorstyle = css`

:host .ql-editor {
  height: 500px !important;
  width: 100%;
}

`

var btnclasses = "flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-red white link dim outline-0 pa2 pointer br2 dtc v-mid b f6 noselect"

module.exports = function view (state, emit, preprint) {

  var toolbar = html`<div id="toolbar" class="flex flex-row"></div>`
  var editorinner = html`<div id="editor" class="flex ${editorstyle}"></div>`

  var btnstyle = state.style.classes.secondaryButton

  var submit = html`
    <div class="${btnclasses}">Publish now</div>
  `

  var publisher = html`<div class="red i b">${preprint.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.map(a => a.fullName).join(', ')}</h2>`

  var editorel = html`
  
  <div class="flex flex-column h-100 w-100 ph2 pv0">
    <div class="flex flex-column lh-copy pa3">
      ${publisher}
      <a class="black link" href="https://doi.org/${preprint.doi}" target="_blank">${title}</a>
      ${authors}
      <p>
        <b>Before you begin:</b> please make sure you've read our <a class="link dim red" target="_blank" href="/docs/code_of_conduct">code of conduct</a>.
        You might also find our <a class="link dim red" target="_blank" href="/docs/resources">PREreview guidelines</a> useful.
      </p>
    </div>
    ${toolbar}
    ${editorinner}
    <div class="flex flex-row justify-between pv2">
      <div class="${btnclasses}">Choose a template</div>
      <div class="flex flex-row">
        <div class="${btnclasses} mr2">Invite collaborators</div>
        ${submit}
        </div>
      </div>
    </div>
  </div>
  
  `

  var quill = new Quill(editorinner, {
    theme: 'snow',
    bounds: editorel,
    toolbar: toolbar,
    placeholder: "PREreview goes here...\n\n"
  })

  submit.onclick = () => emit('prereview:start-submission', {
    type: 'prereview',
    status: 'submitting',
    preprint: preprint,
    prereview: quill.getContents(),
    author: state.user
  })

  setTimeout(() => {
    // set contents to markdown template
    quill.updateContents(template)
  
    // focus cursor inside editor
    // quill.focus()
  }, 300)

  return editorel
}
