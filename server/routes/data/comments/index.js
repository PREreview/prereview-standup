const express = require('express')
const router = express.Router()

const submit = require('./submit')

router.use('/comments', [submit])

module.exports = router
