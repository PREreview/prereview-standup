var html = require('choo/html')

var button = require('../components/button')
var input = require('../components/form/input')

var sortBy = require('lodash/sortBy')

var TITLE = 'prereview-standup - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)


  var inputClasses = 'ma2 br1'
  var username = input(state, emit, { type: 'text', placeholder: 'username', classes: inputClasses })
  var password = input(state, emit, { type: 'password', placeholder: 'password', classes: inputClasses })

  var btn_login = button(state, emit, { label: 'Sign in', classes: 'ma2' })
  btn_login.onclick = () => {
    emit('user:login', { username: username.value, password: password.value })
  }

  return html`
    <body class="">
      <div id="body" class="body w-100 flex content-center justify-center items-center tc">
        <div class="flex flex-column self-center fl w-30 pa2 f7 ba1 br2 tc">
          <h1>Sign in</h1>
          ${username}
          ${password}
          ${btn_login}
        </div>
      </div>
    </body>
  `
}
