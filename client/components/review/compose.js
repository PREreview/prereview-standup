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

module.exports = function view (state, emit) {

  var editorinner = html`<div id="editor" class="flex ${editorstyle}"></div>`

  var btnstyle = state.style.classes.secondaryButton

  var submit = html`
    <div class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-light-red white link dim outline-0 pa2 pointer">Publish now</div>
  `
  submit.onclick = () => emit('pushState', state.href.replace('/new', '/submitted'))

  var editorel = html`
  
  <div class="flex flex-column h-100 w-100 pa3">
    <div class="flex flex-column lh-copy pa3">
      <p class="mt0 f4">Thank you for taking the time to PREreview this preprint.</p>

      <p>
        <b>Before you begin:</b> please make sure you've read our <a class="link dim red" target="_blank" href="/docs/code_of_conduct">code of conduct</a>.
        You might also find our <a class="link dim red" target="_blank" href="/docs/prereview_guidelines">PREreview guidelines</a> useful, and you can use our templates to help you get started.
      </p>
    </div>
    ${editorinner}
    <div class="flex flex-row justify-between pv2">
      <div><button class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-gray white link dim outline-0">choose a template</button></div>
      <div class="flex flex-row">
        ${submit}
        <div class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-gray white link dim outline-0 ml2 pa2 pointer">Invite a collaborator</div>
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
