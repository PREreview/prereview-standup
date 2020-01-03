const ORCID = require('orcid-utils')

module.exports = async (state, emitter) => {
  state.contentloaded = false
  state.user = null

  var userDo = verb =>
    fetch(`/data/users/me/${verb}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accept: true })
    }).then(getCurrentUser())

  var acceptCoC = () => {
    state.user.coc_accepted = true
    userDo('accept_coc')
    emitter.emit('render')
  }
  emitter.on('user:accept-coc', acceptCoC)

  var becomePrivate = () => {
    state.user.privacy_setup = true
    state.user.is_private = true
    userDo('become_private')
    emitter.emit('render')
  }
  emitter.on('user:become-private', becomePrivate)

  var becomePublic = () => userDo('become_public')
  emitter.on('user:become-public', becomePublic)

  emitter.on('DOMContentLoaded', function() {
    state.contentloaded = true
    if (state.user && state.renderonload) {
      emitter.emit('render')
      state.renderonload = false
    }

    emitter.on('user:update-me', getCurrentUser)
  })

  var updateProfilePic = formData => {
    fetch('/data/users/me/updateProfilePic', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(result => emitter.emit('render'))
      .catch(console.log)

    emitter.emit('render')
  }

  emitter.on('user:update-profile-picture', updateProfilePic)

  async function getCurrentUser() {
    try {
      var userdata = await fetch('/data/users/me')
      state.user = await userdata.json()

      if (Object.keys(state.user).length > 0) {
        var userBiography = await getUserBiography(state.user.orcid)
        state.user.orcidBiography = userBiography

        var userWorks = await getUserWorks(state.user.orcid)
        state.user.orcidPreprints = userWorks
      }

      if (!state.user || !state.user.orcid) {
        state.user = null
        emitter.emit('render')
        return
      }

      // // if we get here, the user is logged in and we have their data
      // if (state.route === '/') return (window.location = '/find')

      if (state.contentloaded) {
        emitter.emit('render')
      } else {
        state.renderonload = true
      }
    } catch (e) {
      state.user = null
    }
  }

  // Fetch user biography from ORCID
  const getUserWorks = orcidId =>
    new Promise(resolve =>
      fetch(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
        headers: {
          Accept: 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          var works = data.group
          var userPreprints = []

          for (var i = 0; i < works.length; i++) {
            var workGroup = works[i]
            var workSummary = workGroup['work-summary'][0]

            // transform timestamp into normal date
            var created_date = new Date(workSummary['created-date'].value)

            var preprintData = {
              created_date,
              journal_title: workSummary['journal-title']
                ? workSummary['journal-title'].value
                : null,
              title: workSummary.title.title.value,
              url: workSummary.url ? workSummary.url.value : null
            }

            userPreprints.push(preprintData)
          }

          return userPreprints
        })
        .then(userPreprints => resolve(userPreprints))
        .catch(err => resolve(null))
    )

  const getUserBiography = orcidId =>
    new Promise(resolve =>
      fetch(`https://pub.orcid.org/v3.0/${orcidId}/biography`, {
        headers: {
          Accept: 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.content) {
            return resolve(data.content)
          }
        })
        .catch(err => {
          console.log('err', err)
          return resolve(null)
        })
    )

  if (typeof window !== 'undefined') getCurrentUser()
}
