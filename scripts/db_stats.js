require('../config')
var db = require('../server/db')

var tables = [
  'users',
  'prereviews'
]

var countcol = {
  preprints: 'id',
  prereviews: 'prereview_id',
  comments: 'comment_id',
  users: 'user_id'
}

Promise.all(tables.map(countTable)).then(
  () => process.exit(0)
)

function countTable (tablename) {
  console.log('counting entries in table:', tablename)
  return db(tablename).count(countcol[tablename], { as: 'entries' }).then(
    result => {
      console.log(tablename, result)
    }
  ).catch(
    e => {
      console.error('Counting failed', e)
      // process.exit(1)
    }
  )
}
