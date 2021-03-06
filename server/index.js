require('../config')

var DEV_ENV = process.env.NODE_ENV === 'dev'

// create server
var express = require('express')

var app = express()

// security first https://github.com/helmetjs/helmet#how-it-works
app.use(require('helmet')())

// parse JSON body to req.body
app.use(express.json({ limit: '50mb' }))

// let's keep notes
app.use(require('morgan')('combined'))

// it's OK to ask if we're OK
app.get('/health', (req, res) => res.sendStatus(200))

app.get('/proxy', (req, res) => {
  var request = require('request')
  var url = req.query.url;

  if (!url) {
    return res.sendStatus(404);
  }

  request(req.query.url).pipe(res);
});

// favicons
var favicon = require('serve-favicon')
var path = require('path')
app.use(
  favicon(path.join(__dirname, '..', 'assets', 'favicons', 'prereview_logo_icon_colour_square.png'))
)

// setup user sessions
app.use(require('./auth/sessions'))

app.use('/assets/', express.static(path.join(__dirname, '../client/assets')))

var cors = require('cors')

app.options('/pdfviewer', cors({
  methods: ['GET'],
  preflightContinue: true
}))

app.use('/pdfviewer', cors({
  methods: ['GET'],
  preflightContinue: true
}), express.static(path.join(__dirname, 'pdfviewer')))

// setup orcid authentication
require('./auth/orcid')(app)

// register server routers
app.use('/', require('./routes'))

app.get('/loginsuccess', (req, res) => {
  res.redirect('/profile')
})

// setup user sessions
app.use(require('./auth/sessions'))

// register static file serves
if (!DEV_ENV) {
  app.use(express.static(path.join(__dirname, '../client/dist'), {
    redirect: false
  }))

  app.use('/*', express.static(path.join(__dirname, '../client/dist')))
}

app.use('/assets/', express.static(path.join(__dirname, '../client/assets')))


// register client-side app
if (DEV_ENV) app.get('/*', require('./routes/root'))

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send(err.message)
})

var listenport = parseInt(process.env.PORT || process.env.PREREVIEW_PORT);

if (listenport === 443) {
  var https = require('https')
  var fs = require('fs')
  var serveropts = {
    key: fs.readFileSync(process.env.PREREVIEW_TLS_KEY),
    cert: fs.readFileSync(process.env.PREREVIEW_TLS_CERT),
    dhparam: fs.readFileSync(process.env.PREREVIEW_TLS_DH)
  }
  https.createServer(serveropts, app).listen(listenport, listening)
} else {
  app.listen(listenport, listening)
}

function listening (err) {
  if (err) return console.log(err)
  console.log(`Listening at ${process.env.APP_ROOT_URI}`)
}

console.log(require('express-list-endpoints')(app))
