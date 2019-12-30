var html = require('choo/html')
var css = require('sheetify')

var nav = require('../components/nav')
var GRID = require('../grid')

var TITLE = 'PREreview 2'

var abovefold = css`
  :host {
    height: calc(100vh - 150px);
    background-image: url(/assets/illustrations/landing.png);
    background-size: 100% auto;
    background-position: bottom right;
    background-repeat: no-repeat;
  }
`

var callstoaction = [
  {
    title: 'Train',
    img: 'c',
    description: 'Through our PREreview mentorship program, we invite researchers to learn about the peer review process and how to write constructive reviews.'
  },
  {
    title: 'Empower',
    img: 'e',
    description: 'By encouraging respectful behaviour and by recognizing each contribution, we empower new voices to enter the peer review process.'
  },
  {
    title: 'Connect',
    img: 'f',
    description: 'By interacting on PREreview and participating in PREreview live-streamed journal clubs, we enable you to collaborate and connect across research communities.'
  }
]

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  var firstSectionContainer
  var callstoactionContainer = 'w-100'

  if(state.dimensions.width < GRID.MD) {
    firstSectionContainer = 'pa4'
  } else {
    firstSectionContainer = 'pa5'
    callstoactionContainer = `${callstoactionContainer} flex`
  }

  return html`
    <body class="flex flex-column w-100 justify-center items-center space-around dark-gray sans-serif">
      ${nav(state, emit)}
      <div class="w-100 flex flex-row ${abovefold}">
        <div class=${firstSectionContainer}>
          <h1>A platform for crowdsourcing reviews of preprints.</h1>

          <h2 class="fw2">
            This is a beta. Please try it out and
            <a href="https://forms.gle/Yk8fAQqmtvQKmst68" target="_blank" class="link dim red">
              send us feedback
            </a>
            .
          </h2>

          <div class="ph3 pv3 nowrap dim dt bg-red br3 mr3 link pointer">
            <a class="white dtc v-mid b" href="/login-redirect">Join the community</a>
          </div>
        </div>
      </div>

      <div class="mt3">
        <h1>WHAT WE DO</h1>
      </div>

      <div class="${callstoactionContainer}">
        ${callstoaction.map(minicard => hatz({minicard, state}))}
      </div>
    </body>
  `
}

function hatz ({minicard, state}) {
  var minicardContainer = "flex flex-column items-center content lh-copy"

  if(state.dimensions.width > GRID.MD) {
    minicardContainer = `${minicardContainer} w-third`
  }

  return html`
    <div class=${minicardContainer}>
      <img class="w-70" src="/assets/illustrations/${minicard.img}.png" />
      <h1 class="mv1 pt0">${minicard.title}</h1>
      <h2 class="mv1 mb2 w-70 tc">${minicard.description}</h2>
    </div>
  `
}
