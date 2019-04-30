var rawhtml = require('choo/html/raw')

var loremIpsum = require('lorem-ipsum').loremIpsum

var defaults = {
  count: 3,
  units: 'paragraphs',
  sentencesPerParagraph: {
    max: 8,
    min: 3
  },
  format: 'html'
}

module.exports = opts => rawhtml(loremIpsum(Object.assign(defaults, opts || {})))