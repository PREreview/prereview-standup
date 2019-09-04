var html = require('choo/html')
var css = require('sheetify')

var template = require('../../lib/editor/templates/default')

var Quill = require('quill')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

var editorstyle = css`

.ql-editor {
  height: 500px !important;
  width: 100%;
}

`

module.exports = function view (state, emit, opts) {

  var editorinner = html`<div id="editor" class="flex ${editorstyle}"></div>`

  var btnstyle = state.style.classes.secondaryButton

  var submit = html`
    <div class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-red white link dim outline-0 pa2 pointer br2 dtc v-mid b f6 noselect">Publish now</div>
  `
  submit.onclick = () => emit('pushState', state.href.replace('/new', '/submitted'))

  var publisher = html`<div class="red i b">${opts.publisher}</div>`
  var title = html`<h1 class="mv1 lh-solid">${opts.title}</h1>`
  var authors = html`<h2 class="f4 mv1 i lh-title">${opts.authors.list.map(a => a.fullName).join(', ')}</h2>`

  var editorel = html`
  
  <div class="flex flex-column h-100 w-100 ph2 pv0">
    <div class="flex flex-column lh-copy pa3">
      ${publisher}
      <a class="black link" href="https://doi.org/${opts.doi}" target="_blank">${title}</a>
      ${authors}
      <p>
        <b>Before you begin:</b> please make sure you've read our <a class="link dim red" target="_blank" href="/docs/code_of_conduct">code of conduct</a>.
        You might also find our <a class="link dim red" target="_blank" href="/docs/resources">PREreview guidelines</a> useful.
      </p>
    </div>
    ${editorinner}
    <div class="flex flex-row justify-between pv2">
      <div class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-dark-gray white link dim outline-0 pa2 pointer br2 mr2 dtc v-mid b f6 noselect">Choose a template</div>
      <div class="flex flex-row">
        <div class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-dark-gray white link dim outline-0 pa2 pointer br2 mr2 dtc v-mid b f6 noselect">Invite collaborators</div>
          ${submit}
        </div>
      </div>
    </div>
  </div>
  
  `

  var MarkdownShortcuts = require('../../lib/editor/markdownShortcuts')
  Quill.register('modules/markdownShortcuts', MarkdownShortcuts)

  var quill = new Quill(editorinner, {
    theme: 'snow',
    bounds: editorel,
    toolbar: editorel,
    placeholder: "Review goes here...\n\n",
    modules: {
     
      markdownShortcuts: {}
    }
  })

  // set contents to markdown template
  quill.updateContents(template)

  // focus cursor inside editor
  setTimeout(() => quill.focus(), 300)

  return editorel
}
