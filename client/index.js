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

app.route('/', require('./views/main'))
app.route('/profile', require('./views/profile'))
app.route('/reviews/*', require('./views/review'))
app.route('/components', require('./views/showcase'))

module.exports = app.mount('body')
