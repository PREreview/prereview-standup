var html = require('choo/html')
var css = require('sheetify')

var Editor = require('../editor')
var templates = require('../../lib/editor/templates/default')

var btnclasses = 'flex flex-row justify-center content-center items-center v-mid bn h2 f5 white link dim outline-0 pa2 pointer br2 dtc v-mid b f6 noselect'

css`

#template-menu-btn:hover {
  color: white;
  opacity: 100%;
}

#template-menu-btn:focus {
  color: white;
  opacity: 100%;
}


#template-dropdown:hover {
  background: white;
  opacity: 100%;
}

`

module.exports = function view (state, emit, preprint) {
  var editor = state.cache(Editor, `editor-${preprint.id.replace('/', '-')}`)

  var maybemeta = () => {
    if (preprint.pdfblocked) return null
    var publisher = html`<div class="red i b">${preprint.publisher}</div>`
    var title = html`<h1 class="mv1 lh-solid">${preprint.title}</h1>`
    var authors = html`<h2 class="f4 mv1 i lh-title">${preprint.authors.list.join(', ')}</h2>`
    return html`
    <div class="flex flex-column w-100">
      ${publisher}
      <a class="black link" href="https://doi.org/${preprint.id.replace('doi/', '')}" target="_blank">${title}</a>
      ${authors}
    </div>
    `
  }

  var submit = html`
    <div class="${btnclasses} bg-red">Publish now</div>
  `

  var toolbarButtons = toolbarBtns(state, emit, editor)

  var editorel = html`

  <div class="flex flex-column h-100 w-100 ph2 pv0">
    <div class="flex flex-column lh-copy pa3">
      ${maybemeta()}
      <p class="mv1">
        <b>Before you begin:</b> please make sure you've read our <a class="link dim red" target="_blank" href="/docs/code_of_conduct">code of conduct</a>.
        You might also find our <a class="link dim red" target="_blank" href="/docs/resources">PREreview guidelines</a> useful.
      </p>
    </div>
    ${editor.render({ toolbarButtons })}
    <div class="flex flex-row justify-start pv2">
      <div class="flex flex-row">
      </div>
      ${submit}
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

function toolbarBtns (state, emit, editor) {
  var templateBtn = html`<button id="template-menu-btn" class="white" style="width: auto; height: 24px; ">Choose a template</button>`
  var templateDropdown = html`
  <div id="template-dropdown" class="bg-white dn flex-column dark-gray nowrap" style="position: fixed; top: 0; right: 20px; width: auto;" style="z-index: 999;">
  </div>
  `

  templateBtn.onclick = e => {
    e.stopPropagation()
    console.log(templateDropdown)
    var viewportOffset = templateBtn.getBoundingClientRect()
    // templateDropdown.style.left = viewportOffset.left - 200 + 'px'
    templateDropdown.style.top = viewportOffset.top - (68) + 'px'
    templateDropdown.classList.toggle('dn')
    templateDropdown.classList.toggle('flex')
    return false
  }

  Object.keys(templates).forEach(tname => {
    var option = html`<div class="flex flex-row items-center bg-white h2 pointer ba b--black-10 pa3">${tname}</div>`
    option.onclick = () => {
      editor.quill.setContents(templates[tname])
      templateDropdown.classList.remove('flex')
      templateDropdown.classList.add('dn')
    }
    templateDropdown.appendChild(option)
  })

  return html`
    <div class="flex flex-row" style="position: relative;">
      ${templateBtn}
      ${templateDropdown}
    </div>
  `
}
