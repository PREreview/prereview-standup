var express = require('express')
var router = express.Router()
var preprints = require('../../../db/tables/preprints')

// Inserts a new preprint
router.post('/insert', async function(req, res, next) {
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  var preprint = req.body
  // var preprintExists = await checkExists(preprint)
  // console.log('preprintExists', preprintExists)

  // if (!preprintExists) {
    preprints
      .insertPreprint(preprint)
      .then(data => res.json(data))
      .catch(e => {
        console.error(
          'Error trying to create PREreview with data:',
          JSON.stringify(preprint)
        )
        console.error(e)
        res.json({ preprintAlredyExists: true })
        res.status(500, 'Something went wrong trying to publish this PREreview')
      })
  // } else {
  //   return res.json({ preprintAlredyExists: true })
  // }
})

// checks if preprint already exists in DB
const checkExists = preprint =>
  new Promise(resolve =>
    preprints.getPreprint(preprint.id).then(data => {
      if (data) {
        resolve(true)
      }
      resolve(false)
    })
  )

module.exports = router
