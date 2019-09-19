require('../config')

var db = require('../server/db')

db.schema.dropTable('knex_migrations').then(res => console.log('dropped migrations table'))