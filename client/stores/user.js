const ORCID = require('orcid-utils')

module.exports = async (state, emitter) => {
  state.contentloaded = false
  state.user = null

  var userDo = verb => fetch(`/data/users/me/${verb}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ accept: true })
  }).then(
    getCurrentUser()
  )

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
  
  emitter.on('DOMContentLoaded', function () {
    state.contentloaded = true
    if (state.user && state.renderonload) {
      emitter.emit('render')
      state.renderonload = false
    }

    emitter.on('user:update-me', getCurrentUser)
  })

  async function getCurrentUser () {
    try {
      var userdata = await fetch('/data/users/me')
      state.user = await userdata.json()
  
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

  if (typeof window !== 'undefined') getCurrentUser()
}
