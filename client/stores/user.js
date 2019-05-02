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
    var randompic = await fetch('https://randomuser.me/api/?gender=male&inc=picture&noinfo')
    state.user.picture = (await randompic.json()).results[0].picture
    if (state.contentloaded) {
      emitter.emit('render')
    } else {
      state.renderonload = true
    }
  } catch (e) {
    console.log('there is no user', e)
  }
}