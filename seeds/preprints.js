var preprints = require('../../getpreprints/sources/eupmc/')

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('preprints').del()
    .then(function () {
      // Inserts seed entries
      return knex('preprints').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};
