var { addUser } = require('../server/db/tables/users')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      var initialusers = require('../config/initialusers')
      Promise.all(initialusers.map(addUser))
    })
}
