var html = require('choo/html')
var raw = require('choo/html/raw')

var nav = require('../components/nav')

var TITLE = 'PREreview'

module.exports = view

function view (state, emit) {
	if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

	var urlparts = state.href.split('/')
	var doc = urlparts[urlparts.length - 1].split('#')
	var content = raw(state.docs[doc])

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray">
      ${nav(state, emit)}
			<div class="w-70 flex flex-column pa4 lh-copy measure-wide">
				<h1>Contents</h1>
        ${content}
      </div>
    </body>
  `
}
