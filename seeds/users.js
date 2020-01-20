const { insertUser } = require('../server/db/tables/users')

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      const initialUsers = require('../config/initialusers')
      return Promise.all(initialUsers.map(insertUser))
    })
}
