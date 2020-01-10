var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')
var raw = require('choo/html/raw')
var GRID = require('../../grid')

var avatarInputClass = css`
  :host {
    display: none;
  }
`

var avatarLabelClass = css`
  :host {
    position: relative;
    width: 128px;
    height: 128px;
    display: block;
  }

  :host:hover img {
    filter: brightness(70%);
    transition: all 0.3s ease;
  }

  :host:hover:before {
    content: "+";
    position: absolute;
    color: white;
    font-weight: 800;
    font-size: 2em;
    z-index: 1;
    top: 36%;
    left: 44%;
  }
`

var emailInputClass = css`
  :host {
    pointer-events: none;
    border: 1px solid rgba(255,255,255,.5);
  }
`

var emailInputEditClass = css`
  :host {
    border: 1px solid black;
  }
`

module.exports = class MyProfileCard extends Nanocomponent {
  constructor (id, state, emit, opts) {
    super()
    this.id = id
    this.emit = emit
    this.opts = opts
    this.localState = state.components[id] = {
      isEditingEmail: false
    }
  }

  createElement (state) {
    var { isEditingEmail } = this.localState
    var { user: { profile: { emails = [], isReceivingEmails, isEmailPrivate } = {} } = {} } = state
    var [email] = emails

    var profilepic = (state.user.profile && state.user.profile.pic) ? state.user.profile.pic : '/assets/illustrations/avatar.png'
    var biographyContainer = 'w-100 mt1'
    var biographyContent
    var avatarInput = html`<input type="file" id="avatar" value="" name="avatar" class="${avatarInputClass}">`
    var isReceivingEmailsCheckbox = html`<input type="checkbox" id="isReceivingEmailsCheckbox" checked=${isReceivingEmails} value="" name="isReceivingEmailsCheckbox">`
    var isEmailPrivateCheckbox = html`<input type="checkbox" id="isEmailPrivateCheckbox" checked=${isEmailPrivate} value="" name="isEmailPrivateCheckbox">`

    var emailInput = html`
        <input 
            type="email" 
            id="emailInput" 
            value="${email}" 
            name="email"
            placeholder="no email address"
            class="${isEditingEmail ? emailInputEditClass : emailInputClass}"
         >
    `

    var toggleIsEditingEmail = () => {
      this.localState.isEditingEmail = !isEditingEmail
      this.emit('render')
    }

    var updateEmailPreferences = () => {
      var isReceivingEmailsCheckbox = document.querySelector('#isReceivingEmailsCheckbox')
      var isEmailPrivateCheckbox = document.querySelector('#isEmailPrivateCheckbox')

      const formData = {
        isReceivingEmails: isReceivingEmailsCheckbox.checked,
        isEmailPrivate: isEmailPrivateCheckbox.checked
      }
      this.emit('user:update-email-preferences', formData)
    }

    var emailSubmitFunction = (e) => {
      e.preventDefault()
      const { email: emailInput } = e.currentTarget

      if (isEditingEmail) {
        const formData = {
          email: emailInput.value,
        }
        this.emit('user:update-personal-email', formData)
        state.user.profile.emails = [emailInput.value]
        emailInput.blur()
      }

      toggleIsEditingEmail()
    }

    var emailEditButton = html`
        <button 
            class="ml1 pl2 link dim blue" 
            type="${isEditingEmail ? 'submit' : 'button'}"
            onclick="${!isEditingEmail && toggleIsEditingEmail}"
            >
            ${isEditingEmail ? 'save' : 'edit'}
        </button>
    `

    isReceivingEmailsCheckbox.onchange = updateEmailPreferences
    isEmailPrivateCheckbox.onchange = updateEmailPreferences

    avatarInput.onchange = (event) => {
      const files = event.target.files
      const formData = new FormData()

      formData.append('avatar', files[0])

      this.emit('user:update-profile-picture', formData)
    }

    if (state.dimensions.width < GRID.LG) {
    } else {
      biographyContainer = `${biographyContainer} flex flex-row`
      biographyContent = 'ml1 pl2'
    }

    return html`
    <div class="w-100 center bg-white br3 pa1">
      <label for="avatar" class="mt3 ${avatarLabelClass} pointer">
        ${avatarInput}
        <img src="${profilepic}" class="br-100 h4 w4 dib"/>
      </label>

      <h2 class="mb2 fw4">${state.user.name}</h2>

      <div class="flex flex-row mt1 items-center">
        <div class="b">Email Address: </div>
        <div class="ml1 pl2"> 
        <form onsubmit="${emailSubmitFunction}">
         ${emailInput}
         ${emailEditButton}
        </form>
      </div>
      </div>
      
       <div class="flex flex-row mt1">
        <div class="b">Receive email notifications ? </div>
        <div class="ml1 pl2">${isReceivingEmailsCheckbox}</div>
      </div>
      
       <div class="flex flex-row mt1">
        <div class="b">Keep your email address private ? </div>
        <div class="ml1 pl2">${isEmailPrivateCheckbox}</div>
      </div>
      
      <h3 class="pt3 mt1 f5 fw3 mv0 flex flex-row">
        <div class="b"> ORCiD </div>
        <a class="link dim dark-red code ml1" href="https://orcid.org/${state.user.orcid}" target="_blank">
          ${state.user.orcid}
        </a>
      </h3>
      
      <div class="flex flex-row mt1">
        <div class="b">Community appreciation: </div>
        <div class="ml1 pl2">None yet</div>
      </div>

      <div class=${biographyContainer}>
        <div class="b">Biography: </div>
        <div class=${biographyContent}>${raw(state.user.profile.biography || state.user.orcidBiography || '-')}</div>
      </div>
    </div>
  `
  }

  update (state) {
    return true
  }
}
