var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var css = require('sheetify')

var orcidPreprints = require('../../components/profile/orcidPreprints')

var preReviewContainerCss = css`
  :host {
    border-radius: 5px;
    background-color: #f7f7f7;
  }
`

var icon = require('../utils/icon')
var loading = require('../utils/loading')

module.exports = { otheruser, usercontent, start }

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
        var profilepic = (user.profile && user.profile.pic) ? user.profile.pic : '/assets/illustrations/avatar.png'
        var usersince = new Date(user.created_at).toDateString()

        inner = html`
          <div class="flex flex-column justify-center items-center tc w-50-l w-70-m w-90-s mh-100">
            <img src="${profilepic}" class="br-100 h4 w4 dib"/>
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

function usercontent (state, emit) {
  let n_orcidPreprints = state.user && state.user.orcidPreprints ? state.user.orcidPreprints.length : 'None yet'

  return html`
    <div class="content fl f6 lh-copy w-100 pt3">
      <div class="mt3 pt3">
        <div class="tracked flex flex-row">
          <h2 class="mt0 tc fw4 mb1">Your PREreviews (${state.user.prereviews.length || 'None yet'})</h2>
        </div>
        <div class="bt b--black-20 mt3 mb4"></div>
        ${prereviews(state, emit)}
      </div>
    </div>
    <div class="content fl f6 lh-copy w-100 pt2">
      <div class="mt3 pt3">
        <div class="tracked flex flex-row">
          <h2 class="mt0 tc fw4 mb1">Your preprints (${n_orcidPreprints}) </h2>
        </div>
        <div class="bt b--black-20 mt3 mb4"></div>
        ${orcidPreprints(state, emit)}
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
      <div>
        <p>You haven't written any PREreviews yet.</p>
      </div>
    `
  }
}

function userreviews (state, emit, user) {
  var reviews = user.prereviews

  if (reviews && reviews.length > 0) {
    return html`
      <div class="flex flex-column pa3 w-100">
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
  var revdate = formatDate(p.date_created)

  return html`
    <div class="flex-row justify-start items-start pa3 pt2 mt4 lh-copy mb2 ${preReviewContainerCss}">
      <div class="flex flex-row justify-end w-100">
        <div>
          PREreviewed on <span class="b ml2">${revdate}</span>
        </div>
      </div>

      <div class="flex flex-row justify-between w-100">
        <a class="black f5 fw7 tl" href="/preprints/${p.preprint.id}">${p.preprint.title}</a>
      </div>

      <div class="flex flex-row mt2 w-100">
        <div class="flex flex-row nowrap items-center">
          ${icon('message-square')}
          <span class="red ml2"> 0 </span>
        </div>

        <div class="flex flex-row nowrap items-center ml3">
          ${icon('clap', { size: '30px' })}
          <span class="red ml2"> 0 </span>
        </div>
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
}

// format date from 2019-03-13T03:29:22.099Z to 2019-03-13
const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()
  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day
  return [year, month, day].join('-')
}
