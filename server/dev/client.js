var bankai = require('bankai/http')
var http = require('http')
var path = require('path')

// creates a live reloading bankai server for our client-side app
module.exports = function () {
  var handler = bankai(path.join(__dirname, '../../client/index.js'))

  handler.compiler.on('error', (e, f, g) => {
    console.log('bankai compiler error:', e, f, g)
  })

  return function (req, res, next) {
    handler(req, res, function () {
      console.log('no route found')
      next('route')
    })
  }
}
