var html = require('choo/html')

module.exports = store

var blockedroutes = [
  'startup'
]

function store (state, emitter) {
  state.navigator = {
    blocked: false
  }

  var routeisblocked = () => {
    var route = state.route
    if (!route) return
    return blockedroutes.indexOf(route) > -1
  }

  var isblocked = loc => {
    return state.navigator.blocked || routeisblocked()
  }

  var render = () => {
    if (isblocked()) return emitter.emit('navigator:renderblocked')
    emitter.emit(state.events.RENDER)
  }

  var splash = () => {
    var next = state.user.setupDone ? '/home' : '/startup'
    emitter.emit('pushState', next)
  }

  var block = () => state.navigator.blocked = true
  var unblock = () => state.navigator.blocked = false

  emitter.on('DOMContentLoaded', function () {
    emitter.on('navigator:render', render)
    emitter.on('navigator:splash', splash)
    emitter.on('navigator:block', block)
    emitter.on('navigator:unblock', unblock)
    // if (state.route === '/') setTimeout(splash, 2000)
  })
}
