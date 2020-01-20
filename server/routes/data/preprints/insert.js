var express = require('express')
var router = express.Router()
var preprints = require('../../../db/tables/preprints')

// Inserts a new preprint
router.post('/insert', async function(req, res, next) {
  if (!req.user) {
    // user must be logged in
    return res.status(401)
  }

  var {
    id,
    title,
    abstract,
    source,
    publisher,
    authors,
    date_created,
    date_published,
    date_indexed,
    authorstring,
    license, // TODO check why this converts to invalid json
    n_prereviews,
    document
  } = req.body

  var preprint = {
    id,
    title,
    abstract,
    source,
    publisher,
    authors,
    date_created,
    date_published,
    date_indexed,
    authorstring,
    n_prereviews,
    document
  }

  // var preprintExists = await checkExists(preprint)

  // if (!preprintExists) {
    preprints
      .insertPreprint(preprint)
      .then(data => res.json(data))
      .then(() => preprints.indexNewPreprints())
      .catch(e => {
        console.error(
          'Error trying to create PREreview with data:',
          JSON.stringify(preprint)
        )
        console.error(e)
        res.json({ preprintAlredyExists: true })
        res.status(500, 'Something went wrong trying to publish this PREprint')
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