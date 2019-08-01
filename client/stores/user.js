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
    var userdata = await fetch('/userdata')
    state.user = await userdata.json()

    if (!state.user.picture) {
      state.user.picture = '/assets/illustrations/Illustrations_Transparent_Default_Avatar.png'
    } 

    if (state.contentloaded) {
      emitter.emit('render')
    } else {
      state.renderonload = true
    }
  } catch (e) {
    console.log('there is no user', e)
  }
}