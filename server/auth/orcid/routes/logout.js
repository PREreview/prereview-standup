var express = require('express')
var router = express.Router()

router.get('/logout', require('../../logout'))

module.exports = router
