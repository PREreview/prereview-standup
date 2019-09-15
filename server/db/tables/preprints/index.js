module.exports = {
	getPreprint: getPreprint,
	indexNewPreprints: indexNewPreprints,
	searchPreprints: require('./search')
}

var db = require('../..')

function getPreprint (preprint) {
	return db('preprints')
		.where({ doi: preprint.doi })
		.first()
}

function indexNewPreprints () {
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