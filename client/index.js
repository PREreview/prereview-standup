require('babel-polyfill')

var css = require('sheetify')
var choo = require('choo')

css('tachyons')

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
app.use(require('./stores/styles'))
app.use(require('./stores/devdata'))
app.use(require('./stores/search'))
app.use(require('./stores/sort'))

app.route('/', require('./views/main'))
app.route('/find', require('./views/main'))
app.route('/profile', require('./views/profile'))

// /reviews/doi -> read
// /reviews/doi/new -> write
// /reviews/doi/request -> request
app.route('/reviews/doi/*', require('./views/review'))

module.exports = app.mount('body')
