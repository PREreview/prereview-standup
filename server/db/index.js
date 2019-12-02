var pg = require('pg')
pg.defaults.ssl = false

var config = require('../../config/db')[process.env.ENVIRONMENT || 'development']

module.exports = require('knex')(config)
