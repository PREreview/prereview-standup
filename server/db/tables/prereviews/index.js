module.exports = {
	addPrereview, getPrereview
}

var db = require('../..')

function addPrereview (prereview) {
	return db('prereviews').insert(prereview)
}

function getPrereview (prereview) {
	return db('prereviews')
		.where({ doi: prereview.doi })
		.first()
}
