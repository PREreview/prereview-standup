var config = require('../../config/db')[process.env.ENVIRONMENT || 'development']

module.exports = require('knex')(config)