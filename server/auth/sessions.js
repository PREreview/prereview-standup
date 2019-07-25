var session = require('express-session')
module.exports = session({
  secret: 'prereview-demo',
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: { path: '/', httpOnly: false, secure: false, maxAge: null }
})
