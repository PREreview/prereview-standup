var pg = require('pg')
pg.defaults.ssl = process.env.DEFAULTS_SSL

var config = require('../../config/db')[process.env.ENVIRONMENT || 'development']

module.exports = require('knex')(config)
