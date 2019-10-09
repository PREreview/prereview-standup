
exports.up = function (knex) {
  return knex.schema.table('prereviews', function (table) {
    table.boolean('is_hidden')
  })
}

exports.down = function (knex) {

}
