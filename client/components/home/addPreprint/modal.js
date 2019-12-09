var html = require('choo/html')
var css = require('sheetify')
var input = require('../../form/typeahead')

var modal = css`
  :host {
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: hsla(0, 0%, 0%, 0.33);
  }
`

var modalContent = css`
  :host {
    background-color: #fefefe;
    margin: 10vh auto;
    padding: 24px 24px 32px 32px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 10px;
  }
`

var close = css`
  :host {
    color: rgb(120, 120, 120);
    font-size: 28px;
    font-weight: bold;
  }

  :host:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  :host:focus {
    color: red;
    text-decoration: none;
    cursor: pointer;
  }
`

var contentText = css`
  :host {
    color: black;
  }
`

var title = css`
  :host {
    color: rgb(120, 120, 120);
    font-size: 13.5px;
    text-transform: uppercase;
    font-weight: 400;
  }
`

var controlBtns = css`
  :host {
    border: 0;
    height: 32px;
    font-size: 13px;
    font-weight: 400;
    margin-top: 24px;
    margin-left: 16px;
    transition: all 0.2s;
    background-color: transparent;
    cursor: pointer;
    color: black;
  }

  :host:hover {
    opacity: 0.8;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  }
`

var preprintCountainer = css`
  :host {
    background-color: #f8f8f8;
    padding: 16px;
    margin-top: 24px;
  }
`

var preprintTitle = css`
  :host {
    font-size: 15px;
    color: black;
  }
`

var preprintPublisher = css`
  :host {
    font-size: 13px;
    color: grey;
  }
`

module.exports = function(state, emit) {
  if (state.addPreprint.modalVisible) {
    return html`
      <div class="${modal}">
        <div class="w-30 ${modalContent}">
          <div class="flex flex-row justify-between w-100">
            ${modalTitle(state, emit)} ${closeModalBtn(state, emit)}
          </div>
          <div class="w-100">
            ${handleContent(state, emit)}
          </div>
        </div>
      </div>
    `
  }
}

// change title text based on user authentication
function modalTitle(state, emit) {
  if (!state.user) {
    return html`
        <p class=${title}">Log in required</p>
      `
  }

  return html`
    <p class="${title}">Add entry</p>
  `
}

function closeModalBtn(state, emit) {
  var closeBtn = html`
    <div class="${close}">
      x
    </div
  `

  closeBtn.onclick = () => emit('addPreprint-modal:toggle')

  return html`
    <div>${closeBtn}</div>
  `
}

function foundPreprint(state, emit) {
  if (state.addPreprint.searchResult) {
    return html`
      <div class="w-100 ${preprintCountainer}">
        <p class="${preprintTitle}">
          ${state.addPreprint.searchResult.title}
        </p>
        <p class="${preprintPublisher}">
          ${state.addPreprint.searchResult.publisher}
        </p>
      </div>
    `
  }
}

// change content text based on user authentication
function handleContent(state, emit) {
  if (!state.user) {
    return logInRequired(state, emit)
  }

  return addEntry(state, emit)
}

function logInRequired(state, emit) {
  return html`
    <div>
      <p class="${contentText}">
        You need to be logged in to perform this action
      </p>
      <a href="/login-redirect"> Log in with your ORCID </a>
    </div>
  `
}

function addEntry(state, emit) {
  var cancelBtn = html`
    <button class="${controlBtns}">
      Cancel
    </button>
  `

  cancelBtn.onclick = () => emit('addPreprint-modal:toggle')

  var addPreprintBtn = html`
    <button class="${controlBtns}">
      Add preprint
    </button>
  `

  addPreprintBtn.onclick = () =>
    emit('addPreprint-modal:add-preprint', state.addPreprint.searchResult)

  var searchopts = {
    id: 'publication-search-input',
    entries: [],
    container: {
      class: 'mt2 flex flex-column items-center bg-white dark-gray f4'
    },
    input: {
      class: 'flex w-100',
      placeholder: 'Enter preprint DOI or an arXiv ID'
    },
    onsearch: val => emit('addPreprint-search:query', val),
    onresults: results => emit('addPreprint-search:results', results)
  }

  var search = input(state, emit, searchopts)

  return html`
    <div class="w-100">
      ${search} ${foundPreprint(state, emit)}
      <div class="flex flex-row justify-end w-100">
        ${cancelBtn} ${addPreprintBtn}
      </div>
    </div>
  `
}
