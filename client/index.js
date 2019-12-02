require('babel-polyfill')

var css = require('sheetify')
var choo = require('choo')

css('tachyons')

require('./theme')

var app = choo({
  href: true,
  hash: false
})
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.use(require('./stores/user'))
app.use(require('./stores/app'))
app.use(require('./stores/docs'))
app.use(require('./stores/prereviews'))
app.use(require('./stores/comments'))
app.use(require('./stores/styles'))
app.use(require('./stores/search'))
app.use(require('./stores/sort'))
app.use(require('./stores/requestreview'))

app.route('/styleguide', require('./views/styleguide'))
app.route('/', require('./views/landing'))
app.route('/login-redirect', require('./views/login-redirect'))
app.route('/find', require('./views/find'))
app.route('/profile', require('./views/profile'))

app.route('/prereview-published', require('./views/prereview-published'))
app.route('/prereview-submission-check', require('./views/prereview-submission-check'))
app.route('/users/*', require('./views/profile'))
app.route('/docs/*', require('./views/docs'))

// /preprints/doi -> read
// /preprints/doi/new -> write
// /preprints/doi/request -> request
app.route('/preprints/*', require('./views/review'))

module.exports = (function () {
  if (typeof window !== 'undefined') app.mount('body')
})()
