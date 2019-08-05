var express = require('express')
var router = express.Router()

// serves PREreviews by DOI, or by ID, or by the DOI of the preprint they
// are related to
router.get('/prereviews/doi/*', function (req, res) {
  // TODO
})

module.exports = router