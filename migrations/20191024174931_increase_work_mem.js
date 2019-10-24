
exports.up = function(knex) {
  return knex.raw("SET work_mem TO '512 MB';").then(
    () => knex.schema.table('preprints', function (table) {
      table.index('n_prereviews')
    })
  )
};

exports.down = function(knex) {
  
};
