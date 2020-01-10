var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')
var loading = require('../components/utils/loading')

var TITLE = 'PREreview 2 - Submit PREreview'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var isSubmitting = state.prereviews.currentSubmission.status === 'submitted';

  var submit = html`
    <div class="ph3 pv3 nowrap dim dt bg-red br3 link pointer noselect">
      <span class="white dtc v-mid b">Submit PREreview</a>
    </div>
  `

  submit.onclick = () => {
    emit('prereview:confirm-submission')
    emit('render')
  }

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray sans-serif">
      ${nav(state, emit)}

      <div class="w-100 flex flex-column items-center">
        <div class="flex flex-column items-center w-70 tc measure">
          <img style="width: 200px;" src="/assets/images/loader.svg" />

          <h1>Your PREreview is ready to be submitted.</h1>
          <h2 class="fw2">Once you click submit your review will be assigned a DOI and permanently published.</h2>

          ${isSubmitting ? loading() : submit}
        </div>
      </div>
    </body>
  `
}
