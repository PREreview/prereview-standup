var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var raw = require('choo/html/raw')
var css = require('sheetify')
var orcidPreprints = require('../../components/profile/orcidPreprints');

var biostyle = css`

:host > p {
  margin: 0;
}

`

var icon = require('../utils/icon')
var loading = require('../utils/loading')

module.exports = {
  myprofilecard, otheruser, usercontent, start
}

function otheruser (state, emit, waitforuserdata) {
  var userId = state.href.split('/users/')[1]
  return state.cache(OtherUser, `prereview-other-user-profile-${userId}`).render(state, emit, waitforuserdata)
}

class OtherUser extends Nanocomponent {
  constructor () {
    super()
    this.updated = 0
  }

  createElement (state, emit, waitforuserdata) {
    this.loader = loading()

    var el = html`
      <div class="flex flex-column justify-center items-center w-100 center bg-white br3 pa3 pa4-ns">
        ${this.loader}
      </div>
    `

    this.populateUser(state, emit, waitforuserdata)

    return el
  }

  populateUser (state, emit, waitforuserdata) {
    var self = this
    self.updated = Date.now()

    waitforuserdata.then(insertData)

    function insertData (user) {
      var inner

      if (user) {
        console.log('loaded user profile data', user)
        var orcid = user.orcid ? html`
          <h3 class="mt1 f5 fw3 mv0">
            ORCID
            <img src="/assets/images/orcid_16x16.gif" alt="ORCID ID icon" />
            <a class="link dim dark-red code" href="https://orcid.org/${user.orcid}" target="_blank">
              ${user.orcid}
            </a>
          </h3>
        ` : null

        var privateuser = user.is_private ? html`<h3>This user's profile is private.</h3>` : null
        var profilepic = (user.profile && user.profile.pic) ? user.profile.pic + '&s=128' : '/assets/illustrations/avatar.png'
        var usersince = new Date(user.created_at).toDateString()

        inner = html`
          <div class="flex flex-column justify-center items-center tc w-50-l w-70-m w-90-s mh-100">
            <img src="${profilepic}" class="br-100 h4 w4 dib" title="user profile picture">
            <h1 class="mb1 fw4">${user.name}</h1>
            ${orcid}
            <p>Member since ${usersince}.</p>
            ${privateuser}
            ${userreviews(state, emit, user)}
          </div>
        `
      } else {
        inner = html`
          <div class="tc">
            <h2 class="mb1 fw4">No such user</h2>
          </div>
        `
      }

      self.loader.replaceWith(inner)
    }
  }

  update (state) {
    if (Date.now() - this.updated > 60000) {
      // update if the user data is > 60 seconds old
      return true
    }
    return false
  }
}

function myprofilecard (state, emit) {
  var gravatartxt = state.user.profile.pic
    ? null
    : html`You can choose your profile picture by registering your email on <a href="https://gravatar.com">Gravatar</a>.`

  var profilepic = state.user.profile.pic ? state.user.profile.pic + '&s=128' : '/assets/illustrations/avatar.png'

  return html`
    <div class="w-100 center bg-white br3 pa3 pa4-ns">
      <div class="tc">
        <img src="${profilepic}" class="br-100 h4 w4 dib" title="your picture">
        ${gravatartxt}
        <h2 class="mb1 fw4">${state.user.name}</h2>
        <h3 class="mt1 f5 fw3 mv0">
          ORCID
          <img src="/assets/images/orcid_16x16.gif" alt="ORCID ID icon" />
          <a class="link dim dark-red code" href="https://orcid.org/${state.user.orcid}" target="_blank">
            ${state.user.orcid}
          </a>
        </h3>
      </div>
    </div>
  `
}

function usercontent (state, emit) {
  return html`
    <div class="w-100 flex flex-row justify-center mt1">
      <div class="content fl f6 lh-copy w-50 pa3 br b--black-20">
        <div class="ttu tracked">
          <h2 class="mt0 tc fw4">Your Profile</h2>
        </div>
        <div class="flex flex-column pa4">
          <div class="flex flex-row justify-between">
            <div class="b">Biography</div>
            <div class="ml2 pl2 lh-copy ${biostyle}">${raw(state.user.profile.biography || state.user.orcidBiography || 'not yet filled in')}</div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="b">PREreviews</div>
            <div class="">${state.user.prereviews.length || 'None yet'}</div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="b">Community appreciation</div>
            <div class="">None yet</div>
          </div>
        </div>
      </div>
      <div class="flex flex-column content fl f6 lh-copy w-50 pa3">
        <div class="flex flex-column">
          <div class="ttu tracked">
            <h2 class="mt0 tc fw4">Your PREreviews</h2>
          </div>
          ${prereviews(state, emit)}
        </div>
        <div class="flex flex-column mt3 pt4 bt b--black-20">
          <div class="ttu tracked">
            <h2 class="mt0 tc fw4">Your preprints</h2>
          </div>
          ${orcidPreprints(state, emit)}
        </div>
      </div>
    </div>
  `
}

function prereviews (state, emit) {
  var reviews = state.user.prereviews

  if (reviews && reviews.length > 0) {
    return reviews.map(prereview)
  } else {
    return html`
    <div class="pa3 lh-copy tc">
      <p>You haven't written any PREreviews yet.</p>
    </div>
    `
  }
}

function userreviews (state, emit, user) {
  var reviews = user.prereviews

  if (reviews && reviews.length > 0) {
    return html`
      <div class="flex flex-column pa3">
        <h2>PREreviews</h2>
        ${reviews.map(prereview)}
      </div>
    `
  } else {
    return html`
    <div class="pa3 lh-copy tc">
      <p>This user hasn't written any PREreviews yet.</p>
    </div>
    `
  }
}

function prereview (p) {
  var revdate = (new Date(p.date_created)).toDateString()

  return html`
  <div class="flex flex-column justify-start items-start pa3 lh-copy ba b--light-gray mb2">
    <div class="flex flex-row mb2 items-between justify-between w-100">
      <div class="flex flex-row red">PREreviewed on <span class="b ml2">${revdate}</span></div>
      <div class="flex flex-row nowrap">
        <div class="flex flex-row nowrap items-center">${icon('message-square')} 0</div>
        <div class="flex flex-row nowrap items-center ml3">${icon('clap', { size: '30px' })} 0</div>
      </div>
    </div>
    <div class="flex flex-row">
      <a class="black f5 fw7 tl" href="/preprints/${p.preprint.id}">${p.preprint.title}</a>
    </div>
  </div>
  `
}

function start (state) {
  if (!state.user.coc_accepted || !state.user.privacy_setup) {
    return html`
  <div class="flex flex-row justify-center">
    <p>Once you have completed your signup you can start PREreviewing</p>
  </div>
  `
  }

  return html`
  <div class="flex flex-row justify-center">
    <div class="ph3 pv3 nowrap dim dt bg-red br3 link noselect">
      <a class="white dtc v-mid b" href="/find">Start PREreviewing</a>
    </div>
  </div>
  `
}
