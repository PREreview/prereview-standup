module.exports = {
	addPreprint, getPreprint
}

var db = require('../..')

function addPreprint (preprint) {
	return db('preprints').insert({
		data: JSON.stringify(preprint),
		created_at : new Date(),
		updated_at: new Date()
	})
}

function getPreprint (preprint) {
	return db('preprints')
		.where({ doi: preprint.doi })
		.first()
}
