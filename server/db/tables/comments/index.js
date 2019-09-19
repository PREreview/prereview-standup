module.exports = {
	addComment
}

var db = require('../..')

function addComment (comment) {
	return db('comments').insert(comment)
}
