module.exports = {
	getPreprint: getPreprint,
	indexNewPreprints: indexNewPreprints,
	searchPreprints: require('./search')
}

var db = require('../..')
var fixPublisher = require('./fixPublisher')

var { getPreprintReviews } = require('../prereviews')

function getPreprint (preprint) {
	return db('preprints')
		.where(preprint)
		.first()
		.then(fixPublisher)
		.then(getPreprintReviews)
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
