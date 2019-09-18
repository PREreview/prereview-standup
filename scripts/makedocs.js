var fs = require('fs')
var path = require('path')

var docsdir = path.join(__dirname, '../../documentation/dist')
var docsfiles = fs.readdirSync(docsdir)

var docs = docsfiles.map(fn => {
  return {
    filename: fn,
    name: fn.replace('.html', ''),
    filepath: path.join(docsdir, fn)
  }
}).map(entry => {
  entry.content = fs.readFileSync(entry.filepath, 'utf8')
  return entry
})

var outfile = path.join(__dirname, '../client/stores/docs.json')
var store = {}
docs.forEach(doc => {
  store[doc.name] = doc.content
})
fs.writeFileSync(outfile, JSON.stringify(store))