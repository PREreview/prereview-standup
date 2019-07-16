// load environment variables
require('dotenv').config()

// create server
var express = require('express')

var app = express()

// gzip compress where possible
app.use(require('compression'))

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

app.listen(5000, function (err) {
  if (err) return console.log(err)
  console.log('Listening at http://localhost:5000/')
})
