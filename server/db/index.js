var pg = require('pg')
pg.defaults.ssl = true

var config = require('../../config/db')[process.env.ENVIRONMENT || 'development']

module.exports = require('knex')(config)
