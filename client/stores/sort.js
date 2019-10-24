module.exports = async (state, emitter) => {
  state.sort = { by: 'reviews', desc: 'Most popular' }

  emitter.on('DOMContentLoaded', function () {
    if (state.user) emitter.emit('render')

    emitter.on('sort', d => {
      state.sort = d
      emitter.emit('render')
    })
  })
}
