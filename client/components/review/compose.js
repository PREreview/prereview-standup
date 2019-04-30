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

  var editorel = html`
  
  <div class="flex flex-column w-100 pa3">
    ${editorinner}
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
