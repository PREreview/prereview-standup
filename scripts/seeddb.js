require('../config')
var db = require('../server/db')

var fs = require('fs')
var path = require('path')

var partpath = fn => path.resolve('../getpreprints/sources/eupmc/parts/', fn)

var preprintBatches = fs.readdirSync(partpath('')).filter(fn => fn.startsWith('db')).map(partpath)

var alldocs = []

function collect (fn) {
  var d = JSON.parse(fs.readFileSync(fn))
  alldocs = alldocs.concat(d)
}

preprintBatches.forEach(collect)

function insertall () {
  console.log('batch inserting', alldocs.length, 'docs')
  db.batchInsert('preprints', alldocs, 1000)
  .then(
    result => console.log(`inserted ${result.length} entries into preprints`)
  )
  .catch(
    e => {
      console.error('error inserting data')
      throw e
    }
  )
}

insertall()