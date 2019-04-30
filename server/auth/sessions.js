var session = require('express-session')
module.exports = session({ secret: 'prereview-demo', resave: false, saveUninitialized: false })