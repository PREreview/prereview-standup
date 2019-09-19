module.exports = {
	addPrereview, getPrereview, getPrereviewsForUser
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

function getPrereviewsForUser (user) {
	return db('prereviews')
		.join('preprints', 'prereviews.preprint_id', '=', 'preprints.id')
		.where({ author_id: user.user_id })
}