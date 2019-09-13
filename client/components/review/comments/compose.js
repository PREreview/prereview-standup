var html = require('choo/html')
var css = require('sheetify')

var Quill = require('quill')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

var editorstyle = css`

:host > .ql-editor {
  height: 200px !important;
  width: 100%;
}

`

module.exports = function view (state, emit, opts) {

  var editorinner = html`<div class="flex ${editorstyle}"></div>`

  var btnstyle = state.style.classes.secondaryButton

  var submit = html`
    <div class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-red white link dim outline-0 pa2 pointer br2 dtc v-mid b f6 noselect">
      Add comment
    </div>
  `
  submit.onclick = () => emit('pushState', state.href.replace('/new', '/submitted'))

  var editorel = html`
  
  <div class="flex flex-column h-100 w-100 ph2 pb2 mb2">
    ${editorinner}
    <div class="flex flex-row justify-between pv2">
      <div class="i f5">
        Commenting as ${state.user.name}.
      </div>
      ${submit}
    </div>
  </div>
  
  `

  var quill = new Quill(editorinner, {
    theme: 'snow',
    bounds: editorel,
    toolbar: editorel,
    placeholder: "Comment on this review...\n\n",
  })

  return editorel
}
