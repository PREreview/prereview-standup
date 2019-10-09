var fakeContent = require('./content')
var fakePerson = require('./person')

var sortBy = require('lodash/sortBy')
var sample = require('lodash/sample')

var getn = () => sample([0, 0, 1, 1, 2, 3, 4, 5])

var randomDate = (afterdate) => {
  var start = afterdate || new Date(2018, 10, 1)
  var end = new Date()
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

var fakeComment = (afterdate) => {
  var person = fakePerson()
  return {
    created: randomDate(afterdate),
    author: {
      firstName: person.firstName,
      lastName: person.lastName,
      orcid: '0000-0000-1331-1563'
    },
    content: fakeContent()
  }
}

var fakeComments = (n, afterdate) => {
  var reviews = new Array(n).fill(0).map(i => fakeComment(afterdate))
  return sortBy(reviews, 'created').reverse()
}

var fakeReview = () => {
  var person = fakePerson()
  var review = {
    created: randomDate(),
    author: {
      firstName: person.firstName,
      lastName: person.lastName,
      orcid: '0000-0000-1331-1563'
    },
    content: fakeContent(),
    plaudits: getn()
  }
  review.comments = fakeComments(getn(), review.created)
  return review
}

var fakeReviews = () => {
  var reviews = new Array(getn()).fill(0).map(fakeReview)
  return sortBy(reviews, 'created').reverse()
}

module.exports = fakeReviews
