module.exports = async (state, emitter) => {
  try {
    var userdata = await fetch('/userdata')
    state.user = await userdata.json()
    emitter.emit('user:loggedin')
  } catch (e) {
    console.log('there is no user')
  }

  emitter.on('DOMContentLoaded', function () {
    if (state.user) emitter.emit('render')
    emitter.on('user:loggedin', () => emitter.emit('render'))
  })
}