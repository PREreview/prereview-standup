const ORCID = require('orcid-utils')

module.exports = async (state, emitter) => {
  state.contentloaded = false
  
  emitter.on('DOMContentLoaded', function () {
    state.contentloaded = true
    if (state.user && state.renderonload) {
      emitter.emit('render')
      state.renderonload = false
    }
  })

  try {
    var userdata = await fetch('/data/users/me')
    state.user = await userdata.json()

    // if we get here, the user is logged in and we have their data

    if (!state.user.picture) {
      state.user.picture = '/assets/illustrations/avatar.png'
    }

    if (state.route === '/') return (window.location = '/find')

    if (state.contentloaded) {
      emitter.emit('render')
    } else {
      state.renderonload = true
    }
  } catch (e) {
    console.log('there is no user', e)
  }
}