#! /etc/bin/node

require('../config')

var db = require('../server/db')

// var tables = [
//   'users',
//   'prereviews'
// ]

var userId = process.argv[2] ? parseInt(process.argv[2]) : 1
resetUserId(userId)

function resetUserId () {
  console.log('Resetting user:', userId)
  return db('users').where({
    user_id: userId
  }).update({
    coc_accepted: false,
    privacy_setup: false
  }).then(
    result => {
      console.log('User was reset', result)
      process.exit(0)
    }
  ).catch(
    e => {
      console.error('Counting failed', e)
      process.exit(1)
    }
  )
}
