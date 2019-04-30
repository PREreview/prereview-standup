module.exports = async (state, emitter) => {
  state.filters = {
    main: {
      sort: 'date',
      filter: null
    }
  }

  try {
    var userdata = await fetch('/userdata')
    state.user = await userdata.json()
    emitter.emit('render')
  } catch (e) {
    console.log('there is no user')
  }

  emitter.on('DOMContentLoaded', function () {
    emitter.on('user:login', data => {
      Object.assign(state.user.data, data)
      state.user.loggedIn = true
      emitter.emit('pushState', '/')
    })

    emitter.on('sort', d => {
      state.filters[d.scope] = d.sort
      emitter.emit('render')
    })

    emitter.on('filter', d => {
      state.filters[d.scope] = d.filter
      emitter.emit('render')
    })
  })
}