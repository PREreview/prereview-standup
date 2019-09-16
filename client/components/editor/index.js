var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var template = require('../../lib/editor/templates/default')

var Quill = require('quill')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

var innerstyle = css`

:host {
  overflow-y: auto;
}

:host .ql-editor {
  min-height: 250px !important;
  width: 100%;
  overflow-y: visible;
  font-size: 16px;
}

`

var outerstyle = css`

:host {
  flex-grow: 2;
}

`

module.exports = class Editor extends Nanocomponent {
  constructor (id, state, emit, opts) {
    super()
    this.emit = emit
    this.opts = opts
  }

  createElement (state) {
    var toolbar = html`<div id="toolbar" class="flex flex-row justify-between"></div>`
    var editorinner = html`<div id="editor" class="flex ${innerstyle}"></div>`

    var editorel = html`

    <div class="flex flex-column w-100 ${outerstyle}">
      ${toolbar}
      ${editorinner}
    </div>

    `

    this.quill = new Quill(editorinner, {
      theme: 'snow',
      debug: 'error',
      bounds: editorel,
      scrollingContainer: editorinner,
      toolbar: toolbar
    })

    this.contents = null

    this.quill.on('text-change', (oldDelta, newDelta) => {
      this.contents = newDelta
    })

    return editorel
  }

  load () {
    // console.log('the Editor component just loaded into the DOM')
    // set contents to markdown template
    this.quill.updateContents(template)

    // focus cursor inside editor
    this.quill.focus()
  }

  // Implement conditional rendering
  update (state) {
    // console.log('the app is asking if the Editor component wants to update')
    return false // do not update
  }
}
