module.exports = {
	hidePrereview, unHidePrereview
}

var db = require('../..')

function hidePrereview (prereview) {
	return db('prereviews')
		.where({ prereview_id: prereview.prereview_id })
		.update({
			is_hidden: true
		})
}

function unHidePrereview (prereview) {
	return db('prereviews')
		.where({ prereview_id: prereview.prereview_id })
		.update({
			is_hidden: false
		})
}
