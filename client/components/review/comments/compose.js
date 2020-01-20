const html = require('choo/html')
const css = require('sheetify')

const Quill = require('quill')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

const editorStyle = css`

:host > .ql-editor {
  height: 200px !important;
  width: 100%;
}

`

module.exports = function view (state, emit, preReview, onCommentAdd) {
  const innerEditor = html`<div class="flex ${editorStyle}"></div>`

  const submit = html`
    <div class="flex flex-row justify-center content-center items-center v-mid bn h2 f5 bg-red white link dim outline-0 pa2 pointer br2 dtc v-mid b f6 noselect">
      Add comment
    </div>
  `

  const editorElement = html`
  <div class="flex flex-column h-100 w-100 ph2 pb2 mb2">
    ${innerEditor}
    <div class="flex flex-row justify-between pv2">
      <div class="i f5">
        Commenting as ${state.user.name}.
      </div>
      ${submit}
    </div>
  </div>
  `

  const quill = new Quill(innerEditor, {
    theme: 'snow',
    bounds: editorElement,
    modules: { toolbar: false },
    placeholder: 'Comment on this review...\n\n'
  })

  submit.onclick = () => {
    emit('comment:submit', {
      prereview_id: preReview.prereview_id,
      content: quill.getText()
    })

    onCommentAdd(quill.getText())

    quill.setText('\n')
  }

  return editorElement
}
