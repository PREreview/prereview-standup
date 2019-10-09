
exports.up = function (knex) {
  return knex.schema.table('preprints', function (table) {
    table.json('license')
  })
}

exports.down = function (knex) {

}
