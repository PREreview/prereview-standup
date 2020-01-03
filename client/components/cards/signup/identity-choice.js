var html = require('choo/html')
var css = require('sheetify')

var components = [
  {
    func: buttonSwitch,
    opts: {
      l: {
        content: 'Keep my identity private',
        detail: html`This choice shows a pseudonym on your profile, posts and comments. Your ORCID <img style="margin-bottom:-3px;" src="/assets/images/orcid_16x16.gif" alt="ORCID ID icon" />, real name, email address and other personal details will not be connected with your profile or activity on PREreview. However, the PREreview staff will always be able to see your identity.`,
        choice: 'private'
      },
      r: {
        content: 'Make my identity public',
        detail: html`This choice shows your real name on your profile, posts and comments, and links them to your ORCID <img style="margin-bottom:-3px;" src="/assets/images/orcid_16x16.gif" alt="ORCID ID icon" />. Anyone visiting PREreview will be able to see your true identity, and search engines such as Google will index your profile page and contributions.`,
        choice: 'public'
      }
    }
  }
]

var identityChoice = css`
  :host {
    padding: 35px;
    border: 1px solid black;
    border-radius: 5px;
    -webkit-box-shadow: 10px 10px 15px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: 10px 10px 15px 0px rgba(0,0,0,0.2);
    box-shadow: 10px 10px 15px 0px rgba(0,0,0,0.2);
  }
`

var optionButton = css`
  :host {
    border: 1px solid black !important;
  }

  :host:hover > p {
    visibility: visible;
  }

  :host:active {
    border: 1px solid black !important;
  }
`

var tooltiptext = css`
  :host {
    visibility: hidden;
    width: 45vw;
    background-color: black;
    color: #fff;
    text-align: left;
    border-radius: 6px;
    padding: 5px 16px;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }
`

module.exports = (state, emit) => {
  return html`
    <div class="flex flex-column justify-start">
      ${components.map(c => c.func(state, emit, c.opts))}
    </div>
  `
}

function buttonSwitch (state, emit, opts) {
  var btnclasses = 'ba br4 b--black-10 link'
  var leftclasses = 'br--left'
  var rightclasses = 'br--right'
  var selectedclasses = 'bg-red white'
  var unselectedclasses = 'bg-white dark-gray'
  var btnStyle = 'text-align: center; padding-left: 16px; padding-right: 16px; padding-top: 6px; padding-bottom: 6px; font-size: 15px; height: auto;'

  var left = html`
    <button class="${btnclasses} ${leftclasses} ${unselectedclasses} ${optionButton}" style=${btnStyle}>
      <p class=${tooltiptext}>${opts.l.detail}</p>
      ${opts.l.content}
    </button>
  `
  var right = html`
    <button class="${btnclasses} ${rightclasses} ${unselectedclasses} ${optionButton}" style=${btnStyle}>
      <p class=${tooltiptext}>${opts.r.detail}</p>
      ${opts.r.content}
    </button>
  `

  var lefthead = html`
    <div class="flex flex-row items-center justify-between">
      <p>${opts.l.content}</p>
    </div>
  `

  var righthead = html`
    <div class="flex flex-row items-center justify-between">
      <p>${opts.r.content}</p>
    </div>
  `

  var choice = 'private'

  var submit = html`
    <button class="link ${selectedclasses} dn pointer" style="padding-left: 16px; padding-right: 16px; height: 32px; line-height: 30px; border-radius: 16px; font-size: 15px;">
      Confirm your choice
    </button>
  `

  submit.onclick = e => {
    emit(`user:become-${choice}`)
  }

  var choicemade = () => {
    submit.classList.remove('dn')
  }

  left.onclick = e => {
    left.className = `${btnclasses} ${leftclasses} ${selectedclasses} ${optionButton}`
    right.className = `${btnclasses} ${rightclasses} ${unselectedclasses} ${optionButton}`
    lefthead.innerHTML = `<h3>${opts.l.content}</h3><span class="ttu small f7 red ba br1 b--red h1 r pa1">selected</span>`
    righthead.innerHTML = `<h3>${opts.r.content}</h3>`
    choice = opts.l.choice
    choicemade()
  }

  right.onclick = e => {
    left.className = `${btnclasses} ${leftclasses} ${unselectedclasses} ${optionButton}`
    right.className = `${btnclasses} ${rightclasses} ${selectedclasses} ${optionButton}`
    righthead.innerHTML = `<h3>${opts.r.content}</h3><span class="ttu small f7 red ba br1 b--red h1 r pa1">selected</span>`
    lefthead.innerHTML = `<h3>${opts.l.content}</h3>`
    choice = opts.r.choice
    choicemade()
  }

  return html`
    <div class="flex flex-column noselect measure ${identityChoice}">
      <p class="mb0">Please, select how you wish your identity to be displayed.</p>
      <p class="mb0">Please keep in mind that once you select the public option you will NOT be able to go back to the private setting.</p>

      <div class="flex flex-row justify-between">
        <div class="flex flex-row justify-start pointer mw-50" style="margin-top: 35px;">
          ${left}
          ${right}
        </div>
      </div>

      <div class="flex flex-column items-center lh-copy dark-gray mw-50 measure br2" style="margin-top: 35px; border-radius: 16px;">
        ${submit}
      </div>
    </div>
  `
}
