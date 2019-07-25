var db = require('./')
var data = require('prereview-data/db/users')
var populate = require('../../utils/populate')

module.exports = () => populate(db, data)