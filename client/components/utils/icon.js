var {
  library,
  icon
} = require('@fortawesome/fontawesome-svg-core')

var faChevronDown = require('@fortawesome/free-solid-svg-icons/faChevronDown').definition
library.add(faChevronDown)

var faThumbsUp = require('@fortawesome/free-solid-svg-icons/faThumbsUp').definition
library.add(faThumbsUp)

module.exports = {
  library, icon
}
