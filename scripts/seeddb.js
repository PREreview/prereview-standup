require('../config')
var db = require('../server/db')
var preprints = require('../server/db/tables/preprints')

var fs = require('fs')
var path = require('path')

var hyperdb = require('hyperdb')
var untildify = require('untildify')
var indb = hyperdb(
  untildify('~/.getpreprints/data/database/preprints.hyper.db'),
  { valueEncoding: 'json' }
)

var pump = require('pump')
var through = require('through2')
var BatchStream = require('batch-stream')
var to = require('flush-write-stream')

pump(
  indb.createReadStream(),
  through.obj(convert),
  new BatchStream({ size: 1000000 }),
  to.obj(insert),
  done
)

function convert (data, enc, next) {
  if (data[0].key === 'check') return next()
  var d = data[0].value

  if (d.doi) {
    d.id = `doi/${d.doi}`
    delete d.doi
    if (!d.authors.list) d.authors = { list: d.authors }
    if (d.license) {
      d.license = d.license.length > 0 ? d.license[0] : null
    }
  } else if (d.arxivid) {
    return next()
    d.id = `arxiv/${d.arxivid}`
    delete d.arxivid
  } else {
    console.log('entry has no id', d)
    return next()
  }

  // Knex can't handle an array as a JSON field
  // so we nest it in an object
  d.authors = {
    list: d.authors
  }

  // we provide an empty document field which gets populated
  // with the search index in a regular indexing operationg
  // this makes inserts much much faster
  d.document = null

  this.push(d)
  next()
}

var total = 0

function insert (batch, enc, next) {
  db.batchInsert('preprints', batch)
    .then(
      result => {
        total += batch.length
        console.log(`inserted ${total} entries into preprints`)
        next()
      }
    ).then(
      preprints.indexNewPreprints
    ).catch(
      e => {
        console.error('error inserting data', e)
        throw e
        process.exit(1)
      }
    )
}

function done () {
  console.log('all batches inserted')
}
