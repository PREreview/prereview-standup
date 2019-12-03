require('../config')
var db = require('../server/db')

var tables = [
  'preprints',
  'prereviews',
  'comments',
  'reviewrequests',
  'users'
]

var countraw = table => `SELECT COUNT(*) FROM ${table};`

Promise.all(tables.map(countTable)).then(
  () => process.exit(0)
)

function countTable (tablename) {
  console.log('counting entries in table:', tablename)
  return db.raw(countraw(tablename)).then(
    result => {
      console.log(tablename, 'has', result, 'entries')
    }
  ).catch(
    e => {
      console.error('Counting failed', e)
      // process.exit(1)
    }
  )
}
