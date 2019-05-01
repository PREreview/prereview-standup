module.exports = async (state, emitter) => {
  state.filters = {
    main: {
      sort: 'date'
    }
  }

  emitter.on('DOMContentLoaded', function () {
    if (state.user) emitter.emit('render')

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