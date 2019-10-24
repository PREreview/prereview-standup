
exports.up = function (knex) {
  return knex.schema.table('preprints', function (table) {
    table.integer('n_prereviews')
  })
}

exports.down = function (knex) {

}
