var express = require('express')
var router = express.Router()

router.use([
	require('./login'),
	require('./logout'),
	require('./orcid-callback'),
	require('./data')
])

module.exports = router