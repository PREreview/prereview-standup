module.exports = {
	getPreprint
}

var db = require('../..')

function getPreprint (preprint) {
	return db('preprints')
		.where({ doi: preprint.doi })
		.first()
}
