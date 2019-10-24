
exports.up = function(knex) {
  return knex.raw('UPDATE preprints SET n_prereviews = (SELECT COUNT(prereviews.prereview_id) from prereviews WHERE prereviews.preprint_id = preprints.id)')
};

exports.down = function(knex) {
  
};
