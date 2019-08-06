require('babel-polyfill')

var css = require('sheetify')
var choo = require('choo')

css('tachyons')

require('./theme')

var app = choo({
  href: false
})
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/user'))
app.use(require('./stores/app'))
app.use(require('./stores/docs'))
app.use(require('./stores/styles'))
app.use(require('./stores/devdata'))
app.use(require('./stores/search'))
app.use(require('./stores/sort'))

app.route('/', require('./views/landing'))
app.route('/find', require('./views/main'))
app.route('/profile', require('./views/profile'))
app.route('/users/*', require('./views/profile'))
app.route('/docs/*', require('./views/docs'))

// /prereviews/doi -> read
// /prereviews/doi/new -> write
// /prereviews/doi/request -> request
app.route('/prereviews/*', require('./views/review'))

module.exports = app.mount('body')
