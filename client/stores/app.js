module.exports = function(state, emitter) {
  state.appdata = {
    title: 'PREreview',
    settings: {},
    version: require('../package.json').version
  }
}