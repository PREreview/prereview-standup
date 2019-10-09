var html = require('choo/html')
var css = require('sheetify')

var components = [
  {
    func: buttonSwitch,
    opts: {
      l: {
        content: 'Keep my identity private',
        detail: html`This choice shows a pseudonym on your profile, posts and comments. Your ORCID ID <img style="margin-bottom:-3px;" src="/assets/images/orcid_16x16.gif" alt="ORCID ID icon" />, real name, email address and other person details will not be connected with your profile or activity on PREreview. However, the PREreview staff will always be able to see your identity.`
      },
      r: {
        content: 'Make my identity public',
        detail: html`This choice shows your real name on your profile, posts and comments, and links them to your ORCID ID <img style="margin-bottom:-3px;" src="/assets/images/orcid_16x16.gif" alt="ORCID ID icon" />. Anyone visiting PREreview will be able to see your true identity, and search engines such as Google will index your profile page and contributions.`
      }
    }
  }
]

module.exports = (state, emit) => {
  return html`
  
  <body>
    <div class="flex flex-column w-100 pa4 justify-center items-center">
      <div class="flex flex-column justify-start">
        ${components.map(c => c.func(state, emit, c.opts))}
      </div>
    </div>
  </body>
  
  `
}

function buttonSwitch (state, emit, opts) {
  var btnclasses = 'pa3 ba br2 b--black-10 link dim'
  var leftclasses = 'br--left'
  var rightclasses = 'br--right'
  var selectedclasses = 'bg-red white b'
  var unselectedclasses = 'bg-white dark-gray'
  var left = html`<div class="${btnclasses} ${leftclasses} ${selectedclasses}">${opts.l.content}</div>`
  var right = html`<div class="${btnclasses} ${rightclasses} ${unselectedclasses}">${opts.r.content}</div>`

  var lefthead = html`
  <div class="flex flex-row items-center justify-between">
    <h3>${opts.l.content}</h3>
  </div>
  `

  var leftexplan = html`
  <div>
    ${lefthead}
    <p>${opts.l.detail}</p>
  </div>
  `

  var righthead = html`
  <div class="flex flex-row items-center justify-between">
    <h3>${opts.r.content}</h3>
  </div>
  `

  var rightexplan = html`  
  <div>
    <div>${righthead}</div>
    <p>${opts.r.detail}</p>
  </div>
  `

  left.onclick = e => {
    left.className = `${btnclasses} ${leftclasses} ${selectedclasses}`
    right.className = `${btnclasses} ${rightclasses} ${unselectedclasses}`
    lefthead.innerHTML = `<h3>${opts.l.content}</h3><span class="ttu small f7 red ba br1 b--red h1 r pa1">selected</span>`
    righthead.innerHTML = `<h3>${opts.r.content}</h3>`
  }

  right.onclick = e => {
    left.className = `${btnclasses} ${leftclasses} ${unselectedclasses}`
    right.className = `${btnclasses} ${rightclasses} ${selectedclasses}`
    righthead.innerHTML = `<h3>${opts.r.content}</h3><span class="ttu small f7 red ba br1 b--red h1 r pa1">selected</span>`
    lefthead.innerHTML = `<h3>${opts.l.content}</h3>`
  }

  return html`
  <div class="flex flex-column items-center noselect measure">
    <h1>Welcome to PREreview</h1>
    <h2>To start using PREreview you need to choose whether to publicly link your identity to your account.</h2>
    <div class="flex flex-row justify-start pointer mw-50">
      ${left}
      ${right}
    </div>
    <div class="flex flex-column lh-copy dark-gray mw-50 measure">
      <h2>What does this mean?</h2>
      ${leftexplan}
      ${rightexplan}
    </div>
  </div>
  `
}
