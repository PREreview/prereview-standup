var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var Quill = require('quill')

css('quill/dist/quill.core.css')
css('quill/dist/quill.snow.css')

var innerstyle = css`

:host {
  height: auto;
  overflow-y: auto;
  padding: 10px;
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
  overflow-y: auto;
  position: relative;
}

`

module.exports = class Editor extends Nanocomponent {
  constructor (id, state, emit, opts) {
    super()
    this.emit = emit
    this.opts = opts
  }

  createElement (state) {
    var toolbar = require('./toolbar')(state.toolbarButtons)
    var editorinner = html`<div id="editor" class="flex ${innerstyle}"></div>`

    var editorel = html`

    <div id="editorouter" class="flex flex-column w-100 ${outerstyle}">
      ${toolbar}
      ${editorinner}
    </div>

    `

    this.quill = new Quill(editorinner, {
      theme: 'snow',
      debug: 'error',
      bounds: editorel,
      scrollingContainer: editorel,
      modules: {
        toolbar: toolbar
      }
    })

    this.contents = null

    this.quill.on('text-change', (oldDelta, newDelta) => {
      this.contents = newDelta
    })

    return editorel
  }

  load () {
    // // console.log('the Editor component just loaded into the DOM')
    // // set contents to markdown template
    // this.quill.updateContents(template['Quick template'])

    // focus cursor inside editor
    this.quill.focus()
  }

  // Implement conditional rendering
  update (state) {
    // console.log('the app is asking if the Editor component wants to update')
    return false // do not update
  }
}
