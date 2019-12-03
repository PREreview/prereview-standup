require('../config')

var tables = [
  'preprints',
  'prereviews',
  'comments',
  'reviewrequests',
  'users'
]

var creators = tables.map(table => require(`../server/db/tables/${table}/schema`)())

Promise.all(creators).then(
  () => {
    console.log('DB tables created')
    process.exit(0)
  }
).catch(
  e => {
    console.error('DB table creation failed', e)
    process.exit(1)
  }
)
