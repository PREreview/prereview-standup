module.exports = {
	getPreprint: getPreprint,
	indexNewPreprints: indexNewPreprints,
	searchPreprints: require('./search')
}

var db = require('../..')

function getPreprint (preprint) {
	return db('preprints')
		.where(preprint)
		.first()
		.then(getPreprintReviews)
}

function getPreprintReviews (preprint) {
	if (preprint && preprint.id) {
		return db('prereviews')
			.where({ preprint_id: preprint.id })
			.then(
				prereviews => {
					preprint.prereviews = prereviews
					return Promise.resolve(preprint)
				}
			)
	} else {
		return Promise.resolve(null)
	}
}


function indexNewPreprints () {
	console.log('indexing new preprints')
	var tsvectorjoin = " || '  . ' || "
	var tsvectorfields = [
		'title',
		'abstract',
		'authorstring'
	]
	var preventnull = fieldname => `coalesce(${fieldname},'')`
	var tsvectorinput = tsvectorfields.map(preventnull).join(tsvectorjoin)
	var fulltextquery = `to_tsvector(${tsvectorinput}) WHERE document is NULL;`

	return db.raw(`UPDATE "preprints" SET document = ${fulltextquery}`)
}
