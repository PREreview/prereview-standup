var prereviewAdmin = require('../../../../db/tables/prereviews/admin')

var express = require('express')
var router = express.Router()

// Submits a new PREreview
router.post('/hide', function (req, res, next) {
  // admin only
  if (!req.user && req.user.is_admin) {
    // user must be logged in and an admin
    return res.status(401)
  }

  if (!req.body.prereview_id) {
    return res.status(500, 'No PREreview ID was provided')
  }

  prereviewAdmin.hidePrereview(prereview_id).then(
    data => res.json(data)
  ).catch(
    e => {
      console.error('Error trying to hide PREreview with id:', prereview_id)
      console.error(e)
      res.status(500, 'Something went wrong trying to hide this PREreview')
    }
  )
})

module.exports = router
