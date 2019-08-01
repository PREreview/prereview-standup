module.exports = {
	addPrereview, getPrereview
}

var db = require('../..')

function addPrereview (prereview) {
	return db('prereviews').insert({
		data: JSON.stringify(prereview),
		created_at : new Date(),
		updated_at: new Date()
	})
}

function getPrereview (prereview) {
	return db('prereviews')
		.where({ doi: prereview.doi })
		.first()
}
