module.exports = {
	addPrereview, getPrereview, getPreprintReviews, getUserReviews
}

var db = require('../..')

var { getPrereviewComments } = require('../comments')

function addPrereview (prereview) {
	return db('prereviews').insert(prereview)
}

function getPrereview (prereview) {
	return db('prereviews')
		.where({ prereview_id: prereview.prereview_id })
		.first()
}

function getPreprintReviews (preprint) {
	if (preprint && preprint.id) {
		return db('prereviews')
			.where({ preprint_id: preprint.id })
			.then(
				prereviews => {
					preprint.prereviews = prereviews
					return Promise.all(
						prereviews.filter(p => !p.is_hidden).map(getPrereviewComments)
					).then(
						() => Promise.resolve(preprint)
					)
				}
			)
	} else {
		return Promise.resolve(null)
	}
}

function getUserReviews (user) {
	if (user && user.user_id) {
		return db('prereviews')
			.where({ author_id: user.user_id })
			.then(
				prereviews => {
					user.prereviews = prereviews
					return Promise.all(
						prereviews.filter(p => !p.is_hidden).map(addPreprintToPrereview)
					).then(
						() => Promise.resolve(user)
					)
				}
			)
	} else {
		return Promise.resolve(null)
	}
}

function addPreprintToPrereview (prereview) {
	if (prereview && prereview.preprint_id) {
		return db('preprints')
			.where({ id: prereview.preprint_id })
			.first()
			.then(
				preprint => {
					prereview.preprint = preprint
					return Promise.resolve(prereview)
				}
			)
	} else {
		return Promise.resolve(null)
	}
}
