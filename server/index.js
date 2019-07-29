require('../config')

// create server
var express = require('express')

var app = express()

// security first https://github.com/helmetjs/helmet#how-it-works
app.use(require('helmet'))

// let's keep notes
app.use(require('morgan')('short'))

// it's OK to ask if we're OK
app.get('/health', (req, res) => res.sendStatus(200))

// setup user sessions
app.use(require('./auth/sessions'))

// setup orcid authentication
require('./auth/orcid')(app)

// serve user data
require('./routes/userdata')(app)

// register client-side app
app.get('/*', require('./routes/root'))

// register static file serves
app.use('../client/assets', express.static('assets'))
app.use('/docs', express.static('docs'))
app.use('/data', express.static('mockdata'))

var listenport = process.env.PREREVIEW_PORT
app.listen(listenport, function (err) {
  if (err) return console.log(err)
  console.log(`Listening at http://localhost:${listenport}/`)
})
