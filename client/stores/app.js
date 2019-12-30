module.exports = (state, emitter) => {
  state.dimensions = {
    width: (window.innerWidth > 0) ? window.innerWidth : screen.width,
    height: (window.innerHeight > 0) ? window.innerHeight : screen.height
  }

  state.appdata = {
    title: 'PREreview',
    settings: {},
    version: require('../package.json').version
  }

  var onresize = function(e) {
    //note i need to pass the event as an argument to the function
    var width = e.target.outerWidth
    var height = e.target.outerHeight

    state.dimensions.width = width
    state.dimensions.height = height

    emitter.emit('render')
  }

  window.addEventListener('resize', onresize)
}
