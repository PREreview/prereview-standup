require('../config')

var preprints = require('../server/db/tables/preprints')

preprints.indexNewPreprints().then(
  result => {
    console.log('New preprints successfully indexed')
    console.log(result)
  }
).catch(
  err => { throw err }
)
