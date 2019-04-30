var fakeContent = require('./content')
var fakePerson = require('./person')

var sortBy = require('lodash/sortBy')

var randomDate = () => {
  var start = new Date(2017, 10, 1)
  var end = new Date()
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

var fakeReview = () => {
  var person = fakePerson()
  return {
    created: randomDate(),
    author: {
      firstName: person.firstName,
      lastName: person.lastName,
      orcid: '0000-0000-1331-1563'
    },
    content: fakeContent()
  }
}

var fakeReviews = n => {
  var reviews = new Array(n).fill(0).map(fakeReview)
  return sortBy(reviews, 'created').reverse()
}

module.exports = fakeReviews