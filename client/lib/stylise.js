// given an object with (potentially camelcase)
// keys corresponding to css properties, and
// values corresponding to css values
// return a string suitable for use as an
// html element style attribute value
var fix = require('hyphenate-style-name')

module.exports = obj => {
  var fixed = {}
  Object.keys(obj).forEach(key => {
    fixed[fix(key)] = obj[key]
  })

  return JSON.stringify(fixed)
    .replace(/\,/g, ';')
    .replace(/\"/g, '')
    .replace(/\{|\}/g, '')
}