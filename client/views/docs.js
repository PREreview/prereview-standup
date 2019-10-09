var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')

var nav = require('../components/nav')

var TITLE = 'PREreview'

var style = css`

:host p {
  font-size: 22px;
}

:host li {
  font-size: 22px;
}

:host h2 {
  font-size: 30px;
}

:host h1 {
  color: red;
  text-align: center;
  font-size: 36px;
  margin-bottom: 10px;
}

:host img {
  display: block;
  margin: 0px auto;
}

:host sup {
  font-weight: 700;
  margin: 2px;
}

`

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var urlparts = state.href.split('/')
  var doc = urlparts[urlparts.length - 1].split('#')
  var content = raw(state.docs[doc])

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray">
      ${nav(state, emit)}
			<div class="w-60-ns w-90-s flex flex-column pa4 lh-copy ${style}">
        ${content}
      </div>
    </body>
  `
}
